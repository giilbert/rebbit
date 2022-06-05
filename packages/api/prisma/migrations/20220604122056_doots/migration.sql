-- AlterTable
ALTER TABLE `Post` ADD COLUMN `downDoots` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `upDoots` INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `PostDoot` (
    `id` VARCHAR(191) NOT NULL,
    `postId` VARCHAR(191) NOT NULL,
    `authorId` VARCHAR(191) NOT NULL,
    `value` ENUM('UP', 'DOWN') NOT NULL,

    INDEX `PostDoot_postId_authorId_idx`(`postId`, `authorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
