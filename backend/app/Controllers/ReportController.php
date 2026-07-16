<?php

namespace App\Controllers;

use App\Config\Database;
use App\Libraries\ResponseHelper;
use App\Models\ReportModel;
use App\Models\AuditLogModel;

class ReportController
{
    private ReportModel $reportModel;
    private AuditLogModel $auditModel;

    public function __construct()
    {
        $this->reportModel = new ReportModel();
        $this->auditModel = new AuditLogModel();
    }

    /**
     * GET /api/reports
     */
    public function index(): void
    {
        $page = max(1, (int) (query('page', 1)));
        $perPage = min(100, max(1, (int) (query('per_page', 20))));
        $search = query('search', '');
        $type = query('type', '');
        $status = query('status', '');
        $offset = ($page - 1) * $perPage;

        $reports = $this->reportModel->findAll($perPage, $offset, $search, $type, $status);
        $total = $this->reportModel->count($search, $type, $status);

        ResponseHelper::paginated($reports, $total, $page, $perPage);
    }

    /**
     * GET /api/reports/{id}
     */
    public function show(string $id): void
    {
        $report = $this->reportModel->findById((int) $id);
        if (!$report) ResponseHelper::notFound('Report not found');
        ResponseHelper::success($report);
    }

    /**
     * POST /api/reports
     */
    public function store(): void
    {
        $data = json_input();
        if (!$data) ResponseHelper::error('Invalid JSON data', 400);
        if (empty($data['title'])) ResponseHelper::error('Report title is required', 422);

        $userId = auth_id();
        $data['created_by'] = $userId;

        // Generate report data if not provided
        if (empty($data['data'])) {
            $data['data'] = json_encode($this->generateReportData($data['type'] ?? 'general'));
        }

        $reportId = $this->reportModel->create($data);
        if (!$reportId) ResponseHelper::error('Failed to create report', 500);

        $report = $this->reportModel->findById($reportId);

        $this->auditModel->create([
            'user_id' => $userId,
            'action' => 'create_report',
            'entity_type' => 'report',
            'entity_id' => $reportId,
            'details' => json_encode(['title' => $data['title'], 'type' => $data['type'] ?? 'general']),
            'ip_address' => $_SERVER['REMOTE_ADDR'] ?? '',
        ]);

        ResponseHelper::created($report, 'Report created successfully');
    }

    /**
     * PUT /api/reports/{id}
     */
    public function update(string $id): void
    {
        $report = $this->reportModel->findById((int) $id);
        if (!$report) ResponseHelper::notFound('Report not found');

        $data = json_input();
        if (!$data) ResponseHelper::error('Invalid JSON data', 400);

        $this->reportModel->update((int) $id, $data);
        $updated = $this->reportModel->findById((int) $id);

        $this->auditModel->create([
            'user_id' => auth_id(),
            'action' => 'update_report',
            'entity_type' => 'report',
            'entity_id' => (int) $id,
            'details' => json_encode(array_keys($data)),
            'ip_address' => $_SERVER['REMOTE_ADDR'] ?? '',
        ]);

        ResponseHelper::success($updated, 'Report updated successfully');
    }

    /**
     * DELETE /api/reports/{id}
     */
    public function destroy(string $id): void
    {
        $report = $this->reportModel->findById((int) $id);
        if (!$report) ResponseHelper::notFound('Report not found');

        $this->reportModel->delete((int) $id);

        $this->auditModel->create([
            'user_id' => auth_id(),
            'action' => 'delete_report',
            'entity_type' => 'report',
            'entity_id' => (int) $id,
            'details' => json_encode(['title' => $report['title']]),
            'ip_address' => $_SERVER['REMOTE_ADDR'] ?? '',
        ]);

        ResponseHelper::noContent('Report deleted successfully');
    }

    /**
     * GET /api/reports/{id}/export
     */
    public function export(string $id): void
    {
        $report = $this->reportModel->findById((int) $id);
        if (!$report) ResponseHelper::notFound('Report not found');

        $format = query('format', 'json');

        if ($format === 'csv') {
            $this->exportCSV($report);
        } elseif ($format === 'json') {
            header('Content-Type: application/json');
            header('Content-Disposition: attachment; filename="' . $report['title'] . '.json"');
            echo json_encode($report, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
            exit;
        } else {
            ResponseHelper::error('Unsupported export format', 400);
        }
    }

    private function exportCSV(array $report): void
    {
        header('Content-Type: text/csv');
        header('Content-Disposition: attachment; filename="' . $report['title'] . '.csv"');

        $output = fopen('php://output', 'w');

        $data = json_decode($report['data'], true);
        if (is_array($data) && !empty($data)) {
            // Header
            if (isset($data[0])) {
                fputcsv($output, array_keys($data[0]));
                foreach ($data as $row) {
                    fputcsv($output, $row);
                }
            } else {
                foreach ($data as $key => $value) {
                    fputcsv($output, [$key, $value]);
                }
            }
        }

        fclose($output);
        exit;
    }

    private function generateReportData(string $type): array
    {
        $data = [];

        switch ($type) {
            case 'donations':
                $data['total_donations'] = Database::scalar("SELECT COALESCE(SUM(amount), 0) FROM donations WHERE payment_status = 'completed'");
                $data['donation_count'] = Database::scalar("SELECT COUNT(*) FROM donations WHERE payment_status = 'completed'");
                $data['monthly'] = Database::query("SELECT DATE_FORMAT(created_at, '%Y-%m') as month, SUM(amount) as total FROM donations WHERE payment_status = 'completed' GROUP BY month ORDER BY month DESC LIMIT 12");
                break;
            case 'volunteers':
                $data['total_volunteers'] = Database::scalar("SELECT COUNT(*) FROM volunteers");
                $data['active_volunteers'] = Database::scalar("SELECT COUNT(*) FROM volunteers WHERE status = 'active'");
                $data['total_hours'] = Database::scalar("SELECT COALESCE(SUM(hours), 0) FROM volunteer_hours");
                break;
            case 'programs':
                $data['total_programs'] = Database::scalar("SELECT COUNT(*) FROM programs");
                $data['active_programs'] = Database::scalar("SELECT COUNT(*) FROM programs WHERE status = 'active'");
                $data['total_beneficiaries'] = Database::scalar("SELECT COALESCE(SUM(beneficiaries), 0) FROM programs");
                break;
            default:
                $data['generated_at'] = date('Y-m-d H:i:s');
                $data['type'] = $type;
                break;
        }

        return $data;
    }
}
