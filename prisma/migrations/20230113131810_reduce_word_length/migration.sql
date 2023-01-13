/*
  Warnings:

  - You are about to alter the column `Word` on the `Word` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `VarChar(25)`.

*/
-- AlterTable
ALTER TABLE `Word` MODIFY `Word` VARCHAR(25) NOT NULL;
