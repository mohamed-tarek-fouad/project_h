/*
  Warnings:

  - You are about to drop the column `schedual` on the `router` table. All the data in the column will be lost.
  - Added the required column `schedule` to the `Router` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `router` DROP COLUMN `schedual`,
    ADD COLUMN `schedule` JSON NOT NULL;
