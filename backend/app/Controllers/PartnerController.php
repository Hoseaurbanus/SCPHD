<?php

namespace App\Controllers;

use App\Config\Database;
use App\Libraries\ResponseHelper;
use App\Models\PartnerModel;
use App\Models\AuditLogModel;

class PartnerController
{
    private PartnerModel $partnerModel;
    private AuditLogModel $auditModel;

    public function __construct()
    {
        $this->partnerModel = new PartnerModel();
        $this->auditModel = new AuditLogModel();
    }

    /**
     * GET /api/partners
     */
    public function index(): void
    {
        $page = max(1, (int) (query('page', 1)));
        $perPage = min(100, max(1, (int) (query('per_page', 20))));
        $search = query('search', '');
        $type = query('type', '');
        $status = query('status', '');
        $offset = ($page - 1) * $perPage;

        $partners = $this->partnerModel->findAll($perPage, $offset, $search, $type, $status);
        $total = $this->partnerModel->count($search, $type, $status);

        ResponseHelper::paginated($partners, $total, $page, $perPage);
    }

    /**
     * GET /api/partners/{id}
     */
    public function show(string $id): void
    {
        $partner = $this->partnerModel->findById((int) $id);
        if (!$partner) ResponseHelper::notFound('Partner not found');
        ResponseHelper::success($partner);
    }

    /**
     * POST /api/partners
     */
    public function store(): void
    {
        $data = json_input();
        if (!$data) ResponseHelper::error('Invalid JSON data', 400);
        if (empty($data['name'])) ResponseHelper::error('Partner name is required', 422);

        $partnerId = $this->partnerModel->create($data);
        if (!$partnerId) ResponseHelper::error('Failed to create partner', 500);

        $partner = $this->partnerModel->findById($partnerId);

        $this->auditModel->create([
            'user_id' => auth_id(),
            'action' => 'create_partner',
            'entity_type' => 'partner',
            'entity_id' => $partnerId,
            'details' => json_encode(['name' => $data['name']]),
            'ip_address' => $_SERVER['REMOTE_ADDR'] ?? '',
        ]);

        ResponseHelper::created($partner, 'Partner created successfully');
    }

    /**
     * PUT /api/partners/{id}
     */
    public function update(string $id): void
    {
        $partner = $this->partnerModel->findById((int) $id);
        if (!$partner) ResponseHelper::notFound('Partner not found');

        $data = json_input();
        if (!$data) ResponseHelper::error('Invalid JSON data', 400);

        $this->partnerModel->update((int) $id, $data);
        $updated = $this->partnerModel->findById((int) $id);

        $this->auditModel->create([
            'user_id' => auth_id(),
            'action' => 'update_partner',
            'entity_type' => 'partner',
            'entity_id' => (int) $id,
            'details' => json_encode(array_keys($data)),
            'ip_address' => $_SERVER['REMOTE_ADDR'] ?? '',
        ]);

        ResponseHelper::success($updated, 'Partner updated successfully');
    }

    /**
     * DELETE /api/partners/{id}
     */
    public function destroy(string $id): void
    {
        $partner = $this->partnerModel->findById((int) $id);
        if (!$partner) ResponseHelper::notFound('Partner not found');

        $this->partnerModel->delete((int) $id);

        $this->auditModel->create([
            'user_id' => auth_id(),
            'action' => 'delete_partner',
            'entity_type' => 'partner',
            'entity_id' => (int) $id,
            'details' => json_encode(['name' => $partner['name']]),
            'ip_address' => $_SERVER['REMOTE_ADDR'] ?? '',
        ]);

        ResponseHelper::noContent('Partner deleted successfully');
    }
}
