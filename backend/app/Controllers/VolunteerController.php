<?php

namespace App\Controllers;

use App\Libraries\ResponseHelper;
use App\Models\VolunteerModel;
use App\Models\AuditLogModel;

class VolunteerController
{
    private VolunteerModel $volunteerModel;
    private AuditLogModel $auditModel;

    public function __construct()
    {
        $this->volunteerModel = new VolunteerModel();
        $this->auditModel = new AuditLogModel();
    }

    /**
     * GET /api/volunteers
     */
    public function index(): void
    {
        $page = max(1, (int) (query('page', 1)));
        $perPage = min(100, max(1, (int) (query('per_page', 20))));
        $search = query('search', '');
        $status = query('status', '');
        $offset = ($page - 1) * $perPage;

        $volunteers = $this->volunteerModel->findAll($perPage, $offset, $search, $status);
        $total = $this->volunteerModel->count($search, $status);

        ResponseHelper::paginated($volunteers, $total, $page, $perPage);
    }

    /**
     * GET /api/volunteers/{id}
     */
    public function show(string $id): void
    {
        $volunteer = $this->volunteerModel->findById((int) $id);
        if (!$volunteer) ResponseHelper::notFound('Volunteer not found');
        ResponseHelper::success($volunteer);
    }

    /**
     * POST /api/volunteers
     */
    public function store(): void
    {
        $data = json_input();
        if (!$data) ResponseHelper::error('Invalid JSON data', 400);

        if (empty($data['first_name'])) ResponseHelper::error('First name is required', 422);
        if (empty($data['last_name'])) ResponseHelper::error('Last name is required', 422);
        if (empty($data['email'])) ResponseHelper::error('Email is required', 422);

        $userId = auth_id();
        $data['user_id'] = $userId;

        $volunteerId = $this->volunteerModel->create($data);
        if (!$volunteerId) ResponseHelper::error('Failed to create volunteer', 500);

        $volunteer = $this->volunteerModel->findById($volunteerId);

        $this->auditModel->create([
            'user_id' => $userId,
            'action' => 'create_volunteer',
            'entity_type' => 'volunteer',
            'entity_id' => $volunteerId,
            'details' => json_encode(['name' => $data['first_name'] . ' ' . $data['last_name']]),
            'ip_address' => $_SERVER['REMOTE_ADDR'] ?? '',
        ]);

        ResponseHelper::created($volunteer, 'Volunteer created successfully');
    }

    /**
     * PUT /api/volunteers/{id}
     */
    public function update(string $id): void
    {
        $volunteer = $this->volunteerModel->findById((int) $id);
        if (!$volunteer) ResponseHelper::notFound('Volunteer not found');

        $data = json_input();
        if (!$data) ResponseHelper::error('Invalid JSON data', 400);

        $this->volunteerModel->update((int) $id, $data);
        $updated = $this->volunteerModel->findById((int) $id);

        $this->auditModel->create([
            'user_id' => auth_id(),
            'action' => 'update_volunteer',
            'entity_type' => 'volunteer',
            'entity_id' => (int) $id,
            'details' => json_encode(array_keys($data)),
            'ip_address' => $_SERVER['REMOTE_ADDR'] ?? '',
        ]);

        ResponseHelper::success($updated, 'Volunteer updated successfully');
    }

    /**
     * DELETE /api/volunteers/{id}
     */
    public function destroy(string $id): void
    {
        $volunteer = $this->volunteerModel->findById((int) $id);
        if (!$volunteer) ResponseHelper::notFound('Volunteer not found');

        $this->volunteerModel->delete((int) $id);

        $this->auditModel->create([
            'user_id' => auth_id(),
            'action' => 'delete_volunteer',
            'entity_type' => 'volunteer',
            'entity_id' => (int) $id,
            'details' => json_encode(['name' => $volunteer['first_name'] . ' ' . $volunteer['last_name']]),
            'ip_address' => $_SERVER['REMOTE_ADDR'] ?? '',
        ]);

        ResponseHelper::noContent('Volunteer deleted successfully');
    }

    /**
     * GET /api/volunteers/{id}/missions
     */
    public function missions(string $id): void
    {
        $volunteer = $this->volunteerModel->findById((int) $id);
        if (!$volunteer) ResponseHelper::notFound('Volunteer not found');

        $missions = $this->volunteerModel->getMissions((int) $id);
        ResponseHelper::success($missions);
    }

    /**
     * POST /api/volunteers/{id}/hours
     */
    public function addHours(string $id): void
    {
        $volunteer = $this->volunteerModel->findById((int) $id);
        if (!$volunteer) ResponseHelper::notFound('Volunteer not found');

        $data = json_input();
        if (!$data) ResponseHelper::error('Invalid JSON data', 400);
        if (empty($data['hours']) || $data['hours'] <= 0) ResponseHelper::error('Valid hours value is required', 422);

        $hoursId = $this->volunteerModel->addHours((int) $id, $data);
        if (!$hoursId) ResponseHelper::error('Failed to add hours', 500);

        ResponseHelper::created(['hours_id' => $hoursId], 'Hours added successfully');
    }

    /**
     * GET /api/volunteers/impact
     */
    public function impact(): void
    {
        $impact = $this->volunteerModel->getImpactStats();
        ResponseHelper::success($impact);
    }
}
