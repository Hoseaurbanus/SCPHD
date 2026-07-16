<?php

namespace App\Models;

use App\Config\Database;

class ContactModel
{
    private string $table = 'contacts';

    public function create(array $data): int
    {
        return Database::insert(
            "INSERT INTO {$this->table} (name, email, phone, subject, message, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())",
            [
                $data['name'],
                $data['email'],
                $data['phone'] ?? null,
                $data['subject'] ?? null,
                $data['message'],
                $data['status'] ?? 'new',
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

    public function findAll(int $limit = 50, int $offset = 0, string $search = '', string $status = ''): array
    {
        $sql = "SELECT * FROM {$this->table} WHERE 1=1";
        $params = [];
        $types = '';

        if ($search) {
            $sql .= " AND (name LIKE ? OR email LIKE ? OR subject LIKE ? OR message LIKE ?)";
            $searchTerm = "%$search%";
            $params[] = $searchTerm;
            $params[] = $searchTerm;
            $params[] = $searchTerm;
            $params[] = $searchTerm;
            $types .= 'ssss';
        }

        if ($status) {
            $sql .= " AND status = ?";
            $params[] = $status;
            $types .= 's';
        }

        $sql .= " ORDER BY created_at DESC LIMIT ? OFFSET ?";
        $params[] = $limit;
        $params[] = $offset;
        $types .= 'ii';

        return Database::query($sql, $params, $types);
    }

    public function count(string $search = '', string $status = ''): int
    {
        $sql = "SELECT COUNT(*) as cnt FROM {$this->table} WHERE 1=1";
        $params = [];
        $types = '';

        if ($search) {
            $sql .= " AND (name LIKE ? OR email LIKE ? OR subject LIKE ? OR message LIKE ?)";
            $searchTerm = "%$search%";
            $params[] = $searchTerm;
            $params[] = $searchTerm;
            $params[] = $searchTerm;
            $params[] = $searchTerm;
            $types .= 'ssss';
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

        $allowedFields = ['name', 'email', 'phone', 'subject', 'message', 'status', 'response'];

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

    public function updateStatus(int $id, string $status): bool
    {
        Database::execute(
            "UPDATE {$this->table} SET status = ?, updated_at = NOW() WHERE id = ?",
            [$status, $id],
            'si'
        );
        return true;
    }

    public function countAll(): int
    {
        return (int) Database::scalar("SELECT COUNT(*) as cnt FROM {$this->table}");
    }

    public function countByStatus(string $status): int
    {
        return (int) Database::scalar("SELECT COUNT(*) as cnt FROM {$this->table} WHERE status = ?", [$status]);
    }

    public function findUnread(): array
    {
        return Database::query(
            "SELECT * FROM {$this->table} WHERE status = 'new' ORDER BY created_at DESC"
        );
    }
}
