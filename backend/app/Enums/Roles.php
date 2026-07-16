<?php

namespace App\Enums;

class Roles
{
    const SUPER_ADMIN = 'super_admin';
    const ADMIN = 'admin';
    const MANAGER = 'manager';
    const COORDINATOR = 'coordinator';
    const VOLUNTEER = 'volunteer';
    const DONOR = 'donor';
    const MEMBER = 'member';
    const GUEST = 'guest';

    public static function getAll(): array
    {
        return [
            self::SUPER_ADMIN,
            self::ADMIN,
            self::MANAGER,
            self::COORDINATOR,
            self::VOLUNTEER,
            self::DONOR,
            self::MEMBER,
            self::GUEST,
        ];
    }

    public static function getLabels(): array
    {
        return [
            self::SUPER_ADMIN => 'Super Admin',
            self::ADMIN => 'Administrator',
            self::MANAGER => 'Manager',
            self::COORDINATOR => 'Coordinator',
            self::VOLUNTEER => 'Volunteer',
            self::DONOR => 'Donor',
            self::MEMBER => 'Member',
            self::GUEST => 'Guest',
        ];
    }

    public static function isValid(string $role): bool
    {
        return in_array($role, self::getAll());
    }
}
