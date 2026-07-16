<?php

namespace App\Controllers;

use App\Config\Database;
use App\Libraries\JWTLibrary;
use App\Libraries\ResponseHelper;
use App\Models\UserModel;
use App\Models\AuditLogModel;

class AuthController
{
    private UserModel $userModel;
    private AuditLogModel $auditModel;
    private JWTLibrary $jwt;

    public function __construct()
    {
        $this->userModel = new UserModel();
        $this->auditModel = new AuditLogModel();
        $this->jwt = new JWTLibrary();
    }

    /**
     * POST /api/auth/register
     */
    public function register(): void
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
            'role' => 'member',
            'is_active' => 1,
            'email_verified' => 0,
        ]);

        if (!$userId) {
            ResponseHelper::error('Registration failed', 500);
        }

        $token = bin2hex(random_bytes(32));
        $this->userModel->setVerificationToken($userId, $token);

        $tokens = $this->jwt->createTokenPair([
            'user_id' => $userId,
            'email' => $data['email'],
            'role' => 'member',
        ]);

        $user = $this->userModel->findById($userId);

        $this->auditModel->create([
            'user_id' => $userId,
            'action' => 'register',
            'entity_type' => 'user',
            'entity_id' => $userId,
            'details' => json_encode(['email' => $data['email']]),
            'ip_address' => $_SERVER['REMOTE_ADDR'] ?? '',
        ]);

        ResponseHelper::created([
            'user' => $user,
            'tokens' => $tokens,
            'verification_token' => $token,
        ], 'Registration successful');
    }

    /**
     * POST /api/auth/login
     */
    public function login(): void
    {
        $data = json_input();
        if (!$data) {
            ResponseHelper::error('Invalid JSON data', 400);
        }

        if (empty($data['email']) || empty($data['password'])) {
            ResponseHelper::error('Email and password are required', 400);
        }

        $user = $this->userModel->findByEmail($data['email']);
        if (!$user || !verify_password($data['password'], $user['password'])) {
            ResponseHelper::error('Invalid email or password', 401);
        }

        if (!$user['is_active']) {
            ResponseHelper::error('Account is deactivated', 403);
        }

        $tokens = $this->jwt->createTokenPair([
            'user_id' => $user['id'],
            'email' => $user['email'],
            'role' => $user['role'],
        ]);

        unset($user['password'], $user['email_verification_token'], $user['password_reset_token'], $user['password_reset_expires']);

        $this->auditModel->create([
            'user_id' => $user['id'],
            'action' => 'login',
            'entity_type' => 'user',
            'entity_id' => $user['id'],
            'details' => json_encode(['email' => $data['email']]),
            'ip_address' => $_SERVER['REMOTE_ADDR'] ?? '',
        ]);

        ResponseHelper::success([
            'user' => $user,
            'tokens' => $tokens,
        ], 'Login successful');
    }

    /**
     * POST /api/auth/logout
     */
    public function logout(): void
    {
        $user = auth_user();
        if ($user) {
            $this->auditModel->create([
                'user_id' => $user['user_id'],
                'action' => 'logout',
                'entity_type' => 'user',
                'entity_id' => $user['user_id'],
                'details' => null,
                'ip_address' => $_SERVER['REMOTE_ADDR'] ?? '',
            ]);
        }

        ResponseHelper::success(null, 'Logged out successfully');
    }

    /**
     * POST /api/auth/refresh
     */
    public function refresh(): void
    {
        $data = json_input();
        if (!$data || empty($data['refresh_token'])) {
            ResponseHelper::error('Refresh token is required', 400);
        }

        $payload = $this->jwt->validate($data['refresh_token']);
        if (!$payload || ($payload['type'] ?? '') !== 'refresh') {
            ResponseHelper::error('Invalid refresh token', 401);
        }

        $user = $this->userModel->findById($payload['user_id']);
        if (!$user) {
            ResponseHelper::error('User not found', 401);
        }

        if (!$user['is_active']) {
            ResponseHelper::error('Account is deactivated', 403);
        }

        $tokens = $this->jwt->createTokenPair([
            'user_id' => $user['id'],
            'email' => $user['email'],
            'role' => $user['role'],
        ]);

        ResponseHelper::success(['tokens' => $tokens], 'Token refreshed');
    }

    /**
     * POST /api/auth/forgot-password
     */
    public function forgotPassword(): void
    {
        $data = json_input();
        if (!$data || empty($data['email'])) {
            ResponseHelper::error('Email is required', 400);
        }

        $user = $this->userModel->findByEmail($data['email']);
        if (!$user) {
            ResponseHelper::success(null, 'If your email is registered, you will receive a password reset link');
            return;
        }

        $token = bin2hex(random_bytes(32));
        $expires = date('Y-m-d H:i:s', strtotime('+1 hour'));
        $this->userModel->setResetToken($user['id'], $token, $expires);

        $this->auditModel->create([
            'user_id' => $user['id'],
            'action' => 'forgot_password',
            'entity_type' => 'user',
            'entity_id' => $user['id'],
            'details' => null,
            'ip_address' => $_SERVER['REMOTE_ADDR'] ?? '',
        ]);

        ResponseHelper::success([
            'reset_token' => $token,
            'message' => 'In production, this would send an email with the reset link',
        ], 'If your email is registered, you will receive a password reset link');
    }

    /**
     * POST /api/auth/reset-password
     */
    public function resetPassword(): void
    {
        $data = json_input();
        if (!$data || empty($data['token']) || empty($data['password'])) {
            ResponseHelper::error('Token and new password are required', 400);
        }

        if (strlen($data['password']) < 8) {
            ResponseHelper::error('Password must be at least 8 characters', 422);
        }

        $user = $this->userModel->findByResetToken($data['token']);
        if (!$user) {
            ResponseHelper::error('Invalid or expired reset token', 400);
        }

        $this->userModel->updatePassword($user['id'], hash_password($data['password']));
        $this->userModel->clearResetToken($user['id']);

        $this->auditModel->create([
            'user_id' => $user['id'],
            'action' => 'reset_password',
            'entity_type' => 'user',
            'entity_id' => $user['id'],
            'details' => null,
            'ip_address' => $_SERVER['REMOTE_ADDR'] ?? '',
        ]);

        ResponseHelper::success(null, 'Password reset successfully');
    }

    /**
     * POST /api/auth/verify-email
     */
    public function verifyEmail(): void
    {
        $data = json_input();
        if (!$data || empty($data['token'])) {
            ResponseHelper::error('Verification token is required', 400);
        }

        $user = $this->userModel->findByVerificationToken($data['token']);
        if (!$user) {
            ResponseHelper::error('Invalid verification token', 400);
        }

        $this->userModel->verifyEmail($user['id']);

        $this->auditModel->create([
            'user_id' => $user['id'],
            'action' => 'verify_email',
            'entity_type' => 'user',
            'entity_id' => $user['id'],
            'details' => null,
            'ip_address' => $_SERVER['REMOTE_ADDR'] ?? '',
        ]);

        ResponseHelper::success(null, 'Email verified successfully');
    }

    /**
     * GET /api/auth/me
     */
    public function me(): void
    {
        $authUser = auth_user();
        if (!$authUser) {
            ResponseHelper::unauthorized();
        }

        $user = $this->userModel->findById($authUser['user_id']);
        if (!$user) {
            ResponseHelper::notFound('User not found');
        }

        unset($user['password'], $user['email_verification_token'], $user['password_reset_token'], $user['password_reset_expires']);

        ResponseHelper::success($user);
    }
}
