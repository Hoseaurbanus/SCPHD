<?php

namespace App\Models;

use App\Config\Database;

class NewsModel
{
    private string $table = 'news';

    public function create(array $data): int
    {
        return Database::insert(
            "INSERT INTO {$this->table} (title, slug, content, excerpt, category, status, image, author_id, published_at, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())",
            [
                $data['title'],
                $data['slug'] ?? self::generateSlug($data['title']),
                $data['content'] ?? null,
                $data['excerpt'] ?? null,
                $data['category'] ?? 'general',
                $data['status'] ?? 'draft',
                $data['image'] ?? null,
                $data['author_id'] ?? null,
                $data['published_at'] ?? null,
            ]
        );
    }

    public function findById(int $id): ?array
    {
        return Database::row(
            "SELECT n.*, u.first_name as author_first_name, u.last_name as author_last_name FROM {$this->table} n LEFT JOIN users u ON n.author_id = u.id WHERE n.id = ?",
            [$id],
            'i'
        );
    }

    public function findBySlug(string $slug): ?array
    {
        return Database::row(
            "SELECT n.*, u.first_name as author_first_name, u.last_name as author_last_name FROM {$this->table} n LEFT JOIN users u ON n.author_id = u.id WHERE n.slug = ?",
            [$slug]
        );
    }

    public function findAll(int $limit = 50, int $offset = 0, string $search = '', string $status = '', string $category = ''): array
    {
        $sql = "SELECT n.*, u.first_name as author_first_name, u.last_name as author_last_name FROM {$this->table} n LEFT JOIN users u ON n.author_id = u.id WHERE 1=1";
        $params = [];
        $types = '';

        if ($search) {
            $sql .= " AND (n.title LIKE ? OR n.content LIKE ?)";
            $searchTerm = "%$search%";
            $params[] = $searchTerm;
            $params[] = $searchTerm;
            $types .= 'ss';
        }

        if ($status) {
            $sql .= " AND n.status = ?";
            $params[] = $status;
            $types .= 's';
        }

        if ($category) {
            $sql .= " AND n.category = ?";
            $params[] = $category;
            $types .= 's';
        }

        $sql .= " ORDER BY n.created_at DESC LIMIT ? OFFSET ?";
        $params[] = $limit;
        $params[] = $offset;
        $types .= 'ii';

        return Database::query($sql, $params, $types);
    }

    public function count(string $search = '', string $status = '', string $category = ''): int
    {
        $sql = "SELECT COUNT(*) as cnt FROM {$this->table} WHERE 1=1";
        $params = [];
        $types = '';

        if ($search) {
            $sql .= " AND (title LIKE ? OR content LIKE ?)";
            $searchTerm = "%$search%";
            $params[] = $searchTerm;
            $params[] = $searchTerm;
            $types .= 'ss';
        }

        if ($status) {
            $sql .= " AND status = ?";
            $params[] = $status;
            $types .= 's';
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

        $allowedFields = ['title', 'slug', 'content', 'excerpt', 'category', 'status', 'image', 'published_at'];

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

    public function findPublished(): array
    {
        return Database::query(
            "SELECT n.*, u.first_name as author_first_name, u.last_name as author_last_name FROM {$this->table} n LEFT JOIN users u ON n.author_id = u.id WHERE n.status = 'published' ORDER BY n.published_at DESC LIMIT 10"
        );
    }

    private static function generateSlug(string $title): string
    {
        $slug = strtolower(trim($title));
        $slug = preg_replace('/[^a-z0-9-]/', '-', $slug);
        $slug = preg_replace('/-+/', '-', $slug);
        return rtrim($slug, '-');
    }
}
