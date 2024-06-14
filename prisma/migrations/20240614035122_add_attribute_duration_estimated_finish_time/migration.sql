/*
  Warnings:

  - Added the required column `duration` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estimated_time` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `reservation` ADD COLUMN `duration` VARCHAR(191) NOT NULL,
    ADD COLUMN `estimated_time` VARCHAR(191) NOT NULL;
