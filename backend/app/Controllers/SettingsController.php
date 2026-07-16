<?php

namespace App\Controllers;

use App\Config\Database;
use App\Libraries\ResponseHelper;
use App\Models\AuditLogModel;

class SettingsController
{
    private AuditLogModel $auditModel;

    public function __construct()
    {
        $this->auditModel = new AuditLogModel();
    }

    /**
     * GET /api/settings
     */
    public function index(): void
    {
        $settings = Database::row("SELECT * FROM settings WHERE id = 1");

        if (!$settings) {
            $settings = [
                'site_name' => 'SCPHD NGO Platform',
                'site_description' => 'NGO Management Platform',
                'contact_email' => 'info@scphd.org',
                'contact_phone' => '',
                'address' => '',
                'logo' => null,
                'favicon' => null,
                'social_facebook' => '',
                'social_twitter' => '',
                'social_instagram' => '',
                'social_linkedin' => '',
                'donation_enabled' => 1,
                'volunteer_registration' => 1,
                'event_registration' => 1,
                'maintenance_mode' => 0,
            ];
        }

        ResponseHelper::success($settings);
    }

    /**
     * PUT /api/settings
     */
    public function update(): void
    {
        $data = json_input();
        if (!$data) ResponseHelper::error('Invalid JSON data', 400);

        $existing = Database::row("SELECT id FROM settings WHERE id = 1");

        $allowedFields = [
            'site_name', 'site_description', 'contact_email', 'contact_phone',
            'address', 'logo', 'favicon', 'social_facebook', 'social_twitter',
            'social_instagram', 'social_linkedin', 'donation_enabled',
            'volunteer_registration', 'event_registration', 'maintenance_mode',
        ];

        $fields = [];
        $params = [];
        $types = '';

        foreach ($allowedFields as $field) {
            if (array_key_exists($field, $data)) {
                $fields[] = "$field = ?";
                $params[] = $data[$field];
                $types .= 's';
            }
        }

        if (empty($fields)) ResponseHelper::error('No valid fields to update', 400);

        if ($existing) {
            $fields[] = 'updated_at = NOW()';
            $params[] = 1;
            $types .= 'i';
            Database::execute("UPDATE settings SET " . implode(', ', $fields) . " WHERE id = ?", $params, $types);
        } else {
            $fields[] = 'created_at';
            $params[] = date('Y-m-d H:i:s');
            $types .= 's';
            $fields[] = 'updated_at';
            $params[] = date('Y-m-d H:i:s');
            $types .= 's';

            $columns = implode(', ', array_map(function ($f) { return str_replace(' = '', '', $f); }, $fields));
            $placeholders = implode(', ', array_fill(0, count($fields), '?'));

            Database::insert("INSERT INTO settings ($columns) VALUES ($placeholders)", $params, $types);
        }

        $this->auditModel->create([
            'user_id' => auth_id(),
            'action' => 'update_settings',
            'entity_type' => 'settings',
            'entity_id' => 1,
            'details' => json_encode(array_keys($data)),
            'ip_address' => $_SERVER['REMOTE_ADDR'] ?? '',
        ]);

        $settings = Database::row("SELECT * FROM settings WHERE id = 1");
        ResponseHelper::success($settings, 'Settings updated successfully');
    }
}
