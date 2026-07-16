<?php

namespace App\Controllers;

use App\Config\Database;
use App\Libraries\ResponseHelper;
use App\Models\AuditLogModel;

class ProjectController
{
    private AuditLogModel $auditModel;

    public function __construct()
    {
        $this->auditModel = new AuditLogModel();
    }

    private function getTable(): string { return 'projects'; }

    /**
     * GET /api/projects
     */
    public function index(): void
    {
        $page = max(1, (int) (query('page', 1)));
        $perPage = min(100, max(1, (int) (query('per_page', 20))));
        $search = query('search', '');
        $status = query('status', '');
        $offset = ($page - 1) * $perPage;

        $sql = "SELECT * FROM {$this->getTable()} WHERE 1=1";
        $params = [];
        $types = '';

        if ($search) {
            $sql .= " AND (name LIKE ? OR description LIKE ?)";
            $searchTerm = "%$search%";
            $params[] = $searchTerm;
            $params[] = $searchTerm;
            $types .= 'ss';
        }
        if ($status) {
            $sql .= " AND status = ?";
            $params[] = $status;
            $types .= 's';
        }

        $countSql = "SELECT COUNT(*) as cnt FROM {$this->getTable()} WHERE 1=1";
        $countParams = [];
        $countTypes = '';
        if ($search) {
            $countSql .= " AND (name LIKE ? OR description LIKE ?)";
            $countParams[] = "%$search%";
            $countParams[] = "%$search%";
            $countTypes .= 'ss';
        }
        if ($status) {
            $countSql .= " AND status = ?";
            $countParams[] = $status;
            $countTypes .= 's';
        }

        $total = (int) Database::scalar($countSql, $countParams, $countTypes);

        $sql .= " ORDER BY created_at DESC LIMIT ? OFFSET ?";
        $params[] = $perPage;
        $params[] = $offset;
        $types .= 'ii';

        $projects = Database::query($sql, $params, $types);
        ResponseHelper::paginated($projects, $total, $page, $perPage);
    }

    /**
     * GET /api/projects/{id}
     */
    public function show(string $id): void
    {
        $project = Database::row("SELECT * FROM {$this->getTable()} WHERE id = ?", [(int) $id], 'i');
        if (!$project) {
            ResponseHelper::notFound('Project not found');
        }
        ResponseHelper::success($project);
    }

    /**
     * POST /api/projects
     */
    public function store(): void
    {
        $data = json_input();
        if (!$data) ResponseHelper::error('Invalid JSON data', 400);
        if (empty($data['name'])) ResponseHelper::error('Project name is required', 422);

        $userId = auth_id();
        $projectId = Database::insert(
            "INSERT INTO {$this->getTable()} (name, description, status, start_date, end_date, budget, location, image, created_by, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())",
            [
                $data['name'],
                $data['description'] ?? null,
                $data['status'] ?? 'planning',
                $data['start_date'] ?? null,
                $data['end_date'] ?? null,
                $data['budget'] ?? 0,
                $data['location'] ?? null,
                $data['image'] ?? null,
                $userId,
            ]
        );

        if (!$projectId) ResponseHelper::error('Failed to create project', 500);

        $project = Database::row("SELECT * FROM {$this->getTable()} WHERE id = ?", [$projectId], 'i');

        $this->auditModel->create([
            'user_id' => $userId,
            'action' => 'create_project',
            'entity_type' => 'project',
            'entity_id' => $projectId,
            'details' => json_encode(['name' => $data['name']]),
            'ip_address' => $_SERVER['REMOTE_ADDR'] ?? '',
        ]);

        ResponseHelper::created($project, 'Project created successfully');
    }

    /**
     * PUT /api/projects/{id}
     */
    public function update(string $id): void
    {
        $project = Database::row("SELECT * FROM {$this->getTable()} WHERE id = ?", [(int) $id], 'i');
        if (!$project) ResponseHelper::notFound('Project not found');

        $data = json_input();
        if (!$data) ResponseHelper::error('Invalid JSON data', 400);

        $fields = [];
        $params = [];
        $types = '';
        $allowed = ['name', 'description', 'status', 'start_date', 'end_date', 'budget', 'location', 'image'];

        foreach ($allowed as $f) {
            if (array_key_exists($f, $data)) {
                $fields[] = "$f = ?";
                $params[] = $data[$f];
                $types .= 's';
            }
        }

        if (!empty($fields)) {
            $fields[] = 'updated_at = NOW()';
            $params[] = (int) $id;
            $types .= 'i';
            Database::execute("UPDATE {$this->getTable()} SET " . implode(', ', $fields) . " WHERE id = ?", $params, $types);
        }

        $updated = Database::row("SELECT * FROM {$this->getTable()} WHERE id = ?", [(int) $id], 'i');

        $this->auditModel->create([
            'user_id' => auth_id(),
            'action' => 'update_project',
            'entity_type' => 'project',
            'entity_id' => (int) $id,
            'details' => json_encode(array_keys($data)),
            'ip_address' => $_SERVER['REMOTE_ADDR'] ?? '',
        ]);

        ResponseHelper::success($updated, 'Project updated successfully');
    }

    /**
     * DELETE /api/projects/{id}
     */
    public function destroy(string $id): void
    {
        $project = Database::row("SELECT * FROM {$this->getTable()} WHERE id = ?", [(int) $id], 'i');
        if (!$project) ResponseHelper::notFound('Project not found');

        Database::execute("DELETE FROM {$this->getTable()} WHERE id = ?", [(int) $id], 'i');

        $this->auditModel->create([
            'user_id' => auth_id(),
            'action' => 'delete_project',
            'entity_type' => 'project',
            'entity_id' => (int) $id,
            'details' => json_encode(['name' => $project['name']]),
            'ip_address' => $_SERVER['REMOTE_ADDR'] ?? '',
        ]);

        ResponseHelper::noContent('Project deleted successfully');
    }
}
