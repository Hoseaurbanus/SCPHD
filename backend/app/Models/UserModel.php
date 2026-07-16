<?php

namespace App\Models;

use App\Config\Database;

class UserModel
{
    private string $table = 'users';

    public function create(array $data): int
    {
        return Database::insert(
            "INSERT INTO {$this->table} (email, password, first_name, last_name, phone, role, avatar, is_active, email_verified, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())",
            [
                $data['email'],
                $data['password'],
                $data['first_name'],
                $data['last_name'],
                $data['phone'] ?? null,
                $data['role'] ?? 'member',
                $data['avatar'] ?? null,
                $data['is_active'] ?? 1,
                $data['email_verified'] ?? 0,
            ]
        );
    }

    public function findById(int $id): ?array
    {
        return Database::row(
            "SELECT id, email, first_name, last_name, phone, role, avatar, is_active, email_verified, email_verification_token, created_at, updated_at FROM {$this->table} WHERE id = ?",
            [$id],
            'i'
        );
    }

    public function findByEmail(string $email): ?array
    {
        return Database::row(
            "SELECT * FROM {$this->table} WHERE email = ?",
            [$email]
        );
    }

    public function findByVerificationToken(string $token): ?array
    {
        return Database::row(
            "SELECT * FROM {$this->table} WHERE email_verification_token = ?",
            [$token]
        );
    }

    public function findByResetToken(string $token): ?array
    {
        return Database::row(
            "SELECT * FROM {$this->table} WHERE password_reset_token = ? AND password_reset_expires > NOW()",
            [$token]
        );
    }

    public function findAll(int $limit = 50, int $offset = 0, string $search = '', string $role = ''): array
    {
        $sql = "SELECT id, email, first_name, last_name, phone, role, avatar, is_active, email_verified, created_at FROM {$this->table} WHERE 1=1";
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

        if ($role) {
            $sql .= " AND role = ?";
            $params[] = $role;
            $types .= 's';
        }

        $sql .= " ORDER BY created_at DESC LIMIT ? OFFSET ?";
        $params[] = $limit;
        $params[] = $offset;
        $types .= 'ii';

        return Database::query($sql, $params, $types);
    }

    public function count(string $search = '', string $role = ''): int
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

        if ($role) {
            $sql .= " AND role = ?";
            $params[] = $role;
            $types .= 's';
        }

        return (int) Database::scalar($sql, $params, $types);
    }

    public function update(int $id, array $data): bool
    {
        $fields = [];
        $params = [];
        $types = '';

        $allowedFields = ['email', 'first_name', 'last_name', 'phone', 'role', 'avatar', 'is_active', 'email_verified', 'password', 'email_verification_token', 'password_reset_token', 'password_reset_expires'];

        foreach ($allowedFields as $field) {
            if (array_key_exists($field, $data)) {
                $fields[] = "$field = ?";
                $params[] = $data[$field];
                $types .= 's';
            }
        }

        if (empty($fields)) {
            return false;
        }

        $fields[] = 'updated_at = NOW()';
        $params[] = $id;
        $types .= 'i';

        $sql = "UPDATE {$this->table} SET " . implode(', ', $fields) . " WHERE id = ?";
        Database::execute($sql, $params, $types);
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

    public function countByRole(string $role): int
    {
        return (int) Database::scalar("SELECT COUNT(*) as cnt FROM {$this->table} WHERE role = ?", [$role]);
    }

    public function updatePassword(int $id, string $password): bool
    {
        Database::execute(
            "UPDATE {$this->table} SET password = ?, updated_at = NOW() WHERE id = ?",
            [$password, $id],
            'si'
        );
        return true;
    }

    public function setResetToken(int $id, string $token, string $expires): bool
    {
        Database::execute(
            "UPDATE {$this->table} SET password_reset_token = ?, password_reset_expires = ?, updated_at = NOW() WHERE id = ?",
            [$token, $expires, $id],
            'ssi'
        );
        return true;
    }

    public function clearResetToken(int $id): bool
    {
        Database::execute(
            "UPDATE {$this->table} SET password_reset_token = NULL, password_reset_expires = NULL, updated_at = NOW() WHERE id = ?",
            [$id],
            'i'
        );
        return true;
    }

    public function setVerificationToken(int $id, string $token): bool
    {
        Database::execute(
            "UPDATE {$this->table} SET email_verification_token = ?, updated_at = NOW() WHERE id = ?",
            [$token, $id],
            'si'
        );
        return true;
    }

    public function verifyEmail(int $id): bool
    {
        Database::execute(
            "UPDATE {$this->table} SET email_verified = 1, email_verification_token = NULL, updated_at = NOW() WHERE id = ?",
            [$id],
            'i'
        );
        return true;
    }
}
