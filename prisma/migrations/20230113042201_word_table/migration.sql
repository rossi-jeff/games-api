-- CreateTable
CREATE TABLE `Word` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Word` VARCHAR(50) NOT NULL,
    `Length` INTEGER NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
