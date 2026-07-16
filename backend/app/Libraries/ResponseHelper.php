<?php

namespace App\Libraries;

class ResponseHelper
{
    /**
     * Send a success response
     */
    public static function success($data = null, string $message = 'Success', int $code = 200): void
    {
        http_response_code($code);
        header('Content-Type: application/json');
        echo json_encode([
            'status' => 'success',
            'message' => $message,
            'data' => $data,
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    /**
     * Send an error response
     */
    public static function error(string $message = 'Error', int $code = 400, $errors = null): void
    {
        http_response_code($code);
        header('Content-Type: application/json');
        $response = [
            'status' => 'error',
            'message' => $message,
        ];
        if ($errors !== null) {
            $response['errors'] = $errors;
        }
        echo json_encode($response, JSON_UNESCAPED_UNICODE);
        exit;
    }

    /**
     * Send a created response
     */
    public static function created($data = null, string $message = 'Created successfully'): void
    {
        self::success($data, $message, 201);
    }

    /**
     * Send a no content response
     */
    public static function noContent(string $message = 'Deleted successfully'): void
    {
        http_response_code(204);
        header('Content-Type: application/json');
        echo json_encode([
            'status' => 'success',
            'message' => $message,
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    /**
     * Send a paginated response
     */
    public static function paginated(array $data, int $total, int $page, int $perPage): void
    {
        $totalPages = (int) ceil($total / $perPage);

        self::success([
            'items' => $data,
            'pagination' => [
                'total' => $total,
                'page' => $page,
                'per_page' => $perPage,
                'total_pages' => $totalPages,
                'has_next' => $page < $totalPages,
                'has_prev' => $page > 1,
            ],
        ], 'Success', 200);
    }

    /**
     * Send a validation error response
     */
    public static function validation(array $errors): void
    {
        self::error('Validation failed', 422, $errors);
    }

    /**
     * Send an unauthorized response
     */
    public static function unauthorized(string $message = 'Unauthorized'): void
    {
        self::error($message, 401);
    }

    /**
     * Send a forbidden response
     */
    public static function forbidden(string $message = 'Forbidden'): void
    {
        self::error($message, 403);
    }

    /**
     * Send a not found response
     */
    public static function notFound(string $message = 'Resource not found'): void
    {
        self::error($message, 404);
    }
}
