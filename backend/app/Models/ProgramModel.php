<?php

namespace App\Models;

use App\Config\Database;

class ProgramModel
{
    private string $table = 'programs';

    public function create(array $data): int
    {
        return Database::insert(
            "INSERT INTO {$this->table} (name, description, category, status, start_date, end_date, budget, beneficiaries, location, image, created_by, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())",
            [
                $data['name'],
                $data['description'] ?? null,
                $data['category'] ?? 'general',
                $data['status'] ?? 'active',
                $data['start_date'] ?? null,
                $data['end_date'] ?? null,
                $data['budget'] ?? 0,
                $data['beneficiaries'] ?? 0,
                $data['location'] ?? null,
                $data['image'] ?? null,
                $data['created_by'] ?? null,
            ]
        );
    }

    public function findById(int $id): ?array
    {
        return Database::row(
            "SELECT p.*, u.first_name as creator_first_name, u.last_name as creator_last_name FROM {$this->table} p LEFT JOIN users u ON p.created_by = u.id WHERE p.id = ?",
            [$id],
            'i'
        );
    }

    public function findAll(int $limit = 50, int $offset = 0, string $search = '', string $status = '', string $category = ''): array
    {
        $sql = "SELECT p.*, u.first_name as creator_first_name, u.last_name as creator_last_name FROM {$this->table} p LEFT JOIN users u ON p.created_by = u.id WHERE 1=1";
        $params = [];
        $types = '';

        if ($search) {
            $sql .= " AND (p.name LIKE ? OR p.description LIKE ?)";
            $searchTerm = "%$search%";
            $params[] = $searchTerm;
            $params[] = $searchTerm;
            $types .= 'ss';
        }

        if ($status) {
            $sql .= " AND p.status = ?";
            $params[] = $status;
            $types .= 's';
        }

        if ($category) {
            $sql .= " AND p.category = ?";
            $params[] = $category;
            $types .= 's';
        }

        $sql .= " ORDER BY p.created_at DESC LIMIT ? OFFSET ?";
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
            $sql .= " AND (name LIKE ? OR description LIKE ?)";
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

        $allowedFields = ['name', 'description', 'category', 'status', 'start_date', 'end_date', 'budget', 'beneficiaries', 'location', 'image'];

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

    public function countByStatus(string $status): int
    {
        return (int) Database::scalar("SELECT COUNT(*) as cnt FROM {$this->table} WHERE status = ?", [$status]);
    }

    public function getTotalBudget(): float
    {
        return (float) Database::scalar("SELECT COALESCE(SUM(budget), 0) as total FROM {$this->table}");
    }

    public function getTotalBeneficiaries(): int
    {
        return (int) Database::scalar("SELECT COALESCE(SUM(beneficiaries), 0) as total FROM {$this->table}");
    }

    public function getMetrics(int $id): array
    {
        $program = $this->findById($id);
        if (!$program) return [];

        $donations = Database::row(
            "SELECT COALESCE(SUM(amount), 0) as total_donations, COUNT(*) as donation_count FROM donations WHERE program_id = ?",
            [$id],
            'i'
        );

        $volunteers = Database::scalar(
            "SELECT COUNT(DISTINCT volunteer_id) FROM volunteer_programs WHERE program_id = ?",
            [$id],
            'i'
        );

        return [
            'program' => $program,
            'donations' => $donations,
            'volunteer_count' => (int) $volunteers,
        ];
    }

    public function findActive(): array
    {
        return Database::query(
            "SELECT * FROM {$this->table} WHERE status = 'active' ORDER BY name ASC"
        );
    }
}
