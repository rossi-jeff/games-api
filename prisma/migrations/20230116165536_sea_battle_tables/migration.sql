-- CreateTable
CREATE TABLE `SeaBattle` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `UserId` INTEGER NULL,
    `Axis` INTEGER NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SeaBattleShip` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `SeaBattleId` INTEGER NOT NULL,
    `Type` ENUM('Carrier', 'BattleShip', 'Cruiser', 'SubMarine', 'PatrolBoat') NULL,
    `Navy` ENUM('Player', 'Opponent') NULL,
    `Size` INTEGER NULL,
    `Sunk` BOOLEAN NULL DEFAULT false,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SeaBattleTurn` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `SeaBattleId` INTEGER NOT NULL,
    `Navy` ENUM('Player', 'Opponent') NULL,
    `Target` ENUM('Miss', 'Hit', 'Sunk') NULL,
    `ShipType` ENUM('Carrier', 'BattleShip', 'Cruiser', 'SubMarine', 'PatrolBoat') NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SeaBattleShipGridPoint` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `SeaBattleShipId` INTEGER NOT NULL,
    `Horizontal` CHAR(1) NULL,
    `Vertical` INTEGER NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SeaBattleTurnGridPoint` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `SeaBattleTurnId` INTEGER NOT NULL,
    `Horizontal` CHAR(1) NULL,
    `Vertical` INTEGER NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SeaBattle` ADD CONSTRAINT `SeaBattle_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `User`(`Id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SeaBattleShip` ADD CONSTRAINT `SeaBattleShip_SeaBattleId_fkey` FOREIGN KEY (`SeaBattleId`) REFERENCES `SeaBattle`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SeaBattleTurn` ADD CONSTRAINT `SeaBattleTurn_SeaBattleId_fkey` FOREIGN KEY (`SeaBattleId`) REFERENCES `SeaBattle`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SeaBattleShipGridPoint` ADD CONSTRAINT `SeaBattleShipGridPoint_SeaBattleShipId_fkey` FOREIGN KEY (`SeaBattleShipId`) REFERENCES `SeaBattleShip`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SeaBattleTurnGridPoint` ADD CONSTRAINT `SeaBattleTurnGridPoint_SeaBattleTurnId_fkey` FOREIGN KEY (`SeaBattleTurnId`) REFERENCES `SeaBattleTurn`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;
