-- CreateTable
CREATE TABLE `Yacht` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `UserId` INTEGER NULL,
    `Total` INTEGER NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `YachtTurn` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `YachtId` INTEGER NOT NULL,
    `RollOne` VARCHAR(10) NULL,
    `RollTwo` VARCHAR(10) NULL,
    `RollThree` VARCHAR(10) NULL,
    `Category` ENUM('Ones', 'Twos', 'Threes', 'Fours', 'Fives', 'Sizes', 'FullHouse', 'FourOfKind', 'LittleStraight', 'BigStraight', 'Choice', 'Yacht') NULL,
    `Score` INTEGER NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Yacht` ADD CONSTRAINT `Yacht_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `User`(`Id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `YachtTurn` ADD CONSTRAINT `YachtTurn_YachtId_fkey` FOREIGN KEY (`YachtId`) REFERENCES `Yacht`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;
