/*
  Warnings:

  - You are about to drop the column `estimated_time` on the `reservation` table. All the data in the column will be lost.
  - You are about to alter the column `distance` on the `reservation` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(90)`.
  - You are about to alter the column `duration` on the `reservation` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Decimal(65,0)`.
  - Added the required column `estimated_finish_time` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `reservation` DROP COLUMN `estimated_time`,
    ADD COLUMN `estimated_finish_time` TIMESTAMP(0) NOT NULL,
    MODIFY `distance` VARCHAR(90) NOT NULL,
    MODIFY `duration` DECIMAL(65, 0) NOT NULL;
