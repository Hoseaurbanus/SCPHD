<?php

namespace App\Filters;

class AuthFilter
{
    private static array $publicRoutes = [
        'POST' => [
            '/api/auth/login',
            '/api/auth/register',
            '/api/auth/forgot-password',
            '/api/auth/reset-password',
            '/api/auth/refresh',
        ],
        'GET' => [
            '/api/news',
            '/api/events',
            '/api/gallery',
            '/api/programs',
            '/api/projects',
            '/api/partners',
        ],
        'POST_public' => [
            '/api/contacts',
        ],
    ];

    /**
     * Check if the route requires authentication
     */
    public static function requiresAuth(string $method, string $uri): bool
    {
        $uri = rtrim($uri, '/');

        // Check exact public routes
        if (isset(self::$publicRoutes[$method])) {
            foreach (self::$publicRoutes[$method] as $route) {
                if (rtrim($route, '/') === $uri) {
                    return false;
                }
            }
        }

        // Check pattern-based public routes (GET with no ID)
        if ($method === 'GET') {
            $publicPrefixes = [
                '/api/news',
                '/api/events',
                '/api/gallery',
                '/api/programs',
                '/api/projects',
                '/api/partners',
            ];
            foreach ($publicPrefixes as $prefix) {
                if ($uri === $prefix || $uri === $prefix . '/') {
                    return false;
                }
            }
        }

        // POST contacts is public
        if ($method === 'POST' && (str_starts_with($uri, '/api/contacts') || str_starts_with($uri, '/api/contacts/'))) {
            // Only if it's the root contacts endpoint (not with /id)
            $parts = explode('/', trim($uri, '/'));
            if (count($parts) <= 2) {
                return false;
            }
        }

        // All API routes require auth
        if (str_starts_with($uri, '/api/')) {
            return true;
        }

        return false;
    }

    /**
     * Extract the JWT token from the Authorization header
     */
    public static function extractToken(): ?string
    {
        $header = $_SERVER['HTTP_AUTHORIZATION'] ?? '';

        if (empty($header)) {
            return null;
        }

        // Support "Bearer <token>" format
        if (preg_match('/^Bearer\s+(.+)$/i', $header, $matches)) {
            return $matches[1];
        }

        return $header;
    }
}
