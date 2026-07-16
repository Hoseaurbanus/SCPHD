<?php

namespace App\Filters;

use App\Config\Cors;

class CorsFilter
{
    private static array $publicRoutes = [
        'POST /api/auth/login',
        'POST /api/auth/register',
        'POST /api/auth/forgot-password',
        'POST /api/auth/reset-password',
        'GET /api/news',
        'GET /api/news/',
        'GET /api/events',
        'GET /api/events/',
        'GET /api/gallery',
        'GET /api/gallery/',
        'GET /api/programs',
        'GET /api/programs/',
        'GET /api/projects',
        'GET /api/projects/',
        'GET /api/partners',
        'GET /api/partners/',
        'POST /api/contacts',
        'POST /api/contacts/',
    ];

    public static function handle(): void
    {
        $allowedOrigins = Cors::getAllowedOrigins();
        $origin = $_SERVER['HTTP_ORIGIN'] ?? '';

        if (in_array('*', $allowedOrigins)) {
            header('Access-Control-Allow-Origin: *');
        } elseif ($origin && in_array($origin, $allowedOrigins)) {
            header("Access-Control-Allow-Origin: $origin");
            header('Vary: Origin');
        }

        header('Access-Control-Allow-Methods: ' . Cors::getAllowedMethods());
        header('Access-Control-Allow-Headers: ' . Cors::getAllowedHeaders());
        header('Access-Control-Max-Age: ' . Cors::getMaxAge());
        header('Access-Control-Allow-Credentials: true');
    }
}
