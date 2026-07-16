-- SCPHD NGO Management Platform Database Schema
-- Run this SQL to create all required tables

CREATE DATABASE IF NOT EXISTS `scphd_ngo` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `scphd_ngo`;

-- Users table
CREATE TABLE IF NOT EXISTS `users` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `first_name` VARCHAR(100) NOT NULL,
    `last_name` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(20) DEFAULT NULL,
    `role` ENUM('super_admin','admin','manager','coordinator','volunteer','donor','member','guest') NOT NULL DEFAULT 'member',
    `avatar` VARCHAR(500) DEFAULT NULL,
    `is_active` TINYINT(1) NOT NULL DEFAULT 1,
    `email_verified` TINYINT(1) NOT NULL DEFAULT 0,
    `email_verification_token` VARCHAR(255) DEFAULT NULL,
    `password_reset_token` VARCHAR(255) DEFAULT NULL,
    `password_reset_expires` DATETIME DEFAULT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_users_email` (`email`),
    KEY `idx_users_role` (`role`),
    KEY `idx_users_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Programs table
CREATE TABLE IF NOT EXISTS `programs` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT DEFAULT NULL,
    `category` VARCHAR(100) DEFAULT 'general',
    `status` ENUM('active','inactive','completed','planning') NOT NULL DEFAULT 'active',
    `start_date` DATE DEFAULT NULL,
    `end_date` DATE DEFAULT NULL,
    `budget` DECIMAL(12,2) DEFAULT 0,
    `beneficiaries` INT DEFAULT 0,
    `location` VARCHAR(255) DEFAULT NULL,
    `image` VARCHAR(500) DEFAULT NULL,
    `created_by` INT UNSIGNED DEFAULT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME NOT NULL,
    PRIMARY KEY (`id`),
    KEY `idx_programs_status` (`status`),
    KEY `idx_programs_category` (`category`),
    KEY `idx_programs_created_by` (`created_by`),
    CONSTRAINT `fk_programs_created_by` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Projects table
CREATE TABLE IF NOT EXISTS `projects` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT DEFAULT NULL,
    `status` ENUM('planning','active','in_progress','completed','on_hold','cancelled') NOT NULL DEFAULT 'planning',
    `start_date` DATE DEFAULT NULL,
    `end_date` DATE DEFAULT NULL,
    `budget` DECIMAL(12,2) DEFAULT 0,
    `location` VARCHAR(255) DEFAULT NULL,
    `image` VARCHAR(500) DEFAULT NULL,
    `created_by` INT UNSIGNED DEFAULT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME NOT NULL,
    PRIMARY KEY (`id`),
    KEY `idx_projects_status` (`status`),
    KEY `idx_projects_created_by` (`created_by`),
    CONSTRAINT `fk_projects_created_by` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Events table
CREATE TABLE IF NOT EXISTS `events` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT DEFAULT NULL,
    `category` VARCHAR(100) DEFAULT 'general',
    `status` ENUM('upcoming','ongoing','completed','cancelled') NOT NULL DEFAULT 'upcoming',
    `start_date` DATETIME NOT NULL,
    `end_date` DATETIME DEFAULT NULL,
    `location` VARCHAR(255) DEFAULT NULL,
    `max_participants` INT DEFAULT NULL,
    `image` VARCHAR(500) DEFAULT NULL,
    `created_by` INT UNSIGNED DEFAULT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME NOT NULL,
    PRIMARY KEY (`id`),
    KEY `idx_events_status` (`status`),
    KEY `idx_events_start_date` (`start_date`),
    KEY `idx_events_created_by` (`created_by`),
    CONSTRAINT `fk_events_created_by` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Event registrations
CREATE TABLE IF NOT EXISTS `event_registrations` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `event_id` INT UNSIGNED NOT NULL,
    `user_id` INT UNSIGNED NOT NULL,
    `name` VARCHAR(255) DEFAULT NULL,
    `email` VARCHAR(255) DEFAULT NULL,
    `registered_at` DATETIME NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_event_reg` (`event_id`, `user_id`),
    KEY `idx_event_reg_event` (`event_id`),
    KEY `idx_event_reg_user` (`user_id`),
    CONSTRAINT `fk_event_reg_event` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_event_reg_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Donations table
CREATE TABLE IF NOT EXISTS `donations` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `donor_name` VARCHAR(255) NOT NULL,
    `donor_email` VARCHAR(255) DEFAULT NULL,
    `donor_phone` VARCHAR(20) DEFAULT NULL,
    `amount` DECIMAL(12,2) NOT NULL,
    `currency` VARCHAR(3) DEFAULT 'USD',
    `payment_method` ENUM('cash','card','bank_transfer','mobile_money','check','other') DEFAULT 'cash',
    `payment_status` ENUM('pending','completed','failed','refunded') DEFAULT 'completed',
    `program_id` INT UNSIGNED DEFAULT NULL,
    `project_id` INT UNSIGNED DEFAULT NULL,
    `is_recurring` TINYINT(1) DEFAULT 0,
    `recurring_interval` ENUM('weekly','monthly','quarterly','yearly') DEFAULT NULL,
    `notes` TEXT DEFAULT NULL,
    `receipt_number` VARCHAR(50) DEFAULT NULL,
    `user_id` INT UNSIGNED DEFAULT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME NOT NULL,
    PRIMARY KEY (`id`),
    KEY `idx_donations_status` (`payment_status`),
    KEY `idx_donations_program` (`program_id`),
    KEY `idx_donations_project` (`project_id`),
    KEY `idx_donations_user` (`user_id`),
    KEY `idx_donations_recurring` (`is_recurring`),
    CONSTRAINT `fk_donations_program` FOREIGN KEY (`program_id`) REFERENCES `programs`(`id`) ON DELETE SET NULL,
    CONSTRAINT `fk_donations_project` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE SET NULL,
    CONSTRAINT `fk_donations_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Volunteers table
CREATE TABLE IF NOT EXISTS `volunteers` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INT UNSIGNED DEFAULT NULL,
    `first_name` VARCHAR(100) NOT NULL,
    `last_name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(20) DEFAULT NULL,
    `skills` TEXT DEFAULT NULL,
    `availability` TEXT DEFAULT NULL,
    `status` ENUM('active','inactive','pending','suspended') NOT NULL DEFAULT 'active',
    `start_date` DATE DEFAULT NULL,
    `notes` TEXT DEFAULT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME NOT NULL,
    PRIMARY KEY (`id`),
    KEY `idx_volunteers_status` (`status`),
    KEY `idx_volunteers_user` (`user_id`),
    CONSTRAINT `fk_volunteers_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Volunteer hours
CREATE TABLE IF NOT EXISTS `volunteer_hours` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `volunteer_id` INT UNSIGNED NOT NULL,
    `program_id` INT UNSIGNED DEFAULT NULL,
    `hours` DECIMAL(5,2) NOT NULL,
    `date` DATE NOT NULL,
    `description` TEXT DEFAULT NULL,
    `created_at` DATETIME NOT NULL,
    PRIMARY KEY (`id`),
    KEY `idx_vh_volunteer` (`volunteer_id`),
    KEY `idx_vh_program` (`program_id`),
    CONSTRAINT `fk_vh_volunteer` FOREIGN KEY (`volunteer_id`) REFERENCES `volunteers`(`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_vh_program` FOREIGN KEY (`program_id`) REFERENCES `programs`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Volunteer missions
CREATE TABLE IF NOT EXISTS `volunteer_missions` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `volunteer_id` INT UNSIGNED NOT NULL,
    `program_id` INT UNSIGNED DEFAULT NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT DEFAULT NULL,
    `start_date` DATE DEFAULT NULL,
    `end_date` DATE DEFAULT NULL,
    `status` ENUM('pending','active','completed','cancelled') DEFAULT 'pending',
    `created_at` DATETIME NOT NULL,
    PRIMARY KEY (`id`),
    KEY `idx_vm_volunteer` (`volunteer_id`),
    CONSTRAINT `fk_vm_volunteer` FOREIGN KEY (`volunteer_id`) REFERENCES `volunteers`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Volunteer programs junction
CREATE TABLE IF NOT EXISTS `volunteer_programs` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `volunteer_id` INT UNSIGNED NOT NULL,
    `program_id` INT UNSIGNED NOT NULL,
    `assigned_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_vp` (`volunteer_id`, `program_id`),
    CONSTRAINT `fk_vp_volunteer` FOREIGN KEY (`volunteer_id`) REFERENCES `volunteers`(`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_vp_program` FOREIGN KEY (`program_id`) REFERENCES `programs`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Partners table
CREATE TABLE IF NOT EXISTS `partners` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT DEFAULT NULL,
    `type` VARCHAR(100) DEFAULT 'general',
    `email` VARCHAR(255) DEFAULT NULL,
    `phone` VARCHAR(20) DEFAULT NULL,
    `website` VARCHAR(500) DEFAULT NULL,
    `address` TEXT DEFAULT NULL,
    `logo` VARCHAR(500) DEFAULT NULL,
    `status` ENUM('active','inactive','pending') NOT NULL DEFAULT 'active',
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME NOT NULL,
    PRIMARY KEY (`id`),
    KEY `idx_partners_type` (`type`),
    KEY `idx_partners_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- News table
CREATE TABLE IF NOT EXISTS `news` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `content` LONGTEXT DEFAULT NULL,
    `excerpt` TEXT DEFAULT NULL,
    `category` VARCHAR(100) DEFAULT 'general',
    `status` ENUM('draft','published','archived') NOT NULL DEFAULT 'draft',
    `image` VARCHAR(500) DEFAULT NULL,
    `author_id` INT UNSIGNED DEFAULT NULL,
    `published_at` DATETIME DEFAULT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_news_slug` (`slug`),
    KEY `idx_news_status` (`status`),
    KEY `idx_news_category` (`category`),
    KEY `idx_news_author` (`author_id`),
    CONSTRAINT `fk_news_author` FOREIGN KEY (`author_id`) REFERENCES `users`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Gallery table
CREATE TABLE IF NOT EXISTS `gallery` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) DEFAULT NULL,
    `description` TEXT DEFAULT NULL,
    `file_path` VARCHAR(500) NOT NULL,
    `file_type` VARCHAR(100) DEFAULT NULL,
    `file_size` INT UNSIGNED DEFAULT NULL,
    `category` VARCHAR(100) DEFAULT 'general',
    `uploaded_by` INT UNSIGNED DEFAULT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME NOT NULL,
    PRIMARY KEY (`id`),
    KEY `idx_gallery_category` (`category`),
    KEY `idx_gallery_uploaded_by` (`uploaded_by`),
    CONSTRAINT `fk_gallery_uploaded_by` FOREIGN KEY (`uploaded_by`) REFERENCES `users`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Contacts table
CREATE TABLE IF NOT EXISTS `contacts` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(20) DEFAULT NULL,
    `subject` VARCHAR(255) DEFAULT NULL,
    `message` TEXT NOT NULL,
    `status` ENUM('new','read','replied','archived') NOT NULL DEFAULT 'new',
    `response` TEXT DEFAULT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME NOT NULL,
    PRIMARY KEY (`id`),
    KEY `idx_contacts_status` (`status`),
    KEY `idx_contacts_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Reports table
CREATE TABLE IF NOT EXISTS `reports` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT DEFAULT NULL,
    `type` VARCHAR(100) DEFAULT 'general',
    `status` ENUM('draft','published','archived') NOT NULL DEFAULT 'draft',
    `data` JSON DEFAULT NULL,
    `file_path` VARCHAR(500) DEFAULT NULL,
    `created_by` INT UNSIGNED DEFAULT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME NOT NULL,
    PRIMARY KEY (`id`),
    KEY `idx_reports_type` (`type`),
    KEY `idx_reports_status` (`status`),
    KEY `idx_reports_created_by` (`created_by`),
    CONSTRAINT `fk_reports_created_by` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Audit logs table
CREATE TABLE IF NOT EXISTS `audit_logs` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INT UNSIGNED DEFAULT NULL,
    `action` VARCHAR(100) NOT NULL,
    `entity_type` VARCHAR(50) DEFAULT NULL,
    `entity_id` INT UNSIGNED DEFAULT NULL,
    `details` JSON DEFAULT NULL,
    `ip_address` VARCHAR(45) DEFAULT NULL,
    `created_at` DATETIME NOT NULL,
    PRIMARY KEY (`id`),
    KEY `idx_audit_user` (`user_id`),
    KEY `idx_audit_action` (`action`),
    KEY `idx_audit_entity` (`entity_type`, `entity_id`),
    KEY `idx_audit_created` (`created_at`),
    CONSTRAINT `fk_audit_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Settings table
CREATE TABLE IF NOT EXISTS `settings` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `site_name` VARCHAR(255) DEFAULT 'SCPHD NGO Platform',
    `site_description` TEXT DEFAULT NULL,
    `contact_email` VARCHAR(255) DEFAULT NULL,
    `contact_phone` VARCHAR(20) DEFAULT NULL,
    `address` TEXT DEFAULT NULL,
    `logo` VARCHAR(500) DEFAULT NULL,
    `favicon` VARCHAR(500) DEFAULT NULL,
    `social_facebook` VARCHAR(500) DEFAULT NULL,
    `social_twitter` VARCHAR(500) DEFAULT NULL,
    `social_instagram` VARCHAR(500) DEFAULT NULL,
    `social_linkedin` VARCHAR(500) DEFAULT NULL,
    `donation_enabled` TINYINT(1) DEFAULT 1,
    `volunteer_registration` TINYINT(1) DEFAULT 1,
    `event_registration` TINYINT(1) DEFAULT 1,
    `maintenance_mode` TINYINT(1) DEFAULT 0,
    `created_at` DATETIME DEFAULT NULL,
    `updated_at` DATETIME DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert default super admin user
-- IMPORTANT: Change this password immediately after first login
-- Default credentials: admin@scphd.org / ChangeMeNow!2025
-- Generate a new hash with: php -r "echo password_hash('YourNewPassword', PASSWORD_BCRYPT);"
INSERT INTO `users` (`email`, `password`, `first_name`, `last_name`, `role`, `is_active`, `email_verified`, `created_at`, `updated_at`)
VALUES ('admin@scphd.org', '$2y$12$LJ3m4ys3Pz0QwQxqQwQxqOQwQwQwQwQwQwQwQwQwQwQwQwQwQwQw', 'Super', 'Admin', 'super_admin', 1, 1, NOW(), NOW())
ON DUPLICATE KEY UPDATE `email` = `email`;

-- Insert default settings
INSERT INTO `settings` (`id`, `site_name`, `site_description`, `contact_email`, `created_at`, `updated_at`)
VALUES (1, 'SCPHD NGO Platform', 'NGO Management Platform for community development', 'info@scphd.org', NOW(), NOW())
ON DUPLICATE KEY UPDATE `site_name` = `site_name`;
