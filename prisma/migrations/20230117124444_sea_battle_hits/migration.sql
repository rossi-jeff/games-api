-- CreateTable
CREATE TABLE `SeaBattleShipHit` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `SeaBattleShipId` INTEGER NOT NULL,
    `Horizontal` CHAR(1) NULL,
    `Vertical` INTEGER NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SeaBattleShipHit` ADD CONSTRAINT `SeaBattleShipHit_SeaBattleShipId_fkey` FOREIGN KEY (`SeaBattleShipId`) REFERENCES `SeaBattleShip`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;
