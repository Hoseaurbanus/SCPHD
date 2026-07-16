<?php

namespace App\Models;

use App\Config\Database;

class AuditLogModel
{
    private string $table = 'audit_logs';

    public function create(array $data): int
    {
        return Database::insert(
            "INSERT INTO {$this->table} (user_id, action, entity_type, entity_id, details, ip_address, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())",
            [
                $data['user_id'] ?? null,
                $data['action'],
                $data['entity_type'] ?? null,
                $data['entity_id'] ?? null,
                $data['details'] ?? null,
                $data['ip_address'] ?? '',
            ]
        );
    }

    public function findAll(int $limit = 50, int $offset = 0): array
    {
        return Database::query(
            "SELECT * FROM {$this->table} ORDER BY created_at DESC LIMIT ? OFFSET ?",
            [$limit, $offset],
            'ii'
        );
    }

    public function findByUser(int $userId, int $limit = 50, int $offset = 0): array
    {
        return Database::query(
            "SELECT * FROM {$this->table} WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?",
            [$userId, $limit, $offset],
            'iii'
        );
    }

    public function findByEntity(string $entityType, int $entityId): array
    {
        return Database::query(
            "SELECT * FROM {$this->table} WHERE entity_type = ? AND entity_id = ? ORDER BY created_at DESC",
            [$entityType, $entityId]
        );
    }

    public function count(): int
    {
        return (int) Database::scalar("SELECT COUNT(*) as cnt FROM {$this->table}");
    }

    public function deleteOld(int $days = 90): int
    {
        return (int) Database::execute(
            "DELETE FROM {$this->table} WHERE created_at < DATE_SUB(NOW(), INTERVAL ? DAY)",
            [$days],
            'i'
        );
    }
}
