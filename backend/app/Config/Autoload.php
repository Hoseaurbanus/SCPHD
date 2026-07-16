<?php

namespace App\Config;

class Autoload
{
    public static function getPSR4(): array
    {
        return [
            'App' => APPPATH,
        ];
    }
}
