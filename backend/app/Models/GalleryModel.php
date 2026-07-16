<?php

namespace App\Models;

use App\Config\Database;

class GalleryModel
{
    private string $table = 'gallery';

    public function create(array $data): int
    {
        return Database::insert(
            "INSERT INTO {$this->table} (title, description, file_path, file_type, file_size, category, uploaded_by, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())",
            [
                $data['title'] ?? null,
                $data['description'] ?? null,
                $data['file_path'],
                $data['file_type'] ?? null,
                $data['file_size'] ?? null,
                $data['category'] ?? 'general',
                $data['uploaded_by'] ?? null,
            ]
        );
    }

    public function findById(int $id): ?array
    {
        return Database::row(
            "SELECT g.*, u.first_name as uploader_first_name, u.last_name as uploader_last_name FROM {$this->table} g LEFT JOIN users u ON g.uploaded_by = u.id WHERE g.id = ?",
            [$id],
            'i'
        );
    }

    public function findAll(int $limit = 50, int $offset = 0, string $search = '', string $category = ''): array
    {
        $sql = "SELECT g.*, u.first_name as uploader_first_name, u.last_name as uploader_last_name FROM {$this->table} g LEFT JOIN users u ON g.uploaded_by = u.id WHERE 1=1";
        $params = [];
        $types = '';

        if ($search) {
            $sql .= " AND (g.title LIKE ? OR g.description LIKE ?)";
            $searchTerm = "%$search%";
            $params[] = $searchTerm;
            $params[] = $searchTerm;
            $types .= 'ss';
        }

        if ($category) {
            $sql .= " AND g.category = ?";
            $params[] = $category;
            $types .= 's';
        }

        $sql .= " ORDER BY g.created_at DESC LIMIT ? OFFSET ?";
        $params[] = $limit;
        $params[] = $offset;
        $types .= 'ii';

        return Database::query($sql, $params, $types);
    }

    public function count(string $search = '', string $category = ''): int
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

        if ($category) {
            $sql .= " AND category = ?";
            $params[] = $category;
            $types .= 's';
        }

        return (int) Database::scalar($sql, $params, $types);
    }

    public function update(int $id, array $data): bool
    {
        $fields = [];
        $params = [];
        $types = '';

        $allowedFields = ['title', 'description', 'file_path', 'file_type', 'file_size', 'category'];

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

    public function getTotalSize(): int
    {
        return (int) Database::scalar("SELECT COALESCE(SUM(file_size), 0) as total FROM {$this->table}");
    }
}
