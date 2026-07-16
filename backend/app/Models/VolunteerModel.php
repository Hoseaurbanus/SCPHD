<?php

namespace App\Models;

use App\Config\Database;

class VolunteerModel
{
    private string $table = 'volunteers';

    public function create(array $data): int
    {
        return Database::insert(
            "INSERT INTO {$this->table} (user_id, first_name, last_name, email, phone, skills, availability, status, start_date, notes, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())",
            [
                $data['user_id'] ?? null,
                $data['first_name'],
                $data['last_name'],
                $data['email'],
                $data['phone'] ?? null,
                $data['skills'] ?? null,
                $data['availability'] ?? null,
                $data['status'] ?? 'active',
                $data['start_date'] ?? null,
                $data['notes'] ?? null,
            ]
        );
    }

    public function findById(int $id): ?array
    {
        return Database::row(
            "SELECT v.*, u.avatar FROM {$this->table} v LEFT JOIN users u ON v.user_id = u.id WHERE v.id = ?",
            [$id],
            'i'
        );
    }

    public function findAll(int $limit = 50, int $offset = 0, string $search = '', string $status = ''): array
    {
        $sql = "SELECT v.*, u.avatar FROM {$this->table} v LEFT JOIN users u ON v.user_id = u.id WHERE 1=1";
        $params = [];
        $types = '';

        if ($search) {
            $sql .= " AND (v.first_name LIKE ? OR v.last_name LIKE ? OR v.email LIKE ?)";
            $searchTerm = "%$search%";
            $params[] = $searchTerm;
            $params[] = $searchTerm;
            $params[] = $searchTerm;
            $types .= 'sss';
        }

        if ($status) {
            $sql .= " AND v.status = ?";
            $params[] = $status;
            $types .= 's';
        }

        $sql .= " ORDER BY v.created_at DESC LIMIT ? OFFSET ?";
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
            $sql .= " AND (first_name LIKE ? OR last_name LIKE ? OR email LIKE ?)";
            $searchTerm = "%$search%";
            $params[] = $searchTerm;
            $params[] = $searchTerm;
            $params[] = $searchTerm;
            $types .= 'sss';
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

        $allowedFields = ['first_name', 'last_name', 'email', 'phone', 'skills', 'availability', 'status', 'start_date', 'notes'];

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

    public function getMissions(int $volunteerId): array
    {
        return Database::query(
            "SELECT vm.*, p.name as program_name FROM volunteer_missions vm LEFT JOIN programs p ON vm.program_id = p.id WHERE vm.volunteer_id = ? ORDER BY vm.start_date DESC",
            [$volunteerId],
            'i'
        );
    }

    public function addHours(int $volunteerId, array $data): int
    {
        return Database::insert(
            "INSERT INTO volunteer_hours (volunteer_id, program_id, hours, date, description, created_at) VALUES (?, ?, ?, ?, ?, NOW())",
            [
                $volunteerId,
                $data['program_id'] ?? null,
                $data['hours'],
                $data['date'] ?? date('Y-m-d'),
                $data['description'] ?? null,
            ]
        );
    }

    public function getHours(int $volunteerId): float
    {
        return (float) Database::scalar(
            "SELECT COALESCE(SUM(hours), 0) as total FROM volunteer_hours WHERE volunteer_id = ?",
            [$volunteerId],
            'i'
        );
    }

    public function getImpactStats(): array
    {
        $totalVolunteers = $this->countAll();
        $activeVolunteers = $this->countByStatus('active');
        $totalHours = (float) Database::scalar("SELECT COALESCE(SUM(hours), 0) FROM volunteer_hours");
        $totalMissions = (int) Database::scalar("SELECT COUNT(*) FROM volunteer_missions");

        return [
            'total_volunteers' => $totalVolunteers,
            'active_volunteers' => $activeVolunteers,
            'total_hours' => $totalHours,
            'total_missions' => $totalMissions,
        ];
    }

    public function findActive(): array
    {
        return Database::query(
            "SELECT * FROM {$this->table} WHERE status = 'active' ORDER BY first_name ASC"
        );
    }
}
