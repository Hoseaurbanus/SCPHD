<?php

namespace App\Controllers;

use App\Libraries\ResponseHelper;
use App\Models\EventModel;
use App\Models\AuditLogModel;

class EventController
{
    private EventModel $eventModel;
    private AuditLogModel $auditModel;

    public function __construct()
    {
        $this->eventModel = new EventModel();
        $this->auditModel = new AuditLogModel();
    }

    /**
     * GET /api/events
     */
    public function index(): void
    {
        $page = max(1, (int) (query('page', 1)));
        $perPage = min(100, max(1, (int) (query('per_page', 20))));
        $search = query('search', '');
        $status = query('status', '');
        $offset = ($page - 1) * $perPage;

        $events = $this->eventModel->findAll($perPage, $offset, $search, $status);
        $total = $this->eventModel->count($search, $status);

        ResponseHelper::paginated($events, $total, $page, $perPage);
    }

    /**
     * GET /api/events/{id}
     */
    public function show(string $id): void
    {
        $event = $this->eventModel->findById((int) $id);
        if (!$event) ResponseHelper::notFound('Event not found');
        ResponseHelper::success($event);
    }

    /**
     * POST /api/events
     */
    public function store(): void
    {
        $data = json_input();
        if (!$data) ResponseHelper::error('Invalid JSON data', 400);
        if (empty($data['title'])) ResponseHelper::error('Event title is required', 422);
        if (empty($data['start_date'])) ResponseHelper::error('Start date is required', 422);

        $userId = auth_id();
        $data['created_by'] = $userId;

        $eventId = $this->eventModel->create($data);
        if (!$eventId) ResponseHelper::error('Failed to create event', 500);

        $event = $this->eventModel->findById($eventId);

        $this->auditModel->create([
            'user_id' => $userId,
            'action' => 'create_event',
            'entity_type' => 'event',
            'entity_id' => $eventId,
            'details' => json_encode(['title' => $data['title']]),
            'ip_address' => $_SERVER['REMOTE_ADDR'] ?? '',
        ]);

        ResponseHelper::created($event, 'Event created successfully');
    }

    /**
     * PUT /api/events/{id}
     */
    public function update(string $id): void
    {
        $event = $this->eventModel->findById((int) $id);
        if (!$event) ResponseHelper::notFound('Event not found');

        $data = json_input();
        if (!$data) ResponseHelper::error('Invalid JSON data', 400);

        $this->eventModel->update((int) $id, $data);
        $updated = $this->eventModel->findById((int) $id);

        $this->auditModel->create([
            'user_id' => auth_id(),
            'action' => 'update_event',
            'entity_type' => 'event',
            'entity_id' => (int) $id,
            'details' => json_encode(array_keys($data)),
            'ip_address' => $_SERVER['REMOTE_ADDR'] ?? '',
        ]);

        ResponseHelper::success($updated, 'Event updated successfully');
    }

    /**
     * DELETE /api/events/{id}
     */
    public function destroy(string $id): void
    {
        $event = $this->eventModel->findById((int) $id);
        if (!$event) ResponseHelper::notFound('Event not found');

        $this->eventModel->delete((int) $id);

        $this->auditModel->create([
            'user_id' => auth_id(),
            'action' => 'delete_event',
            'entity_type' => 'event',
            'entity_id' => (int) $id,
            'details' => json_encode(['title' => $event['title']]),
            'ip_address' => $_SERVER['REMOTE_ADDR'] ?? '',
        ]);

        ResponseHelper::noContent('Event deleted successfully');
    }

    /**
     * POST /api/events/{id}/register
     */
    public function register(string $id): void
    {
        $event = $this->eventModel->findById((int) $id);
        if (!$event) ResponseHelper::notFound('Event not found');

        $userId = auth_id();
        if (!$userId) ResponseHelper::unauthorized();

        $data = json_input() ?? [];

        $regId = $this->eventModel->register((int) $id, $userId, $data['name'] ?? null, $data['email'] ?? null);
        if ($regId === 0) {
            ResponseHelper::error('Already registered for this event', 422);
        }

        ResponseHelper::created(['registration_id' => $regId], 'Registered for event successfully');
    }
}
