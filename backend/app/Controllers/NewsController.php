<?php

namespace App\Controllers;

use App\Libraries\ResponseHelper;
use App\Models\NewsModel;
use App\Models\AuditLogModel;

class NewsController
{
    private NewsModel $newsModel;
    private AuditLogModel $auditModel;

    public function __construct()
    {
        $this->newsModel = new NewsModel();
        $this->auditModel = new AuditLogModel();
    }

    /**
     * GET /api/news
     */
    public function index(): void
    {
        $page = max(1, (int) (query('page', 1)));
        $perPage = min(100, max(1, (int) (query('per_page', 20))));
        $search = query('search', '');
        $status = query('status', '');
        $category = query('category', '');
        $offset = ($page - 1) * $perPage;

        $news = $this->newsModel->findAll($perPage, $offset, $search, $status, $category);
        $total = $this->newsModel->count($search, $status, $category);

        ResponseHelper::paginated($news, $total, $page, $perPage);
    }

    /**
     * GET /api/news/{id}
     */
    public function show(string $id): void
    {
        $article = $this->newsModel->findById((int) $id);
        if (!$article) ResponseHelper::notFound('Article not found');
        ResponseHelper::success($article);
    }

    /**
     * POST /api/news
     */
    public function store(): void
    {
        $data = json_input();
        if (!$data) ResponseHelper::error('Invalid JSON data', 400);
        if (empty($data['title'])) ResponseHelper::error('Title is required', 422);

        $userId = auth_id();
        $data['author_id'] = $userId;

        if ($data['status'] === 'published' && empty($data['published_at'])) {
            $data['published_at'] = date('Y-m-d H:i:s');
        }

        $articleId = $this->newsModel->create($data);
        if (!$articleId) ResponseHelper::error('Failed to create article', 500);

        $article = $this->newsModel->findById($articleId);

        $this->auditModel->create([
            'user_id' => $userId,
            'action' => 'create_news',
            'entity_type' => 'news',
            'entity_id' => $articleId,
            'details' => json_encode(['title' => $data['title']]),
            'ip_address' => $_SERVER['REMOTE_ADDR'] ?? '',
        ]);

        ResponseHelper::created($article, 'Article created successfully');
    }

    /**
     * PUT /api/news/{id}
     */
    public function update(string $id): void
    {
        $article = $this->newsModel->findById((int) $id);
        if (!$article) ResponseHelper::notFound('Article not found');

        $data = json_input();
        if (!$data) ResponseHelper::error('Invalid JSON data', 400);

        if (isset($data['status']) && $data['status'] === 'published' && empty($data['published_at']) && empty($article['published_at'])) {
            $data['published_at'] = date('Y-m-d H:i:s');
        }

        $this->newsModel->update((int) $id, $data);
        $updated = $this->newsModel->findById((int) $id);

        $this->auditModel->create([
            'user_id' => auth_id(),
            'action' => 'update_news',
            'entity_type' => 'news',
            'entity_id' => (int) $id,
            'details' => json_encode(array_keys($data)),
            'ip_address' => $_SERVER['REMOTE_ADDR'] ?? '',
        ]);

        ResponseHelper::success($updated, 'Article updated successfully');
    }

    /**
     * DELETE /api/news/{id}
     */
    public function destroy(string $id): void
    {
        $article = $this->newsModel->findById((int) $id);
        if (!$article) ResponseHelper::notFound('Article not found');

        $this->newsModel->delete((int) $id);

        $this->auditModel->create([
            'user_id' => auth_id(),
            'action' => 'delete_news',
            'entity_type' => 'news',
            'entity_id' => (int) $id,
            'details' => json_encode(['title' => $article['title']]),
            'ip_address' => $_SERVER['REMOTE_ADDR'] ?? '',
        ]);

        ResponseHelper::noContent('Article deleted successfully');
    }
}
