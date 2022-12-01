-- AlterTable
ALTER TABLE `users` MODIFY `address` VARCHAR(191) NOT NULL DEFAULT 'null',
    MODIFY `profilePic` VARCHAR(191) NOT NULL DEFAULT 'null',
    MODIFY `info` VARCHAR(191) NOT NULL DEFAULT 'null';
