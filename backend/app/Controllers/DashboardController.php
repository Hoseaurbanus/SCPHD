<?php

namespace App\Controllers;

use App\Config\Database;
use App\Libraries\ResponseHelper;
use App\Models\AuditLogModel;

class DashboardController
{
    private AuditLogModel $auditModel;

    public function __construct()
    {
        $this->auditModel = new AuditLogModel();
    }

    /**
     * GET /api/dashboard/stats
     */
    public function stats(): void
    {
        $stats = [
            'users' => [
                'total' => (int) Database::scalar("SELECT COUNT(*) FROM users"),
                'active' => (int) Database::scalar("SELECT COUNT(*) FROM users WHERE is_active = 1"),
                'by_role' => Database::query("SELECT role, COUNT(*) as count FROM users GROUP BY role"),
            ],
            'donations' => [
                'total_amount' => (float) Database::scalar("SELECT COALESCE(SUM(amount), 0) FROM donations WHERE payment_status = 'completed'"),
                'total_count' => (int) Database::scalar("SELECT COUNT(*) FROM donations WHERE payment_status = 'completed'"),
                'this_month' => (float) Database::scalar("SELECT COALESCE(SUM(amount), 0) FROM donations WHERE payment_status = 'completed' AND MONTH(created_at) = MONTH(NOW()) AND YEAR(created_at) = YEAR(NOW())"),
                'last_month' => (float) Database::scalar("SELECT COALESCE(SUM(amount), 0) FROM donations WHERE payment_status = 'completed' AND MONTH(created_at) = MONTH(DATE_SUB(NOW(), INTERVAL 1 MONTH)) AND YEAR(created_at) = YEAR(DATE_SUB(NOW(), INTERVAL 1 MONTH))"),
            ],
            'programs' => [
                'total' => (int) Database::scalar("SELECT COUNT(*) FROM programs"),
                'active' => (int) Database::scalar("SELECT COUNT(*) FROM programs WHERE status = 'active'"),
                'total_beneficiaries' => (int) Database::scalar("SELECT COALESCE(SUM(beneficiaries), 0) FROM programs"),
                'total_budget' => (float) Database::scalar("SELECT COALESCE(SUM(budget), 0) FROM programs"),
            ],
            'volunteers' => [
                'total' => (int) Database::scalar("SELECT COUNT(*) FROM volunteers"),
                'active' => (int) Database::scalar("SELECT COUNT(*) FROM volunteers WHERE status = 'active'"),
                'total_hours' => (float) Database::scalar("SELECT COALESCE(SUM(hours), 0) FROM volunteer_hours"),
            ],
            'events' => [
                'total' => (int) Database::scalar("SELECT COUNT(*) FROM events"),
                'upcoming' => (int) Database::scalar("SELECT COUNT(*) FROM events WHERE status = 'upcoming' AND start_date >= NOW()"),
                'total_registrations' => (int) Database::scalar("SELECT COUNT(*) FROM event_registrations"),
            ],
            'contacts' => [
                'total' => (int) Database::scalar("SELECT COUNT(*) FROM contacts"),
                'unread' => (int) Database::scalar("SELECT COUNT(*) FROM contacts WHERE status = 'new'"),
            ],
            'news' => [
                'total' => (int) Database::scalar("SELECT COUNT(*) FROM news"),
                'published' => (int) Database::scalar("SELECT COUNT(*) FROM news WHERE status = 'published'"),
            ],
            'gallery' => [
                'total' => (int) Database::scalar("SELECT COUNT(*) FROM gallery"),
                'total_size' => (int) Database::scalar("SELECT COALESCE(SUM(file_size), 0) FROM gallery"),
            ],
            'partners' => [
                'total' => (int) Database::scalar("SELECT COUNT(*) FROM partners"),
                'active' => (int) Database::scalar("SELECT COUNT(*) FROM partners WHERE status = 'active'"),
            ],
            'projects' => [
                'total' => (int) Database::scalar("SELECT COUNT(*) FROM projects"),
                'active' => (int) Database::scalar("SELECT COUNT(*) FROM projects WHERE status = 'active' OR status = 'in_progress'"),
            ],
        ];

        ResponseHelper::success($stats);
    }

    /**
     * GET /api/dashboard/charts
     */
    public function charts(): void
    {
        $period = query('period', '12');

        $charts = [
            'donations_monthly' => Database::query(
                "SELECT DATE_FORMAT(created_at, '%Y-%m') as month, SUM(amount) as total, COUNT(*) as count FROM donations WHERE payment_status = 'completed' AND created_at >= DATE_SUB(NOW(), INTERVAL ? MONTH) GROUP BY month ORDER BY month ASC",
                [(int) $period],
                'i'
            ),
            'donations_by_program' => Database::query(
                "SELECT p.name as program_name, SUM(d.amount) as total FROM donations d LEFT JOIN programs p ON d.program_id = p.id WHERE d.payment_status = 'completed' GROUP BY p.name ORDER BY total DESC LIMIT 10"
            ),
            'volunteer_hours_monthly' => Database::query(
                "SELECT DATE_FORMAT(date, '%Y-%m') as month, SUM(hours) as total_hours, COUNT(*) as entries FROM volunteer_hours WHERE date >= DATE_SUB(NOW(), INTERVAL ? MONTH) GROUP BY month ORDER BY month ASC",
                [(int) $period],
                'i'
            ),
            'events_monthly' => Database::query(
                "SELECT DATE_FORMAT(start_date, '%Y-%m') as month, COUNT(*) as count FROM events WHERE start_date >= DATE_SUB(NOW(), INTERVAL ? MONTH) GROUP BY month ORDER BY month ASC",
                [(int) $period],
                'i'
            ),
            'users_by_role' => Database::query(
                "SELECT role, COUNT(*) as count FROM users GROUP BY role ORDER BY count DESC"
            ),
            'contacts_by_status' => Database::query(
                "SELECT status, COUNT(*) as count FROM contacts GROUP BY status"
            ),
        ];

        ResponseHelper::success($charts);
    }

    /**
     * GET /api/dashboard/activities
     */
    public function activities(): void
    {
        $limit = min(50, max(1, (int) (query('limit', 20))));

        $activities = $this->auditModel->findAll($limit, 0);

        ResponseHelper::success($activities);
    }
}
