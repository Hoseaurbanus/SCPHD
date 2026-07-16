<?php

error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

define('START_TIME', microtime(true));
define('APPPATH', dirname(__DIR__) . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR);
define('ROOTPATH', dirname(__DIR__) . DIRECTORY_SEPARATOR);
define('WRITEPATH', ROOTPATH . 'writable' . DIRECTORY_SEPARATOR);
define('PUBLICPATH', ROOTPATH . 'public' . DIRECTORY_SEPARATOR);

$envFile = ROOTPATH . '.env';
if (file_exists($envFile)) {
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        $line = trim($line);
        if ($line === '' || $line[0] === '#') continue;
        if (strpos($line, '=') !== false) {
            [$name, $value] = explode('=', $line, 2);
            $name = trim($name);
            $value = trim($value, " \t\n\r\0\x0B\"'");
            putenv("$name=$value");
            $_ENV[$name] = $value;
        }
    }
}

date_default_timezone_set(getenv('APP_TIMEZONE') ?: 'Africa/Lubumbashi');

spl_autoload_register(function ($class) {
    $prefix = 'App\\';
    $baseDir = APPPATH;
    if (strncmp($prefix, $class, strlen($prefix)) !== 0) {
        return;
    }
    $relativeClass = substr($class, strlen($prefix));
    $file = $baseDir . str_replace('\\', DIRECTORY_SEPARATOR, $relativeClass) . '.php';
    if (file_exists($file)) {
        require $file;
    }
});

// Load all files in order
$loadOrder = [
    'Enums/Roles.php',
    'Config/App.php',
    'Config/Database.php',
    'Config/Autoload.php',
    'Config/Cors.php',
    'Config/JWT.php',
    'Libraries/JWTLibrary.php',
    'Libraries/ResponseHelper.php',
    'Helpers/auth_helper.php',
    'Helpers/response_helper.php',
    'Models/AuditLogModel.php',
    'Models/UserModel.php',
    'Models/ProgramModel.php',
    'Models/DonationModel.php',
    'Models/VolunteerModel.php',
    'Models/EventModel.php',
    'Models/NewsModel.php',
    'Models/PartnerModel.php',
    'Models/GalleryModel.php',
    'Models/ContactModel.php',
    'Models/ReportModel.php',
    'Filters/CorsFilter.php',
    'Filters/AuthFilter.php',
    'Filters/RoleFilter.php',
    'Filters/RateLimitFilter.php',
];

foreach ($loadOrder as $file) {
    $path = APPPATH . $file;
    if (file_exists($path)) {
        require_once $path;
    }
}

// Load controllers
$controllerFiles = glob(APPPATH . 'Controllers/*.php');
foreach ($controllerFiles as $cf) {
    require_once $cf;
}

// CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    \App\Filters\CorsFilter::handle();
    http_response_code(204);
    exit;
}

// CORS headers for all responses
\App\Filters\CorsFilter::handle();

// Rate limiting
\App\Filters\RateLimitFilter::check();

// Parse request
$method = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'];
$uri = parse_url($uri, PHP_URL_PATH);
$uri = rtrim($uri, '/');

// Include routes
require_once APPPATH . 'Config/Routes.php';

// Match route
$router = $GLOBALS['router'] ?? null;
if (!$router) {
    header('Content-Type: application/json');
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Router not initialized']);
    exit;
}

$match = $router->match($method, $uri);

if ($match === false) {
    header('Content-Type: application/json');
    http_response_code(404);
    echo json_encode(['status' => 'error', 'message' => 'Endpoint not found: ' . $method . ' ' . $uri]);
    exit;
}

[$handler, $params] = $match;

// Auth check
$needsAuth = \App\Filters\AuthFilter::requiresAuth($method, $uri);
if ($needsAuth) {
    $token = \App\Filters\AuthFilter::extractToken();
    if (!$token) {
        header('Content-Type: application/json');
        http_response_code(401);
        echo json_encode(['status' => 'error', 'message' => 'Authentication required']);
        exit;
    }

    $jwtLib = new \App\Libraries\JWTLibrary();
    $payload = $jwtLib->validate($token);
    if (!$payload) {
        header('Content-Type: application/json');
        http_response_code(401);
        echo json_encode(['status' => 'error', 'message' => 'Invalid or expired token']);
        exit;
    }

    $_REQUEST['user'] = $payload;
}

// Role check
$neededRole = \App\Filters\RoleFilter::getRequiredRole($method, $uri);
if ($neededRole && isset($_REQUEST['user'])) {
    $userRole = $_REQUEST['user']['role'] ?? '';
    if ($userRole !== $neededRole && $userRole !== 'super_admin') {
        header('Content-Type: application/json');
        http_response_code(403);
        echo json_encode(['status' => 'error', 'message' => 'Insufficient permissions']);
        exit;
    }
}

// Dispatch
try {
    [$controllerClass, $methodName] = explode('@', $handler);
    $fqcn = "App\\Controllers\\$controllerClass";

    if (!class_exists($fqcn)) {
        throw new \RuntimeException("Controller class not found: $fqcn");
    }

    $controller = new $fqcn();

    if (!method_exists($controller, $methodName)) {
        throw new \RuntimeException("Method not found: $methodName");
    }

    call_user_func_array([$controller, $methodName], $params);
} catch (\Throwable $e) {
    header('Content-Type: application/json');
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Internal server error',
        'debug' => getenv('APP_DEBUG') === 'true' ? $e->getMessage() : null,
    ]);
    exit;
}
