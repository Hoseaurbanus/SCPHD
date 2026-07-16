<?php

namespace App\Controllers;

use App\Libraries\ResponseHelper;
use App\Models\ProgramModel;
use App\Models\AuditLogModel;

class ProgramController
{
    private ProgramModel $programModel;
    private AuditLogModel $auditModel;

    public function __construct()
    {
        $this->programModel = new ProgramModel();
        $this->auditModel = new AuditLogModel();
    }

    /**
     * GET /api/programs
     */
    public function index(): void
    {
        $page = max(1, (int) (query('page', 1)));
        $perPage = min(100, max(1, (int) (query('per_page', 20))));
        $search = query('search', '');
        $status = query('status', '');
        $category = query('category', '');
        $offset = ($page - 1) * $perPage;

        $programs = $this->programModel->findAll($perPage, $offset, $search, $status, $category);
        $total = $this->programModel->count($search, $status, $category);

        ResponseHelper::paginated($programs, $total, $page, $perPage);
    }

    /**
     * GET /api/programs/{id}
     */
    public function show(string $id): void
    {
        $program = $this->programModel->findById((int) $id);
        if (!$program) {
            ResponseHelper::notFound('Program not found');
        }
        ResponseHelper::success($program);
    }

    /**
     * POST /api/programs
     */
    public function store(): void
    {
        $data = json_input();
        if (!$data) {
            ResponseHelper::error('Invalid JSON data', 400);
        }

        if (empty($data['name'])) {
            ResponseHelper::error('Program name is required', 422);
        }

        $userId = auth_id();
        $data['created_by'] = $userId;

        $programId = $this->programModel->create($data);
        if (!$programId) {
            ResponseHelper::error('Failed to create program', 500);
        }

        $program = $this->programModel->findById($programId);

        $this->auditModel->create([
            'user_id' => $userId,
            'action' => 'create_program',
            'entity_type' => 'program',
            'entity_id' => $programId,
            'details' => json_encode(['name' => $data['name']]),
            'ip_address' => $_SERVER['REMOTE_ADDR'] ?? '',
        ]);

        ResponseHelper::created($program, 'Program created successfully');
    }

    /**
     * PUT /api/programs/{id}
     */
    public function update(string $id): void
    {
        $program = $this->programModel->findById((int) $id);
        if (!$program) {
            ResponseHelper::notFound('Program not found');
        }

        $data = json_input();
        if (!$data) {
            ResponseHelper::error('Invalid JSON data', 400);
        }

        $this->programModel->update((int) $id, $data);
        $updated = $this->programModel->findById((int) $id);

        $this->auditModel->create([
            'user_id' => auth_id(),
            'action' => 'update_program',
            'entity_type' => 'program',
            'entity_id' => (int) $id,
            'details' => json_encode(array_keys($data)),
            'ip_address' => $_SERVER['REMOTE_ADDR'] ?? '',
        ]);

        ResponseHelper::success($updated, 'Program updated successfully');
    }

    /**
     * DELETE /api/programs/{id}
     */
    public function destroy(string $id): void
    {
        $program = $this->programModel->findById((int) $id);
        if (!$program) {
            ResponseHelper::notFound('Program not found');
        }

        $this->programModel->delete((int) $id);

        $this->auditModel->create([
            'user_id' => auth_id(),
            'action' => 'delete_program',
            'entity_type' => 'program',
            'entity_id' => (int) $id,
            'details' => json_encode(['name' => $program['name']]),
            'ip_address' => $_SERVER['REMOTE_ADDR'] ?? '',
        ]);

        ResponseHelper::noContent('Program deleted successfully');
    }

    /**
     * GET /api/programs/{id}/metrics
     */
    public function metrics(string $id): void
    {
        $program = $this->programModel->findById((int) $id);
        if (!$program) {
            ResponseHelper::notFound('Program not found');
        }

        $metrics = $this->programModel->getMetrics((int) $id);
        ResponseHelper::success($metrics);
    }
}
