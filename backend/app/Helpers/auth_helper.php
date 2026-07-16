<?php

use App\Config\Database;
use App\Libraries\JWTLibrary;

/**
 * Get the authenticated user from request
 */
function auth_user(): ?array
{
    return $_REQUEST['user'] ?? null;
}

/**
 * Get the authenticated user ID
 */
function auth_id(): ?int
{
    $user = auth_user();
    return $user ? (int) $user['user_id'] : null;
}

/**
 * Get the authenticated user role
 */
function auth_role(): ?string
{
    $user = auth_user();
    return $user['role'] ?? null;
}

/**
 * Check if the authenticated user has a specific role
 */
function auth_has_role(string $role): bool
{
    return auth_role() === $role;
}

/**
 * Check if user is super admin
 */
function is_super_admin(): bool
{
    return auth_has_role('super_admin');
}

/**
 * Hash a password
 */
function hash_password(string $password): string
{
    return password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);
}

/**
 * Verify a password
 */
function verify_password(string $password, string $hash): bool
{
    return password_verify($password, $hash);
}

/**
 * Generate a random string
 */
function random_string(int $length = 32): string
{
    return bin2hex(random_bytes($length / 2));
}

/**
 * Generate a UUID v4
 */
function uuid_v4(): string
{
    $data = random_bytes(16);
    $data[6] = chr(ord($data[6]) & 0x0f | 0x40);
    $data[8] = chr(ord($data[8]) & 0x3f | 0x80);
    return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
}

/**
 * Sanitize input
 */
function sanitize(string $input): string
{
    return htmlspecialchars(trim($input), ENT_QUOTES, 'UTF-8');
}

/**
 * Validate email
 */
function is_valid_email(string $email): bool
{
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

/**
 * Get JSON input from request
 */
function json_input(): ?array
{
    $raw = file_get_contents('php://input');
    if (empty($raw)) {
        return null;
    }
    $data = json_decode($raw, true);
    return json_last_error() === JSON_ERROR_NONE ? $data : null;
}

/**
 * Get a value from JSON input
 */
function input(string $key, $default = null)
{
    $data = json_input();
    return $data[$key] ?? $default;
}

/**
 * Get query parameter
 */
function query(string $key, $default = null)
{
    return $_GET[$key] ?? $default;
}

/**
 * Audit log helper
 */
function audit_log(string $action, ?int $userId = null, ?string $entityType = null, ?int $entityId = null, ?string $details = null): void
{
    try {
        Database::insert(
            'INSERT INTO audit_logs (user_id, action, entity_type, entity_id, details, ip_address, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())',
            [$userId, $action, $entityType, $entityId, $details, $_SERVER['REMOTE_ADDR'] ?? '']
        );
    } catch (\Exception $e) {
        // Silently fail - audit logging should not break the application
    }
}
