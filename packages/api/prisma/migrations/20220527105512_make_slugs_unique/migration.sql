/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Community` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Community_slug_key` ON `Community`(`slug`);
