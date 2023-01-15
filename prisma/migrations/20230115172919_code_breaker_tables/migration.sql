-- CreateTable
CREATE TABLE `CodeBreaker` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `UserId` INTEGER NULL,
    `Status` ENUM('Playing', 'Won', 'Lost') NOT NULL,
    `Columns` INTEGER NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CodeBreakerCode` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `CodeBreakerId` INTEGER NOT NULL,
    `Color` ENUM('Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Brown', 'Black', 'White') NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CodeBreakerGuess` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `CodeBreakerId` INTEGER NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CodeBreakerGuessColor` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `CodeBreakerGuessId` INTEGER NOT NULL,
    `Color` ENUM('Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Brown', 'Black', 'White') NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CodeBreakerGuessKey` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `CodeBreakerGuessId` INTEGER NOT NULL,
    `Key` ENUM('Black', 'White') NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CodeBreakerCode` ADD CONSTRAINT `CodeBreakerCode_CodeBreakerId_fkey` FOREIGN KEY (`CodeBreakerId`) REFERENCES `CodeBreaker`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CodeBreakerGuess` ADD CONSTRAINT `CodeBreakerGuess_CodeBreakerId_fkey` FOREIGN KEY (`CodeBreakerId`) REFERENCES `CodeBreaker`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CodeBreakerGuessColor` ADD CONSTRAINT `CodeBreakerGuessColor_CodeBreakerGuessId_fkey` FOREIGN KEY (`CodeBreakerGuessId`) REFERENCES `CodeBreakerGuess`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CodeBreakerGuessKey` ADD CONSTRAINT `CodeBreakerGuessKey_CodeBreakerGuessId_fkey` FOREIGN KEY (`CodeBreakerGuessId`) REFERENCES `CodeBreakerGuess`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;
