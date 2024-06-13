-- DropForeignKey
ALTER TABLE `reservation` DROP FOREIGN KEY `Reservation_car_id_fkey`;

-- DropForeignKey
ALTER TABLE `reservation` DROP FOREIGN KEY `Reservation_driver_id_fkey`;

-- DropForeignKey
ALTER TABLE `reservation` DROP FOREIGN KEY `Reservation_transaction_id_fkey`;

-- AlterTable
ALTER TABLE `reservation` ADD COLUMN `is_round_trip` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `car_id` INTEGER NULL,
    MODIFY `driver_id` INTEGER NULL,
    MODIFY `transaction_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `transaction` MODIFY `type` ENUM('qrcode', 'credit', 'cash') NOT NULL DEFAULT 'cash';

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_driver_id_fkey` FOREIGN KEY (`driver_id`) REFERENCES `Drivers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_car_id_fkey` FOREIGN KEY (`car_id`) REFERENCES `Cars`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_transaction_id_fkey` FOREIGN KEY (`transaction_id`) REFERENCES `Transaction`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
