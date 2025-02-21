DROP TABLE IF EXISTS Bedrooms_Comforts;
DROP TABLE IF EXISTS Bedrooms;
DROP TABLE IF EXISTS Cabins_Comforts;
DROP TABLE IF EXISTS Cabins;
DROP TABLE IF EXISTS Comforts;

CREATE TABLE Comforts (
    Id_Comfort INT AUTO_INCREMENT NOT NULL,
    Code VARCHAR(50) NOT NULL,
    Name VARCHAR(50) NOT NULL,
    Observation VARCHAR(250) NOT NULL,
    Date_entry DATETIME NOT NULL,
    Statuss ENUM('Disponible', 'No Disponible', 'Mantenimiento') DEFAULT 'Disponible',
    CONSTRAINT PK_Id_Comfort PRIMARY KEY (Id_Comfort),
    CONSTRAINT UC_ComfortName UNIQUE (Name)
);

CREATE TABLE Cabins (
    Id_Cabin INT AUTO_INCREMENT NOT NULL,
    Name VARCHAR(50) NOT NULL,
    Description VARCHAR(250) NOT NULL,
    Capacity INT NOT NULL,
    Statuss ENUM('En Servicio', 'Fuera de Servicio', 'Mantenimiento') DEFAULT 'En Servicio',
    Imagen VARCHAR(250) NOT NULL,
    CONSTRAINT PK_Id_Cabin PRIMARY KEY (Id_Cabin),
    CONSTRAINT UC_CabinName UNIQUE (Name),
    CONSTRAINT CHK_Capacity_Cabins CHECK (Capacity >= 4 AND Capacity <= 7)
);

CREATE TABLE Cabins_Comforts (
    Id_Cabin_Comfort INT AUTO_INCREMENT,
    Id_Cabin INT NOT NULL,
    Id_Comfort INT NOT NULL,
    Date_entry DATETIME NOT NULL,
    Status BOOLEAN DEFAULT TRUE,
    CONSTRAINT PK_Cabins_Comforts PRIMARY KEY (Id_Cabin_Comfort),
    CONSTRAINT FK_Cabins_Comforts_Cabin FOREIGN KEY (Id_Cabin) REFERENCES Cabins(Id_Cabin),
    CONSTRAINT FK_Cabins_Comforts_Comfort FOREIGN KEY (Id_Comfort) REFERENCES Comforts(Id_Comfort)
);

CREATE TABLE Bedrooms (
    Id_Room INT AUTO_INCREMENT NOT NULL,
    Name VARCHAR(50) NOT NULL,
    Description VARCHAR(250) NOT NULL,
    Capacity INT NOT NULL,
    Statuss ENUM('En Servicio', 'Fuera de Servicio', 'Mantenimiento') DEFAULT 'En Servicio',
    Imagen VARCHAR(250) NOT NULL,
    CONSTRAINT PK_Id_Room PRIMARY KEY (Id_Room),
    CONSTRAINT UC_BedroomName UNIQUE (Name),
    CONSTRAINT CHK_Capacity_Bedrooms CHECK (Capacity >= 1 AND Capacity <= 3)
);

CREATE TABLE Bedrooms_Comforts (
    Id_Room_Comforts INT AUTO_INCREMENT,
    Id_Room INT NOT NULL,
    Id_Comfort INT NOT NULL,
    Date_entry DATETIME NOT NULL,
    Statuss BOOLEAN NOT NULL,
    CONSTRAINT PK_Id_Room_Comforts PRIMARY KEY (Id_Room_Comforts),
    CONSTRAINT FK_Id_Room FOREIGN KEY (Id_Room) REFERENCES Bedrooms(Id_Room),
    CONSTRAINT FK_Id_Comforts FOREIGN KEY (Id_Comfort) REFERENCES Comforts(Id_Comfort)
);