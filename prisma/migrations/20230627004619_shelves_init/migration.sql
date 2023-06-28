/*
  Warnings:

  - You are about to drop the `Bid` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Deposit` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Item` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `role` ENUM('ADMIN', 'DEV', 'ASSISTANT') NOT NULL DEFAULT 'ASSISTANT';

-- DropTable
DROP TABLE `Bid`;

-- DropTable
DROP TABLE `Deposit`;

-- DropTable
DROP TABLE `Item`;

-- CreateTable
CREATE TABLE `App` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `creatorId` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `redirectLink` VARCHAR(255) NOT NULL,
    `enabled` BOOLEAN NOT NULL DEFAULT true,
    `playStoreUrl` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `status` ENUM('ACTIVE', 'PENDING') NOT NULL DEFAULT 'PENDING',

    INDEX `App_creatorId_idx`(`creatorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
