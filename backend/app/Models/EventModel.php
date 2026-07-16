<?php

namespace App\Models;

use App\Config\Database;

class EventModel
{
    private string $table = 'events';

    public function create(array $data): int
    {
        return Database::insert(
            "INSERT INTO {$this->table} (title, description, category, status, start_date, end_date, location, max_participants, image, created_by, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())",
            [
                $data['title'],
                $data['description'] ?? null,
                $data['category'] ?? 'general',
                $data['status'] ?? 'upcoming',
                $data['start_date'],
                $data['end_date'] ?? null,
                $data['location'] ?? null,
                $data['max_participants'] ?? null,
                $data['image'] ?? null,
                $data['created_by'] ?? null,
            ]
        );
    }

    public function findById(int $id): ?array
    {
        return Database::row(
            "SELECT e.*, u.first_name as creator_first_name, u.last_name as creator_last_name, (SELECT COUNT(*) FROM event_registrations WHERE event_id = e.id) as registered_count FROM {$this->table} e LEFT JOIN users u ON e.created_by = u.id WHERE e.id = ?",
            [$id],
            'i'
        );
    }

    public function findAll(int $limit = 50, int $offset = 0, string $search = '', string $status = ''): array
    {
        $sql = "SELECT e.*, (SELECT COUNT(*) FROM event_registrations WHERE event_id = e.id) as registered_count FROM {$this->table} e WHERE 1=1";
        $params = [];
        $types = '';

        if ($search) {
            $sql .= " AND (e.title LIKE ? OR e.description LIKE ?)";
            $searchTerm = "%$search%";
            $params[] = $searchTerm;
            $params[] = $searchTerm;
            $types .= 'ss';
        }

        if ($status) {
            $sql .= " AND e.status = ?";
            $params[] = $status;
            $types .= 's';
        }

        $sql .= " ORDER BY e.start_date DESC LIMIT ? OFFSET ?";
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
            $sql .= " AND (title LIKE ? OR description LIKE ?)";
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

        return (int) Database::scalar($sql, $params, $types);
    }

    public function update(int $id, array $data): bool
    {
        $fields = [];
        $params = [];
        $types = '';

        $allowedFields = ['title', 'description', 'category', 'status', 'start_date', 'end_date', 'location', 'max_participants', 'image'];

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

    public function register(int $eventId, int $userId, ?string $name = null, ?string $email = null): int
    {
        $existing = Database::row(
            "SELECT id FROM event_registrations WHERE event_id = ? AND user_id = ?",
            [$eventId, $userId],
            'ii'
        );

        if ($existing) {
            return 0;
        }

        return Database::insert(
            "INSERT INTO event_registrations (event_id, user_id, name, email, registered_at) VALUES (?, ?, ?, ?, NOW())",
            [$eventId, $userId, $name, $email]
        );
    }

    public function getRegistrations(int $eventId): array
    {
        return Database::query(
            "SELECT er.*, u.first_name, u.last_name, u.email as user_email FROM event_registrations er LEFT JOIN users u ON er.user_id = u.id WHERE er.event_id = ? ORDER BY er.registered_at DESC",
            [$eventId],
            'i'
        );
    }

    public function isRegistered(int $eventId, int $userId): bool
    {
        $row = Database::row(
            "SELECT id FROM event_registrations WHERE event_id = ? AND user_id = ?",
            [$eventId, $userId],
            'ii'
        );
        return $row !== null;
    }

    public function findUpcoming(): array
    {
        return Database::query(
            "SELECT * FROM {$this->table} WHERE status = 'upcoming' AND start_date >= NOW() ORDER BY start_date ASC LIMIT 10"
        );
    }
}
