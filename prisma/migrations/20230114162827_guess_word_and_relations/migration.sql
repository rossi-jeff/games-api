-- CreateTable
CREATE TABLE `GuessWord` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `WordId` INTEGER NOT NULL,
    `UserId` INTEGER NULL,
    `Status` ENUM('Playing', 'Won', 'Lost') NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GuessWordGuess` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `GuessWordId` INTEGER NOT NULL,
    `Guess` VARCHAR(25) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GuessWordGuessRating` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `GuessWordGuessId` INTEGER NOT NULL,
    `Rating` ENUM('Green', 'Brown', 'Gray') NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `GuessWord` ADD CONSTRAINT `GuessWord_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `User`(`Id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GuessWord` ADD CONSTRAINT `GuessWord_WordId_fkey` FOREIGN KEY (`WordId`) REFERENCES `Word`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GuessWordGuess` ADD CONSTRAINT `GuessWordGuess_GuessWordId_fkey` FOREIGN KEY (`GuessWordId`) REFERENCES `GuessWord`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GuessWordGuessRating` ADD CONSTRAINT `GuessWordGuessRating_GuessWordGuessId_fkey` FOREIGN KEY (`GuessWordGuessId`) REFERENCES `GuessWordGuess`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;
