<?php

namespace App\Controllers;

use App\Config\Database;
use App\Libraries\ResponseHelper;
use App\Models\UserModel;
use App\Models\AuditLogModel;

class UserController
{
    private UserModel $userModel;
    private AuditLogModel $auditModel;

    public function __construct()
    {
        $this->userModel = new UserModel();
        $this->auditModel = new AuditLogModel();
    }

    /**
     * GET /api/users
     */
    public function index(): void
    {
        $page = max(1, (int) (query('page', 1)));
        $perPage = min(100, max(1, (int) (query('per_page', 20))));
        $search = query('search', '');
        $role = query('role', '');
        $offset = ($page - 1) * $perPage;

        $users = $this->userModel->findAll($perPage, $offset, $search, $role);
        $total = $this->userModel->count($search, $role);

        foreach ($users as &$user) {
            unset($user['password'], $user['email_verification_token'], $user['password_reset_token'], $user['password_reset_expires']);
        }

        ResponseHelper::paginated($users, $total, $page, $perPage);
    }

    /**
     * GET /api/users/{id}
     */
    public function show(string $id): void
    {
        $user = $this->userModel->findById((int) $id);
        if (!$user) {
            ResponseHelper::notFound('User not found');
        }

        unset($user['password'], $user['email_verification_token'], $user['password_reset_token'], $user['password_reset_expires']);

        ResponseHelper::success($user);
    }

    /**
     * POST /api/users
     */
    public function store(): void
    {
        $data = json_input();
        if (!$data) {
            ResponseHelper::error('Invalid JSON data', 400);
        }

        $errors = [];
        if (empty($data['email'])) $errors['email'] = 'Email is required';
        if (!filter_var($data['email'] ?? '', FILTER_VALIDATE_EMAIL)) $errors['email'] = 'Invalid email format';
        if (empty($data['password'])) $errors['password'] = 'Password is required';
        if (strlen($data['password'] ?? '') < 8) $errors['password'] = 'Password must be at least 8 characters';
        if (empty($data['first_name'])) $errors['first_name'] = 'First name is required';
        if (empty($data['last_name'])) $errors['last_name'] = 'Last name is required';

        if (!empty($errors)) {
            ResponseHelper::validation($errors);
        }

        $existing = $this->userModel->findByEmail($data['email']);
        if ($existing) {
            ResponseHelper::error('Email already registered', 422);
        }

        $userId = $this->userModel->create([
            'email' => $data['email'],
            'password' => hash_password($data['password']),
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'phone' => $data['phone'] ?? null,
            'role' => $data['role'] ?? 'member',
            'avatar' => $data['avatar'] ?? null,
            'is_active' => $data['is_active'] ?? 1,
            'email_verified' => $data['email_verified'] ?? 0,
        ]);

        if (!$userId) {
            ResponseHelper::error('Failed to create user', 500);
        }

        $user = $this->userModel->findById($userId);
        unset($user['password'], $user['email_verification_token'], $user['password_reset_token'], $user['password_reset_expires']);

        $authUser = auth_user();
        $this->auditModel->create([
            'user_id' => $authUser['user_id'] ?? null,
            'action' => 'create_user',
            'entity_type' => 'user',
            'entity_id' => $userId,
            'details' => json_encode(['email' => $data['email'], 'role' => $data['role'] ?? 'member']),
            'ip_address' => $_SERVER['REMOTE_ADDR'] ?? '',
        ]);

        ResponseHelper::created($user, 'User created successfully');
    }

    /**
     * PUT /api/users/{id}
     */
    public function update(string $id): void
    {
        $user = $this->userModel->findById((int) $id);
        if (!$user) {
            ResponseHelper::notFound('User not found');
        }

        $data = json_input();
        if (!$data) {
            ResponseHelper::error('Invalid JSON data', 400);
        }

        if (isset($data['email']) && $data['email'] !== $user['email']) {
            if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
                ResponseHelper::error('Invalid email format', 422);
            }
            $existing = $this->userModel->findByEmail($data['email']);
            if ($existing) {
                ResponseHelper::error('Email already in use', 422);
            }
        }

        $updateData = [];
        $fields = ['first_name', 'last_name', 'phone', 'email', 'avatar', 'is_active'];
        foreach ($fields as $field) {
            if (array_key_exists($field, $data)) {
                $updateData[$field] = $data[$field];
            }
        }

        if (!empty($updateData)) {
            $this->userModel->update((int) $id, $updateData);
        }

        if (isset($data['password']) && !empty($data['password'])) {
            if (strlen($data['password']) < 8) {
                ResponseHelper::error('Password must be at least 8 characters', 422);
            }
            $this->userModel->updatePassword((int) $id, hash_password($data['password']));
        }

        $updatedUser = $this->userModel->findById((int) $id);
        unset($updatedUser['password'], $updatedUser['email_verification_token'], $updatedUser['password_reset_token'], $updatedUser['password_reset_expires']);

        $authUser = auth_user();
        $this->auditModel->create([
            'user_id' => $authUser['user_id'] ?? null,
            'action' => 'update_user',
            'entity_type' => 'user',
            'entity_id' => (int) $id,
            'details' => json_encode(array_keys($updateData)),
            'ip_address' => $_SERVER['REMOTE_ADDR'] ?? '',
        ]);

        ResponseHelper::success($updatedUser, 'User updated successfully');
    }

    /**
     * DELETE /api/users/{id}
     */
    public function destroy(string $id): void
    {
        $user = $this->userModel->findById((int) $id);
        if (!$user) {
            ResponseHelper::notFound('User not found');
        }

        $this->userModel->delete((int) $id);

        $authUser = auth_user();
        $this->auditModel->create([
            'user_id' => $authUser['user_id'] ?? null,
            'action' => 'delete_user',
            'entity_type' => 'user',
            'entity_id' => (int) $id,
            'details' => json_encode(['email' => $user['email']]),
            'ip_address' => $_SERVER['REMOTE_ADDR'] ?? '',
        ]);

        ResponseHelper::noContent('User deleted successfully');
    }

    /**
     * POST /api/users/{id}/role
     */
    public function assignRole(string $id): void
    {
        $user = $this->userModel->findById((int) $id);
        if (!$user) {
            ResponseHelper::notFound('User not found');
        }

        $data = json_input();
        if (!$data || empty($data['role'])) {
            ResponseHelper::error('Role is required', 400);
        }

        $validRoles = ['super_admin', 'admin', 'manager', 'coordinator', 'volunteer', 'donor', 'member', 'guest'];
        if (!in_array($data['role'], $validRoles)) {
            ResponseHelper::error('Invalid role', 422);
        }

        $this->userModel->update((int) $id, ['role' => $data['role']]);

        $authUser = auth_user();
        $this->auditModel->create([
            'user_id' => $authUser['user_id'] ?? null,
            'action' => 'assign_role',
            'entity_type' => 'user',
            'entity_id' => (int) $id,
            'details' => json_encode(['old_role' => $user['role'], 'new_role' => $data['role']]),
            'ip_address' => $_SERVER['REMOTE_ADDR'] ?? '',
        ]);

        ResponseHelper::success(null, 'Role assigned successfully');
    }
}
