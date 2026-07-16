<?php

namespace App\Filters;

class RoleFilter
{
    private static array $roleRoutes = [
        'POST' => [
            '/api/users' => 'super_admin',
            '/api/programs' => 'admin',
            '/api/projects' => 'admin',
            '/api/events' => 'admin',
            '/api/news' => 'admin',
            '/api/gallery' => 'admin',
            '/api/reports' => 'admin',
        ],
        'PUT' => [
            '/api/users/{id}' => 'super_admin',
            '/api/programs/{id}' => 'admin',
            '/api/projects/{id}' => 'admin',
            '/api/events/{id}' => 'admin',
            '/api/news/{id}' => 'admin',
            '/api/gallery/{id}' => 'admin',
            '/api/reports/{id}' => 'admin',
        ],
        'DELETE' => [
            '/api/users/{id}' => 'super_admin',
            '/api/programs/{id}' => 'admin',
            '/api/projects/{id}' => 'admin',
            '/api/events/{id}' => 'admin',
            '/api/news/{id}' => 'admin',
            '/api/gallery/{id}' => 'admin',
            '/api/reports/{id}' => 'admin',
        ],
        'POST_role' => [
            '/api/users/{id}/role' => 'super_admin',
        ],
    ];

    /**
     * Get the required role for a route
     */
    public static function getRequiredRole(string $method, string $uri): ?string
    {
        $uri = rtrim($uri, '/');

        if (!isset(self::$roleRoutes[$method])) {
            return null;
        }

        foreach (self::$roleRoutes[$method] as $pattern => $role) {
            if (self::matchPattern($pattern, $uri)) {
                return $role;
            }
        }

        return null;
    }

    /**
     * Match a route pattern with wildcards
     */
    private static function matchPattern(string $pattern, string $uri): bool
    {
        $pattern = rtrim($pattern, '/');

        // Convert {id} to regex
        $regex = preg_replace('/\{[^}]+\}/', '[^/]+', $pattern);
        $regex = '#^' . $regex . '$#';

        return (bool) preg_match($regex, $uri);
    }
}
