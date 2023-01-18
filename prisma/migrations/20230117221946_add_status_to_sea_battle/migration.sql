/*
  Warnings:

  - Added the required column `Status` to the `SeaBattle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `SeaBattle` ADD COLUMN `Status` ENUM('Playing', 'Won', 'Lost') NOT NULL;
