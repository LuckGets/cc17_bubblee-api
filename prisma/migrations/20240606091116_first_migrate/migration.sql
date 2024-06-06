-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `email` VARCHAR(191) NULL,
    `phone` VARCHAR(10) NOT NULL,
    `password` VARCHAR(190) NOT NULL,
    `role` ENUM('USER', 'ADMIN') NOT NULL,

    UNIQUE INDEX `Users_email_key`(`email`),
    UNIQUE INDEX `Users_phone_key`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cars_model` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `car_model` VARCHAR(30) NOT NULL,
    `maximum_passenger_num` INTEGER NOT NULL,
    `cost_per_km` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `car_image` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `main_image` BOOLEAN NOT NULL DEFAULT false,
    `image_path` VARCHAR(191) NOT NULL,
    `model_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cars` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `carPlate` VARCHAR(30) NOT NULL,
    `model_id` INTEGER NOT NULL,
    `driver_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Drivers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `image` VARCHAR(100) NOT NULL,
    `car_id` INTEGER NOT NULL,

    UNIQUE INDEX `Drivers_car_id_key`(`car_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `order_id` INTEGER NOT NULL,
    `type` ENUM('qrcode', 'credit', 'cash') NOT NULL,
    `transaction_date` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reservation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pickup_place` VARCHAR(190) NOT NULL,
    `dropoff_place` VARCHAR(190) NOT NULL,
    `reserved_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL,
    `total_cost` DECIMAL(10, 2) NOT NULL,
    `passenger_number` INTEGER NOT NULL,
    `bag_number` INTEGER NULL,
    `pickup_time` TIMESTAMP(0) NOT NULL,
    `order_status` ENUM('CANCEL', 'RESERVED', 'FINDING', 'FINISHED') NOT NULL DEFAULT 'FINDING',
    `pickup_latlng` VARCHAR(90) NOT NULL,
    `dropoff_latlng` VARCHAR(90) NOT NULL,
    `distance` VARCHAR(191) NOT NULL,
    `guest_name` VARCHAR(90) NULL,
    `guest_phone` VARCHAR(10) NULL,
    `guest_mail` VARCHAR(90) NULL,
    `user_id` INTEGER NULL,
    `car_id` INTEGER NOT NULL,
    `model_id` INTEGER NOT NULL,
    `driver_id` INTEGER NOT NULL,
    `transaction_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CarsToCarsModel` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CarsToCarsModel_AB_unique`(`A`, `B`),
    INDEX `_CarsToCarsModel_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `car_image` ADD CONSTRAINT `car_image_model_id_fkey` FOREIGN KEY (`model_id`) REFERENCES `cars_model`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Drivers` ADD CONSTRAINT `Drivers_car_id_fkey` FOREIGN KEY (`car_id`) REFERENCES `Cars`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_driver_id_fkey` FOREIGN KEY (`driver_id`) REFERENCES `Drivers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_car_id_fkey` FOREIGN KEY (`car_id`) REFERENCES `Cars`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_model_id_fkey` FOREIGN KEY (`model_id`) REFERENCES `cars_model`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_transaction_id_fkey` FOREIGN KEY (`transaction_id`) REFERENCES `Transaction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CarsToCarsModel` ADD CONSTRAINT `_CarsToCarsModel_A_fkey` FOREIGN KEY (`A`) REFERENCES `Cars`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CarsToCarsModel` ADD CONSTRAINT `_CarsToCarsModel_B_fkey` FOREIGN KEY (`B`) REFERENCES `cars_model`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
