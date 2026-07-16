<?php

namespace App\Config;

class Cors
{
    public static function getAllowedOrigins(): array
    {
        $origins = getenv('CORS_ALLOW_ORIGIN') ?: '*';
        if ($origins === '*') {
            return ['*'];
        }
        return array_map('trim', explode(',', $origins));
    }

    public static function getAllowedMethods(): string
    {
        return getenv('CORS_ALLOW_METHODS') ?: 'GET, POST, PUT, DELETE, PATCH, OPTIONS';
    }

    public static function getAllowedHeaders(): string
    {
        return getenv('CORS_ALLOW_HEADERS') ?: 'Content-Type, Authorization, X-Requested-With';
    }

    public static function getMaxAge(): int
    {
        return 86400;
    }
}
