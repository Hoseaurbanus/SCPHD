<?php

namespace App\Config;

class Router
{
    private array $routes = [];

    public function get(string $path, string $handler): self
    {
        $this->routes['GET'][$path] = $handler;
        return $this;
    }

    public function post(string $path, string $handler): self
    {
        $this->routes['POST'][$path] = $handler;
        return $this;
    }

    public function put(string $path, string $handler): self
    {
        $this->routes['PUT'][$path] = $handler;
        return $this;
    }

    public function delete(string $path, string $handler): self
    {
        $this->routes['DELETE'][$path] = $handler;
        return $this;
    }

    public function patch(string $path, string $handler): self
    {
        $this->routes['PATCH'][$path] = $handler;
        return $this;
    }

    public function match(string $method, string $uri): ?array
    {
        $method = strtoupper($method);

        // Exact match
        if (isset($this->routes[$method][$uri])) {
            return [$this->routes[$method][$uri], []];
        }

        // Parameterized match
        if (isset($this->routes[$method])) {
            foreach ($this->routes[$method] as $route => $handler) {
                $params = $this->matchRoute($route, $uri);
                if ($params !== false) {
                    return [$handler, $params];
                }
            }
        }

        return false;
    }

    private function matchRoute(string $route, string $uri): array|false
    {
        $routeParts = explode('/', trim($route, '/'));
        $uriParts = explode('/', trim($uri, '/'));

        if (count($routeParts) !== count($uriParts)) {
            return false;
        }

        $params = [];
        foreach ($routeParts as $i => $part) {
            if (str_starts_with($part, '{') && str_ends_with($part, '}')) {
                $params[] = urldecode($uriParts[$i]);
            } elseif ($part !== $uriParts[$i]) {
                return false;
            }
        }

        return $params;
    }
}

// Build routes
$router = new Router();

// ==================== AUTH ====================
$router->post('/api/auth/register', 'AuthController@register');
$router->post('/api/auth/login', 'AuthController@login');
$router->post('/api/auth/logout', 'AuthController@logout');
$router->post('/api/auth/refresh', 'AuthController@refresh');
$router->post('/api/auth/forgot-password', 'AuthController@forgotPassword');
$router->post('/api/auth/reset-password', 'AuthController@resetPassword');
$router->post('/api/auth/verify-email', 'AuthController@verifyEmail');
$router->get('/api/auth/me', 'AuthController@me');

// ==================== USERS ====================
$router->get('/api/users', 'UserController@index');
$router->get('/api/users/{id}', 'UserController@show');
$router->post('/api/users', 'UserController@store');
$router->put('/api/users/{id}', 'UserController@update');
$router->delete('/api/users/{id}', 'UserController@destroy');
$router->post('/api/users/{id}/role', 'UserController@assignRole');

// ==================== PROGRAMS ====================
$router->get('/api/programs', 'ProgramController@index');
$router->get('/api/programs/{id}', 'ProgramController@show');
$router->post('/api/programs', 'ProgramController@store');
$router->put('/api/programs/{id}', 'ProgramController@update');
$router->delete('/api/programs/{id}', 'ProgramController@destroy');
$router->get('/api/programs/{id}/metrics', 'ProgramController@metrics');

// ==================== PROJECTS ====================
$router->get('/api/projects', 'ProjectController@index');
$router->get('/api/projects/{id}', 'ProjectController@show');
$router->post('/api/projects', 'ProjectController@store');
$router->put('/api/projects/{id}', 'ProjectController@update');
$router->delete('/api/projects/{id}', 'ProjectController@destroy');

// ==================== EVENTS ====================
$router->get('/api/events', 'EventController@index');
$router->get('/api/events/{id}', 'EventController@show');
$router->post('/api/events', 'EventController@store');
$router->put('/api/events/{id}', 'EventController@update');
$router->delete('/api/events/{id}', 'EventController@destroy');
$router->post('/api/events/{id}/register', 'EventController@register');

// ==================== DONATIONS ====================
$router->get('/api/donations', 'DonationController@index');
$router->get('/api/donations/{id}', 'DonationController@show');
$router->post('/api/donations', 'DonationController@store');
$router->put('/api/donations/{id}', 'DonationController@update');
$router->delete('/api/donations/{id}', 'DonationController@destroy');
$router->get('/api/donations/history', 'DonationController@history');
$router->post('/api/donations/recurring', 'DonationController@recurring');
$router->get('/api/donations/{id}/receipt', 'DonationController@receipt');

// ==================== VOLUNTEERS ====================
$router->get('/api/volunteers', 'VolunteerController@index');
$router->get('/api/volunteers/{id}', 'VolunteerController@show');
$router->post('/api/volunteers', 'VolunteerController@store');
$router->put('/api/volunteers/{id}', 'VolunteerController@update');
$router->delete('/api/volunteers/{id}', 'VolunteerController@destroy');
$router->get('/api/volunteers/{id}/missions', 'VolunteerController@missions');
$router->post('/api/volunteers/{id}/hours', 'VolunteerController@addHours');
$router->get('/api/volunteers/impact', 'VolunteerController@impact');

// ==================== PARTNERS ====================
$router->get('/api/partners', 'PartnerController@index');
$router->get('/api/partners/{id}', 'PartnerController@show');
$router->post('/api/partners', 'PartnerController@store');
$router->put('/api/partners/{id}', 'PartnerController@update');
$router->delete('/api/partners/{id}', 'PartnerController@destroy');

// ==================== NEWS ====================
$router->get('/api/news', 'NewsController@index');
$router->get('/api/news/{id}', 'NewsController@show');
$router->post('/api/news', 'NewsController@store');
$router->put('/api/news/{id}', 'NewsController@update');
$router->delete('/api/news/{id}', 'NewsController@destroy');

// ==================== GALLERY ====================
$router->get('/api/gallery', 'GalleryController@index');
$router->get('/api/gallery/{id}', 'GalleryController@show');
$router->post('/api/gallery', 'GalleryController@store');
$router->put('/api/gallery/{id}', 'GalleryController@update');
$router->delete('/api/gallery/{id}', 'GalleryController@destroy');
$router->post('/api/gallery/upload', 'GalleryController@upload');

// ==================== CONTACTS ====================
$router->post('/api/contacts', 'ContactController@submit');
$router->get('/api/contacts', 'ContactController@index');
$router->put('/api/contacts/{id}', 'ContactController@update');
$router->delete('/api/contacts/{id}', 'ContactController@destroy');
$router->patch('/api/contacts/{id}/status', 'ContactController@updateStatus');

// ==================== REPORTS ====================
$router->get('/api/reports', 'ReportController@index');
$router->get('/api/reports/{id}', 'ReportController@show');
$router->post('/api/reports', 'ReportController@store');
$router->put('/api/reports/{id}', 'ReportController@update');
$router->delete('/api/reports/{id}', 'ReportController@destroy');
$router->get('/api/reports/{id}/export', 'ReportController@export');

// ==================== DASHBOARD ====================
$router->get('/api/dashboard/stats', 'DashboardController@stats');
$router->get('/api/dashboard/charts', 'DashboardController@charts');
$router->get('/api/dashboard/activities', 'DashboardController@activities');

// ==================== SETTINGS ====================
$router->get('/api/settings', 'SettingsController@index');
$router->put('/api/settings', 'SettingsController@update');

$GLOBALS['router'] = $router;
