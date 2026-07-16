<?php

namespace App\Models;

use App\Config\Database;

class ReportModel
{
    private string $table = 'reports';

    public function create(array $data): int
    {
        return Database::insert(
            "INSERT INTO {$this->table} (title, description, type, status, data, file_path, created_by, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())",
            [
                $data['title'],
                $data['description'] ?? null,
                $data['type'] ?? 'general',
                $data['status'] ?? 'draft',
                $data['data'] ?? null,
                $data['file_path'] ?? null,
                $data['created_by'] ?? null,
            ]
        );
    }

    public function findById(int $id): ?array
    {
        return Database::row(
            "SELECT r.*, u.first_name as creator_first_name, u.last_name as creator_last_name FROM {$this->table} r LEFT JOIN users u ON r.created_by = u.id WHERE r.id = ?",
            [$id],
            'i'
        );
    }

    public function findAll(int $limit = 50, int $offset = 0, string $search = '', string $type = '', string $status = ''): array
    {
        $sql = "SELECT r.*, u.first_name as creator_first_name, u.last_name as creator_last_name FROM {$this->table} r LEFT JOIN users u ON r.created_by = u.id WHERE 1=1";
        $params = [];
        $types = '';

        if ($search) {
            $sql .= " AND (r.title LIKE ? OR r.description LIKE ?)";
            $searchTerm = "%$search%";
            $params[] = $searchTerm;
            $params[] = $searchTerm;
            $types .= 'ss';
        }

        if ($type) {
            $sql .= " AND r.type = ?";
            $params[] = $type;
            $types .= 's';
        }

        if ($status) {
            $sql .= " AND r.status = ?";
            $params[] = $status;
            $types .= 's';
        }

        $sql .= " ORDER BY r.created_at DESC LIMIT ? OFFSET ?";
        $params[] = $limit;
        $params[] = $offset;
        $types .= 'ii';

        return Database::query($sql, $params, $types);
    }

    public function count(string $search = '', string $type = '', string $status = ''): int
    {
        $sql = "SELECT COUNT(*) as cnt FROM {$this->table} WHERE 1=1";
        $params = [];
        $types = '';

        if ($search) {
            $sql .= " AND (title LIKE ? OR description LIKE ?)";
            $searchTerm = "%$search%";
            $params[] = $searchTerm;
            $params[] = $searchTerm;
            $types .= 'ss';
        }

        if ($type) {
            $sql .= " AND type = ?";
            $params[] = $type;
            $types .= 's';
        }

        if ($status) {
            $sql .= " AND status = ?";
            $params[] = $status;
            $types .= 's';
        }

        return (int) Database::scalar($sql, $params, $types);
    }

    public function update(int $id, array $data): bool
    {
        $fields = [];
        $params = [];
        $types = '';

        $allowedFields = ['title', 'description', 'type', 'status', 'data', 'file_path'];

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

    public function countAll(): int
    {
        return (int) Database::scalar("SELECT COUNT(*) as cnt FROM {$this->table}");
    }
}
