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
ALTER TABLE `doctorSpeciality` ADD CONSTRAINT `doctorSpeciality_specialityId_fkey` FOREIGN KEY (`specialityId`) REFERENCES `Specialities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `doctorSpeciality` ADD CONSTRAINT `doctorSpeciality_doctorId_fkey` FOREIGN KEY (`doctorId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `routerSpecialities` ADD CONSTRAINT `routerSpecialities_specialityId_fkey` FOREIGN KEY (`specialityId`) REFERENCES `Specialities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `routerSpecialities` ADD CONSTRAINT `routerSpecialities_routerId_fkey` FOREIGN KEY (`routerId`) REFERENCES `Router`(`domain`) ON DELETE RESTRICT ON UPDATE CASCADE;
