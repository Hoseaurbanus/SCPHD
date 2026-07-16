<?php

namespace App\Controllers;

use App\Libraries\ResponseHelper;
use App\Models\GalleryModel;
use App\Models\AuditLogModel;

class GalleryController
{
    private GalleryModel $galleryModel;
    private AuditLogModel $auditModel;

    public function __construct()
    {
        $this->galleryModel = new GalleryModel();
        $this->auditModel = new AuditLogModel();
    }

    /**
     * GET /api/gallery
     */
    public function index(): void
    {
        $page = max(1, (int) (query('page', 1)));
        $perPage = min(100, max(1, (int) (query('per_page', 20))));
        $search = query('search', '');
        $category = query('category', '');
        $offset = ($page - 1) * $perPage;

        $items = $this->galleryModel->findAll($perPage, $offset, $search, $category);
        $total = $this->galleryModel->count($search, $category);

        ResponseHelper::paginated($items, $total, $page, $perPage);
    }

    /**
     * GET /api/gallery/{id}
     */
    public function show(string $id): void
    {
        $item = $this->galleryModel->findById((int) $id);
        if (!$item) ResponseHelper::notFound('Gallery item not found');
        ResponseHelper::success($item);
    }

    /**
     * POST /api/gallery
     */
    public function store(): void
    {
        $data = json_input();
        if (!$data) ResponseHelper::error('Invalid JSON data', 400);
        if (empty($data['file_path'])) ResponseHelper::error('File path is required', 422);

        $userId = auth_id();
        $data['uploaded_by'] = $userId;

        $itemId = $this->galleryModel->create($data);
        if (!$itemId) ResponseHelper::error('Failed to create gallery item', 500);

        $item = $this->galleryModel->findById($itemId);

        $this->auditModel->create([
            'user_id' => $userId,
            'action' => 'create_gallery',
            'entity_type' => 'gallery',
            'entity_id' => $itemId,
            'details' => json_encode(['file_path' => $data['file_path']]),
            'ip_address' => $_SERVER['REMOTE_ADDR'] ?? '',
        ]);

        ResponseHelper::created($item, 'Gallery item created successfully');
    }

    /**
     * PUT /api/gallery/{id}
     */
    public function update(string $id): void
    {
        $item = $this->galleryModel->findById((int) $id);
        if (!$item) ResponseHelper::notFound('Gallery item not found');

        $data = json_input();
        if (!$data) ResponseHelper::error('Invalid JSON data', 400);

        $this->galleryModel->update((int) $id, $data);
        $updated = $this->galleryModel->findById((int) $id);

        $this->auditModel->create([
            'user_id' => auth_id(),
            'action' => 'update_gallery',
            'entity_type' => 'gallery',
            'entity_id' => (int) $id,
            'details' => json_encode(array_keys($data)),
            'ip_address' => $_SERVER['REMOTE_ADDR'] ?? '',
        ]);

        ResponseHelper::success($updated, 'Gallery item updated successfully');
    }

    /**
     * DELETE /api/gallery/{id}
     */
    public function destroy(string $id): void
    {
        $item = $this->galleryModel->findById((int) $id);
        if (!$item) ResponseHelper::notFound('Gallery item not found');

        $this->galleryModel->delete((int) $id);

        $this->auditModel->create([
            'user_id' => auth_id(),
            'action' => 'delete_gallery',
            'entity_type' => 'gallery',
            'entity_id' => (int) $id,
            'details' => json_encode(['file_path' => $item['file_path']]),
            'ip_address' => $_SERVER['REMOTE_ADDR'] ?? '',
        ]);

        ResponseHelper::noContent('Gallery item deleted successfully');
    }

    /**
     * POST /api/gallery/upload
     */
    public function upload(): void
    {
        if (empty($_FILES['file'])) {
            ResponseHelper::error('No file uploaded', 400);
        }

        $file = $_FILES['file'];
        $allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm'];

        if (!in_array($file['type'], $allowedTypes)) {
            ResponseHelper::error('File type not allowed', 422);
        }

        $maxSize = 10 * 1024 * 1024; // 10MB
        if ($file['size'] > $maxSize) {
            ResponseHelper::error('File size exceeds 10MB limit', 422);
        }

        $uploadDir = WRITEPATH . 'uploads' . DIRECTORY_SEPARATOR . date('Y') . DIRECTORY_SEPARATOR . date('m');
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
        $filename = uniqid('gallery_', true) . '.' . $extension;
        $filepath = $uploadDir . DIRECTORY_SEPARATOR . $filename;

        if (!move_uploaded_file($file['tmp_name'], $filepath)) {
            ResponseHelper::error('Failed to upload file', 500);
        }

        $relativePath = 'uploads/' . date('Y') . '/' . date('m') . '/' . $filename;

        $userId = auth_id();
        $itemId = $this->galleryModel->create([
            'title' => $_POST['title'] ?? pathinfo($file['name'], PATHINFO_FILENAME),
            'description' => $_POST['description'] ?? null,
            'file_path' => $relativePath,
            'file_type' => $file['type'],
            'file_size' => $file['size'],
            'category' => $_POST['category'] ?? 'general',
            'uploaded_by' => $userId,
        ]);

        if (!$itemId) ResponseHelper::error('Failed to save gallery item', 500);

        $item = $this->galleryModel->findById($itemId);
        ResponseHelper::created($item, 'File uploaded successfully');
    }
}
