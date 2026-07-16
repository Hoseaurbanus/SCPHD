<?php

namespace App\Controllers;

use App\Libraries\ResponseHelper;
use App\Models\ContactModel;
use App\Models\AuditLogModel;

class ContactController
{
    private ContactModel $contactModel;
    private AuditLogModel $auditModel;

    public function __construct()
    {
        $this->contactModel = new ContactModel();
        $this->auditModel = new AuditLogModel();
    }

    /**
     * POST /api/contacts
     */
    public function submit(): void
    {
        $data = json_input();
        if (!$data) ResponseHelper::error('Invalid JSON data', 400);

        $errors = [];
        if (empty($data['name'])) $errors['name'] = 'Name is required';
        if (empty($data['email'])) $errors['email'] = 'Email is required';
        if (!filter_var($data['email'] ?? '', FILTER_VALIDATE_EMAIL)) $errors['email'] = 'Invalid email format';
        if (empty($data['message'])) $errors['message'] = 'Message is required';

        if (!empty($errors)) ResponseHelper::validation($errors);

        $contactId = $this->contactModel->create($data);
        if (!$contactId) ResponseHelper::error('Failed to submit contact form', 500);

        ResponseHelper::created(['id' => $contactId], 'Contact form submitted successfully');
    }

    /**
     * GET /api/contacts
     */
    public function index(): void
    {
        $page = max(1, (int) (query('page', 1)));
        $perPage = min(100, max(1, (int) (query('per_page', 20))));
        $search = query('search', '');
        $status = query('status', '');
        $offset = ($page - 1) * $perPage;

        $contacts = $this->contactModel->findAll($perPage, $offset, $search, $status);
        $total = $this->contactModel->count($search, $status);

        ResponseHelper::paginated($contacts, $total, $page, $perPage);
    }

    /**
     * PUT /api/contacts/{id}
     */
    public function update(string $id): void
    {
        $contact = $this->contactModel->findById((int) $id);
        if (!$contact) ResponseHelper::notFound('Contact not found');

        $data = json_input();
        if (!$data) ResponseHelper::error('Invalid JSON data', 400);

        $this->contactModel->update((int) $id, $data);
        $updated = $this->contactModel->findById((int) $id);

        ResponseHelper::success($updated, 'Contact updated successfully');
    }

    /**
     * DELETE /api/contacts/{id}
     */
    public function destroy(string $id): void
    {
        $contact = $this->contactModel->findById((int) $id);
        if (!$contact) ResponseHelper::notFound('Contact not found');

        $this->contactModel->delete((int) $id);
        ResponseHelper::noContent('Contact deleted successfully');
    }

    /**
     * PATCH /api/contacts/{id}/status
     */
    public function updateStatus(string $id): void
    {
        $contact = $this->contactModel->findById((int) $id);
        if (!$contact) ResponseHelper::notFound('Contact not found');

        $data = json_input();
        if (!$data || empty($data['status'])) ResponseHelper::error('Status is required', 400);

        $validStatuses = ['new', 'read', 'replied', 'archived'];
        if (!in_array($data['status'], $validStatuses)) {
            ResponseHelper::error('Invalid status', 422);
        }

        $this->contactModel->updateStatus((int) $id, $data['status']);

        $this->auditModel->create([
            'user_id' => auth_id(),
            'action' => 'update_contact_status',
            'entity_type' => 'contact',
            'entity_id' => (int) $id,
            'details' => json_encode(['old_status' => $contact['status'], 'new_status' => $data['status']]),
            'ip_address' => $_SERVER['REMOTE_ADDR'] ?? '',
        ]);

        ResponseHelper::success(null, 'Contact status updated successfully');
    }
}
