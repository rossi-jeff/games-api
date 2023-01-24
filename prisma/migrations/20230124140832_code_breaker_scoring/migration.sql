/*
  Warnings:

  - Added the required column `Colors` to the `CodeBreaker` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `CodeBreaker` ADD COLUMN `Colors` INTEGER NOT NULL,
    ADD COLUMN `Score` INTEGER NOT NULL DEFAULT 0;
