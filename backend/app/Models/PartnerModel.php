<?php

namespace App\Models;

use App\Config\Database;

class PartnerModel
{
    private string $table = 'partners';

    public function create(array $data): int
    {
        return Database::insert(
            "INSERT INTO {$this->table} (name, description, type, email, phone, website, address, logo, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())",
            [
                $data['name'],
                $data['description'] ?? null,
                $data['type'] ?? 'general',
                $data['email'] ?? null,
                $data['phone'] ?? null,
                $data['website'] ?? null,
                $data['address'] ?? null,
                $data['logo'] ?? null,
                $data['status'] ?? 'active',
            ]
        );
    }

    public function findById(int $id): ?array
    {
        return Database::row(
            "SELECT * FROM {$this->table} WHERE id = ?",
            [$id],
            'i'
        );
    }

    public function findAll(int $limit = 50, int $offset = 0, string $search = '', string $type = '', string $status = ''): array
    {
        $sql = "SELECT * FROM {$this->table} WHERE 1=1";
        $params = [];
        $types = '';

        if ($search) {
            $sql .= " AND (name LIKE ? OR description LIKE ?)";
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

        $sql .= " ORDER BY name ASC LIMIT ? OFFSET ?";
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
            $sql .= " AND (name LIKE ? OR description LIKE ?)";
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

        $allowedFields = ['name', 'description', 'type', 'email', 'phone', 'website', 'address', 'logo', 'status'];

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

    public function findActive(): array
    {
        return Database::query(
            "SELECT * FROM {$this->table} WHERE status = 'active' ORDER BY name ASC"
        );
    }
}
