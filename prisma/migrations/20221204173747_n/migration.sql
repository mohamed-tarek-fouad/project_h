/*
  Warnings:

  - Added the required column `settings` to the `Router` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `router` ADD COLUMN `settings` JSON NOT NULL;
