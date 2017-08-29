CREATE TABLE Usuario
(
    `UsuarioID` INT NOT NULL AUTO_INCREMENT,
    `Clave` VARCHAR(3) NOT NULL,
    `Nombre` VARCHAR(20) NOT NULL,
    `Apellido` VARCHAR(20) NOT NULL,
    `FechaNacimiento` DATE NOT NULL,
    `Estatus` BIT NOT NULL DEFAULT 1,
    PRIMARY KEY(`UsuarioID`)
);

CREATE TABLE `Comentario`
(
    `ComentarioID` INT NOT NULL AUTO_INCREMENT,
    `Descripcion` VARCHAR(50) NOT NULL,
    `Estatus` BIT NOT NULL DEFAULT 1,
    `UsuarioID` INT NOT NULL REFERENCES Usuario(`UsuarioID`),
    PRIMARY KEY(`ComentarioID`)
);
