<?php

namespace App\Controllers;

use App\Libraries\ResponseHelper;
use App\Models\DonationModel;
use App\Models\AuditLogModel;

class DonationController
{
    private DonationModel $donationModel;
    private AuditLogModel $auditModel;

    public function __construct()
    {
        $this->donationModel = new DonationModel();
        $this->auditModel = new AuditLogModel();
    }

    /**
     * GET /api/donations
     */
    public function index(): void
    {
        $page = max(1, (int) (query('page', 1)));
        $perPage = min(100, max(1, (int) (query('per_page', 20))));
        $search = query('search', '');
        $status = query('status', '');
        $offset = ($page - 1) * $perPage;

        $donations = $this->donationModel->findAll($perPage, $offset, $search, $status);
        $total = $this->donationModel->count($search, $status);

        ResponseHelper::paginated($donations, $total, $page, $perPage);
    }

    /**
     * GET /api/donations/{id}
     */
    public function show(string $id): void
    {
        $donation = $this->donationModel->findById((int) $id);
        if (!$donation) ResponseHelper::notFound('Donation not found');
        ResponseHelper::success($donation);
    }

    /**
     * POST /api/donations
     */
    public function store(): void
    {
        $data = json_input();
        if (!$data) ResponseHelper::error('Invalid JSON data', 400);

        if (empty($data['donor_name'])) ResponseHelper::error('Donor name is required', 422);
        if (empty($data['amount']) || $data['amount'] <= 0) ResponseHelper::error('Valid amount is required', 422);

        $userId = auth_id();
        $data['user_id'] = $userId;

        // Generate receipt number
        $data['receipt_number'] = 'RCP-' . date('Ymd') . '-' . strtoupper(substr(md5(uniqid()), 0, 8));

        $donationId = $this->donationModel->create($data);
        if (!$donationId) ResponseHelper::error('Failed to create donation', 500);

        $donation = $this->donationModel->findById($donationId);

        $this->auditModel->create([
            'user_id' => $userId,
            'action' => 'create_donation',
            'entity_type' => 'donation',
            'entity_id' => $donationId,
            'details' => json_encode(['amount' => $data['amount'], 'donor' => $data['donor_name']]),
            'ip_address' => $_SERVER['REMOTE_ADDR'] ?? '',
        ]);

        ResponseHelper::created($donation, 'Donation recorded successfully');
    }

    /**
     * PUT /api/donations/{id}
     */
    public function update(string $id): void
    {
        $donation = $this->donationModel->findById((int) $id);
        if (!$donation) ResponseHelper::notFound('Donation not found');

        $data = json_input();
        if (!$data) ResponseHelper::error('Invalid JSON data', 400);

        $this->donationModel->update((int) $id, $data);
        $updated = $this->donationModel->findById((int) $id);

        $this->auditModel->create([
            'user_id' => auth_id(),
            'action' => 'update_donation',
            'entity_type' => 'donation',
            'entity_id' => (int) $id,
            'details' => json_encode(array_keys($data)),
            'ip_address' => $_SERVER['REMOTE_ADDR'] ?? '',
        ]);

        ResponseHelper::success($updated, 'Donation updated successfully');
    }

    /**
     * DELETE /api/donations/{id}
     */
    public function destroy(string $id): void
    {
        $donation = $this->donationModel->findById((int) $id);
        if (!$donation) ResponseHelper::notFound('Donation not found');

        $this->donationModel->delete((int) $id);

        $this->auditModel->create([
            'user_id' => auth_id(),
            'action' => 'delete_donation',
            'entity_type' => 'donation',
            'entity_id' => (int) $id,
            'details' => json_encode(['amount' => $donation['amount']]),
            'ip_address' => $_SERVER['REMOTE_ADDR'] ?? '',
        ]);

        ResponseHelper::noContent('Donation deleted successfully');
    }

    /**
     * GET /api/donations/history
     */
    public function history(): void
    {
        $page = max(1, (int) (query('page', 1)));
        $perPage = min(100, max(1, (int) (query('per_page', 20))));
        $offset = ($page - 1) * $perPage;
        $userId = query('user_id') ? (int) query('user_id') : null;
        $programId = query('program_id') ? (int) query('program_id') : null;
        $projectId = query('project_id') ? (int) query('project_id') : null;

        $history = $this->donationModel->getHistory($perPage, $offset, $userId, $programId, $projectId);
        $total = $this->donationModel->count();

        ResponseHelper::paginated($history, $total, $page, $perPage);
    }

    /**
     * POST /api/donations/recurring
     */
    public function recurring(): void
    {
        $data = json_input();
        if (!$data) ResponseHelper::error('Invalid JSON data', 400);

        if (empty($data['donor_name'])) ResponseHelper::error('Donor name is required', 422);
        if (empty($data['amount']) || $data['amount'] <= 0) ResponseHelper::error('Valid amount is required', 422);
        if (empty($data['recurring_interval'])) ResponseHelper::error('Recurring interval is required', 422);

        $validIntervals = ['weekly', 'monthly', 'quarterly', 'yearly'];
        if (!in_array($data['recurring_interval'], $validIntervals)) {
            ResponseHelper::error('Invalid recurring interval', 422);
        }

        $userId = auth_id();
        $data['user_id'] = $userId;
        $data['is_recurring'] = 1;
        $data['receipt_number'] = 'RCP-' . date('Ymd') . '-' . strtoupper(substr(md5(uniqid()), 0, 8));

        $donationId = $this->donationModel->create($data);
        if (!$donationId) ResponseHelper::error('Failed to create recurring donation', 500);

        $donation = $this->donationModel->findById($donationId);

        ResponseHelper::created($donation, 'Recurring donation created successfully');
    }

    /**
     * GET /api/donations/{id}/receipt
     */
    public function receipt(string $id): void
    {
        $donation = $this->donationModel->getReceipt((int) $id);
        if (!$donation) ResponseHelper::notFound('Donation not found');

        $receipt = [
            'receipt_number' => $donation['receipt_number'],
            'date' => $donation['created_at'],
            'donor_name' => $donation['donor_name'],
            'donor_email' => $donation['donor_email'],
            'amount' => $donation['amount'],
            'currency' => $donation['currency'],
            'payment_method' => $donation['payment_method'],
            'program' => $donation['program_name'] ?? null,
            'project' => $donation['project_name'] ?? null,
            'organization' => getenv('APP_NAME') ?: 'SCPHD NGO',
        ];

        ResponseHelper::success($receipt, 'Receipt retrieved successfully');
    }
}
