<?php

namespace App\Filters;

class RateLimitFilter
{
    private static string $cacheDir = WRITEPATH . 'cache' . DIRECTORY_SEPARATOR;

    /**
     * Check rate limit
     */
    public static function check(): void
    {
        $maxRequests = (int) (getenv('RATE_LIMIT_MAX') ?: 60);
        $window = (int) (getenv('RATE_LIMIT_WINDOW') ?: 60);

        $ip = self::getClientIp();
        $key = 'rate_limit_' . md5($ip);
        $file = self::$cacheDir . $key . '.json';

        $now = time();
        $data = ['requests' => [], 'blocked_until' => 0];

        if (file_exists($file)) {
            $content = file_get_contents($file);
            $data = json_decode($content, true) ?: $data;
        }

        // Check if blocked
        if ($data['blocked_until'] > $now) {
            $retryAfter = $data['blocked_until'] - $now;
            header("Retry-After: $retryAfter");
            header('Content-Type: application/json');
            http_response_code(429);
            echo json_encode([
                'status' => 'error',
                'message' => 'Too many requests. Please try again later.',
                'retry_after' => $retryAfter,
            ]);
            exit;
        }

        // Clean old requests
        $data['requests'] = array_filter($data['requests'], function ($timestamp) use ($now, $window) {
            return $now - $timestamp < $window;
        });
        $data['requests'] = array_values($data['requests']);

        // Check limit
        if (count($data['requests']) >= $maxRequests) {
            $data['blocked_until'] = $now + $window;
            $retryAfter = $window;
            header("Retry-After: $retryAfter");
            header('Content-Type: application/json');
            http_response_code(429);
            echo json_encode([
                'status' => 'error',
                'message' => 'Too many requests. Please try again later.',
                'retry_after' => $retryAfter,
            ]);
            exit;
        }

        // Record request
        $data['requests'][] = $now;

        // Save cache
        if (!is_dir(self::$cacheDir)) {
            mkdir(self::$cacheDir, 0755, true);
        }
        file_put_contents($file, json_encode($data));

        // Add rate limit headers
        $remaining = $maxRequests - count($data['requests']);
        header("X-RateLimit-Limit: $maxRequests");
        header("X-RateLimit-Remaining: $remaining");
        header("X-RateLimit-Reset: " . ($now + $window));
    }

    /**
     * Get client IP address
     */
    private static function getClientIp(): string
    {
        $headers = [
            'HTTP_CF_CONNECTING_IP',
            'HTTP_X_FORWARDED_FOR',
            'HTTP_X_REAL_IP',
            'REMOTE_ADDR',
        ];

        foreach ($headers as $header) {
            if (!empty($_SERVER[$header])) {
                $ip = $_SERVER[$header];
                if (strpos($ip, ',') !== false) {
                    $ip = trim(explode(',', $ip)[0]);
                }
                if (filter_var($ip, FILTER_VALIDATE_IP)) {
                    return $ip;
                }
            }
        }

        return '127.0.0.1';
    }
}
