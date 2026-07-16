<?php

use App\Libraries\ResponseHelper;

/**
 * Convenience functions for ResponseHelper
 */
function success_response($data = null, string $message = 'Success', int $code = 200): void
{
    ResponseHelper::success($data, $message, $code);
}

function error_response(string $message = 'Error', int $code = 400, $errors = null): void
{
    ResponseHelper::error($message, $code, $errors);
}

function created_response($data = null, string $message = 'Created successfully'): void
{
    ResponseHelper::created($data, $message);
}

function no_content_response(string $message = 'Deleted successfully'): void
{
    ResponseHelper::noContent($message);
}

function paginated_response(array $data, int $total, int $page, int $perPage): void
{
    ResponseHelper::paginated($data, $total, $page, $perPage);
}

function validation_response(array $errors): void
{
    ResponseHelper::validation($errors);
}

function unauthorized_response(string $message = 'Unauthorized'): void
{
    ResponseHelper::unauthorized($message);
}

function forbidden_response(string $message = 'Forbidden'): void
{
    ResponseHelper::forbidden($message);
}

function not_found_response(string $message = 'Resource not found'): void
{
    ResponseHelper::notFound($message);
}
