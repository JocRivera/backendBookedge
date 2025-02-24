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

CREATE TABLE Users (
    Id_User INT NOT NULL AUTO_INCREMENT,
    Id_Rol INT NOT NULL,
    Name VARCHAR(50) NOT NULL,
    Email VARCHAR(80) NOT NULL,
    Phone VARCHAR(20) NOT NULL,
    Document VARCHAR(50) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    State ENUM('activo', 'inactivo') DEFAULT 'activeo',

    CONSTRAINT PK_Id_User PRIMARY KEY (Id_User),
    CONSTRAINT FK_Id_Rol FOREIGN KEY (Id_Rol) REFERENCES Roles(Id_Rol),
    CONSTRAINT UC_Email UNIQUE (Email),
    CONSTRAINT UC_Phone UNIQUE (Phone),
    CONSTRAINT UC_Document UNIQUE (Document),
    CONSTRAINT CHK_Email CHECK (Email REGEXP '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'),
    CONSTRAINT CHK_Phone CHECK (Phone REGEXP '^\+?[0-9]{1,20}$'),

    CONSTRAINT CHK_Password CHECK (
        LENGTH(Password) >= 8 AND
        Password REGEXP '[a-z]' AND  -- Al menos una letra minúscula
        Password REGEXP '[A-Z]' AND  -- Al menos una letra mayúscula
        Password REGEXP '[0-9]' AND  -- Al menos un número
        Password REGEXP '[!@#$%^&*()]'  -- Al menos un carácter especial
    )
);

CREATE INDEX idx_email ON Users (Email); //este indice es como un libro pero en base de datos es para busquedas rápidas