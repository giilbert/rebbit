/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Author` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `Author` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Author` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Author` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `User_profileId_key` ON `User`;

-- DropIndex
DROP INDEX `User_username_key` ON `User`;

-- AlterTable
ALTER TABLE `Author` ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL,
    ADD COLUMN `username` VARCHAR(191) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `User` DROP COLUMN `name`,
    DROP COLUMN `profileId`,
    DROP COLUMN `username`;

-- CreateIndex
CREATE UNIQUE INDEX `Author_userId_key` ON `Author`(`userId`);

-- CreateIndex
CREATE UNIQUE INDEX `Author_username_key` ON `Author`(`username`);
