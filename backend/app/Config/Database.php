<?php

namespace App\Config;

class Database
{
    public static function getDSN(): array
    {
        return [
            'hostname' => getenv('DB_HOSTNAME') ?: 'localhost',
            'username' => getenv('DB_USERNAME') ?: 'root',
            'password' => getenv('DB_PASSWORD') ?: '',
            'database' => getenv('DB_DATABASE') ?: 'scphd_ngo',
            'DBDriver' => 'MySQLi',
            'DBPrefix' => '',
            'DBDebug'  => (getenv('APP_DEBUG') === 'true'),
            'charset'  => 'utf8mb4',
            'DBCollat' => 'utf8mb4_general_ci',
            'swapPre'  => '',
            'autoCommit' => true,
            'strict' => false,
        ];
    }

    public static function connect(): ?\mysqli
    {
        $config = self::getDSN();
        $conn = new \mysqli(
            $config['hostname'],
            $config['username'],
            $config['password'],
            $config['database']
        );

        if ($conn->connect_error) {
            return null;
        }

        $conn->set_charset($config['charset']);
        return $conn;
    }

    public static function query(string $sql, array $params = [], string $types = ''): array
    {
        $conn = self::connect();
        if (!$conn) {
            throw new \RuntimeException('Database connection failed');
        }

        $stmt = $conn->prepare($sql);
        if (!$stmt) {
            throw new \RuntimeException('Query preparation failed: ' . $conn->error);
        }

        if (!empty($params)) {
            if (empty($types)) {
                $types = str_repeat('s', count($params));
            }
            $stmt->bind_param($types, ...$params);
        }

        $stmt->execute();
        $result = $stmt->get_result();

        $rows = [];
        if ($result) {
            while ($row = $result->fetch_assoc()) {
                $rows[] = $row;
            }
        }

        $stmt->close();
        $conn->close();

        return $rows;
    }

    public static function execute(string $sql, array $params = [], string $types = ''): int
    {
        $conn = self::connect();
        if (!$conn) {
            throw new \RuntimeException('Database connection failed');
        }

        $stmt = $conn->prepare($sql);
        if (!$stmt) {
            throw new \RuntimeException('Query preparation failed: ' . $conn->error);
        }

        if (!empty($params)) {
            if (empty($types)) {
                $types = str_repeat('s', count($params));
            }
            $stmt->bind_param($types, ...$params);
        }

        $stmt->execute();
        $insertId = $stmt->insert_id;
        $affected = $stmt->affected_rows;

        $stmt->close();
        $conn->close();

        return $insertId > 0 ? $insertId : $affected;
    }

    public static function insert(string $sql, array $params = [], string $types = ''): int
    {
        $conn = self::connect();
        if (!$conn) {
            throw new \RuntimeException('Database connection failed');
        }

        $stmt = $conn->prepare($sql);
        if (!$stmt) {
            throw new \RuntimeException('Query preparation failed: ' . $conn->error);
        }

        if (!empty($params)) {
            if (empty($types)) {
                $types = str_repeat('s', count($params));
            }
            $stmt->bind_param($types, ...$params);
        }

        $stmt->execute();
        $insertId = $stmt->insert_id;

        $stmt->close();
        $conn->close();

        return $insertId;
    }

    public static function row(string $sql, array $params = [], string $types = ''): ?array
    {
        $rows = self::query($sql, $params, $types);
        return !empty($rows) ? $rows[0] : null;
    }

    public static function scalar(string $sql, array $params = [], string $types = '')
    {
        $row = self::row($sql, $params, $types);
        if (!$row) return null;
        return reset($row);
    }
}
