-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstname` VARCHAR(191) NOT NULL,
    `lastname` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL DEFAULT 'null',
    `phoneNumber` VARCHAR(191) NOT NULL,
    `profilePic` VARCHAR(191) NOT NULL DEFAULT 'null',
    `info` VARCHAR(191) NOT NULL DEFAULT 'null',
    `role` ENUM('user', 'admin') NOT NULL DEFAULT 'user',

    UNIQUE INDEX `Users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Votes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `voteId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `rate` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tokens` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Router` (
    `domain` INTEGER NOT NULL AUTO_INCREMENT,
    `domainName` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL DEFAULT 'null',
    `whatsapp` VARCHAR(191) NOT NULL DEFAULT 'null',
    `schedule` JSON NOT NULL,
    `settings` JSON NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `rating` DOUBLE NOT NULL DEFAULT 0,
    `totalRating` INTEGER NOT NULL DEFAULT 0,
    `voters` INTEGER NOT NULL DEFAULT 0,
    `fees` DOUBLE NOT NULL DEFAULT 0,
    `type` ENUM('hospital', 'clinic', 'lab') NOT NULL,

    PRIMARY KEY (`domain`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RouterAdmin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `routerId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pages` (
    `url` VARCHAR(191) NOT NULL,
    `page` JSON NOT NULL,
    `routerId` INTEGER NOT NULL,

    PRIMARY KEY (`url`, `routerId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Booking` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bookingID` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `details` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Specialities` (
    `id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `doctorSpeciality` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `specialityId` VARCHAR(191) NOT NULL,
    `doctorId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `routerSpecialities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `specialityId` VARCHAR(191) NOT NULL,
    `routerId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Votes` ADD CONSTRAINT `Votes_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Votes` ADD CONSTRAINT `Votes_voteId_fkey` FOREIGN KEY (`voteId`) REFERENCES `Router`(`domain`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tokens` ADD CONSTRAINT `tokens_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RouterAdmin` ADD CONSTRAINT `RouterAdmin_routerId_fkey` FOREIGN KEY (`routerId`) REFERENCES `Router`(`domain`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RouterAdmin` ADD CONSTRAINT `RouterAdmin_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pages` ADD CONSTRAINT `Pages_routerId_fkey` FOREIGN KEY (`routerId`) REFERENCES `Router`(`domain`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_bookingID_fkey` FOREIGN KEY (`bookingID`) REFERENCES `Router`(`domain`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `doctorSpeciality` ADD CONSTRAINT `doctorSpeciality_specialityId_fkey` FOREIGN KEY (`specialityId`) REFERENCES `Specialities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `doctorSpeciality` ADD CONSTRAINT `doctorSpeciality_doctorId_fkey` FOREIGN KEY (`doctorId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `routerSpecialities` ADD CONSTRAINT `routerSpecialities_specialityId_fkey` FOREIGN KEY (`specialityId`) REFERENCES `Specialities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `routerSpecialities` ADD CONSTRAINT `routerSpecialities_routerId_fkey` FOREIGN KEY (`routerId`) REFERENCES `Router`(`domain`) ON DELETE RESTRICT ON UPDATE CASCADE;
