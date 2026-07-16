<?php

namespace App\Models;

use App\Config\Database;

class DonationModel
{
    private string $table = 'donations';

    public function create(array $data): int
    {
        return Database::insert(
            "INSERT INTO {$this->table} (donor_name, donor_email, donor_phone, amount, currency, payment_method, payment_status, program_id, project_id, is_recurring, recurring_interval, notes, receipt_number, user_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())",
            [
                $data['donor_name'],
                $data['donor_email'] ?? null,
                $data['donor_phone'] ?? null,
                $data['amount'],
                $data['currency'] ?? 'USD',
                $data['payment_method'] ?? 'cash',
                $data['payment_status'] ?? 'completed',
                $data['program_id'] ?? null,
                $data['project_id'] ?? null,
                $data['is_recurring'] ?? 0,
                $data['recurring_interval'] ?? null,
                $data['notes'] ?? null,
                $data['receipt_number'] ?? null,
                $data['user_id'] ?? null,
            ]
        );
    }

    public function findById(int $id): ?array
    {
        return Database::row(
            "SELECT d.*, p.name as program_name, pr.name as project_name FROM {$this->table} d LEFT JOIN programs p ON d.program_id = p.id LEFT JOIN projects pr ON d.project_id = pr.id WHERE d.id = ?",
            [$id],
            'i'
        );
    }

    public function findAll(int $limit = 50, int $offset = 0, string $search = '', string $status = '', ?int $userId = null): array
    {
        $sql = "SELECT d.*, p.name as program_name, pr.name as project_name FROM {$this->table} d LEFT JOIN programs p ON d.program_id = p.id LEFT JOIN projects pr ON d.project_id = pr.id WHERE 1=1";
        $params = [];
        $types = '';

        if ($search) {
            $sql .= " AND (d.donor_name LIKE ? OR d.donor_email LIKE ?)";
            $searchTerm = "%$search%";
            $params[] = $searchTerm;
            $params[] = $searchTerm;
            $types .= 'ss';
        }

        if ($status) {
            $sql .= " AND d.payment_status = ?";
            $params[] = $status;
            $types .= 's';
        }

        if ($userId) {
            $sql .= " AND d.user_id = ?";
            $params[] = $userId;
            $types .= 'i';
        }

        $sql .= " ORDER BY d.created_at DESC LIMIT ? OFFSET ?";
        $params[] = $limit;
        $params[] = $offset;
        $types .= 'ii';

        return Database::query($sql, $params, $types);
    }

    public function count(string $search = '', string $status = '', ?int $userId = null): int
    {
        $sql = "SELECT COUNT(*) as cnt FROM {$this->table} WHERE 1=1";
        $params = [];
        $types = '';

        if ($search) {
            $sql .= " AND (donor_name LIKE ? OR donor_email LIKE ?)";
            $searchTerm = "%$search%";
            $params[] = $searchTerm;
            $params[] = $searchTerm;
            $types .= 'ss';
        }

        if ($status) {
            $sql .= " AND payment_status = ?";
            $params[] = $status;
            $types .= 's';
        }

        if ($userId) {
            $sql .= " AND user_id = ?";
            $params[] = $userId;
            $types .= 'i';
        }

        return (int) Database::scalar($sql, $params, $types);
    }

    public function update(int $id, array $data): bool
    {
        $fields = [];
        $params = [];
        $types = '';

        $allowedFields = ['donor_name', 'donor_email', 'donor_phone', 'amount', 'currency', 'payment_method', 'payment_status', 'program_id', 'project_id', 'is_recurring', 'recurring_interval', 'notes', 'receipt_number'];

        foreach ($allowedFields as $field) {
            if (array_key_exists($field, $data)) {
                $fields[] = "$field = ?";
                $params[] = $data[$field];
                $types .= 's';
            }
        }

        if (empty($fields)) return false;

        $fields[] = 'updated_at = NOW()';
        $params[] = $id;
        $types .= 'i';

        Database::execute("UPDATE {$this->table} SET " . implode(', ', $fields) . " WHERE id = ?", $params, $types);
        return true;
    }

    public function delete(int $id): bool
    {
        Database::execute("DELETE FROM {$this->table} WHERE id = ?", [$id], 'i');
        return true;
    }

    public function getHistory(int $limit = 50, int $offset = 0, ?int $userId = null, ?int $programId = null, ?int $projectId = null): array
    {
        $sql = "SELECT * FROM {$this->table} WHERE payment_status = 'completed'";
        $params = [];
        $types = '';

        if ($userId) {
            $sql .= " AND user_id = ?";
            $params[] = $userId;
            $types .= 'i';
        }

        if ($programId) {
            $sql .= " AND program_id = ?";
            $params[] = $programId;
            $types .= 'i';
        }

        if ($projectId) {
            $sql .= " AND project_id = ?";
            $params[] = $projectId;
            $types .= 'i';
        }

        $sql .= " ORDER BY created_at DESC LIMIT ? OFFSET ?";
        $params[] = $limit;
        $params[] = $offset;
        $types .= 'ii';

        return Database::query($sql, $params, $types);
    }

    public function findRecurring(): array
    {
        return Database::query(
            "SELECT * FROM {$this->table} WHERE is_recurring = 1 AND payment_status = 'completed' ORDER BY created_at DESC"
        );
    }

    public function getTotalAmount(string $status = 'completed'): float
    {
        return (float) Database::scalar(
            "SELECT COALESCE(SUM(amount), 0) as total FROM {$this->table} WHERE payment_status = ?",
            [$status]
        );
    }

    public function countAll(): int
    {
        return (int) Database::scalar("SELECT COUNT(*) as cnt FROM {$this->table}");
    }

    public function getMonthlyStats(int $months = 12): array
    {
        return Database::query(
            "SELECT DATE_FORMAT(created_at, '%Y-%m') as month, SUM(amount) as total, COUNT(*) as count FROM {$this->table} WHERE payment_status = 'completed' AND created_at >= DATE_SUB(NOW(), INTERVAL ? MONTH) GROUP BY month ORDER BY month ASC",
            [$months],
            'i'
        );
    }

    public function getReceipt(int $id): ?array
    {
        return $this->findById($id);
    }
}
