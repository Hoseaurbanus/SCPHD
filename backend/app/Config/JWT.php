<?php

namespace App\Config;

class JWT
{
    public static function getSecret(): string
    {
        return getenv('JWT_SECRET') ?: 'default-secret-change-this';
    }

    public static function getAccessExpiry(): int
    {
        return (int) (getenv('JWT_ACCESS_EXPIRY') ?: 900);
    }

    public static function getRefreshExpiry(): int
    {
        return (int) (getenv('JWT_REFRESH_EXPIRY') ?: 604800);
    }

    public static function getIssuer(): string
    {
        return getenv('JWT_ISSUER') ?: 'SCPHD-NGO';
    }

    public static function getAlgorithm(): string
    {
        return 'HS256';
    }
}
