/*
  Warnings:

  - A unique constraint covering the columns `[postId]` on the table `PostDoot` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `PostDoot_postId_key` ON `PostDoot`(`postId`);
