# ahorcado_game
Proyecto Juego Ahorcado - PHP, JS, CSS y HTML 

📦 SCRIPT PARA CREAR LA BASE DE DATOS CON LAS CREDENCIALES DE EJEMPLO (Copiar y pegar en consola MySql) 📦

-- Crear la base de datos si no existe

CREATE DATABASE IF NOT EXISTS ahorcado;

-- Crear el usuario 'user' con la contraseña 'ahorcado'

CREATE USER IF NOT EXISTS 'user'@'localhost' IDENTIFIED BY 'ahorcado';

-- Otorgar todos los permisos sobre la base de datos 'ahorcado' al usuario 'user'

GRANT ALL PRIVILEGES ON ahorcado.* TO 'user'@'localhost';

-- Aplicar los cambios de permisos

FLUSH PRIVILEGES;

-- Seleccionar la base de datos para continuar con la creación de tablas

USE ahorcado;

-- Crear la tabla 'jugadores' para almacenar los nombres de los jugadores y sus victorias

CREATE TABLE IF NOT EXISTS jugadores (
    id INT AUTO_INCREMENT PRIMARY KEY, -- Identificador único para cada jugador
    nombre VARCHAR(100) NOT NULL UNIQUE, -- Nombre del jugador (único)
    victorias INT DEFAULT 0,           -- Número de victorias acumuladas
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Fecha y hora de la última actualización
);

-- Índice para mejorar la búsqueda por nombre

CREATE INDEX idx_nombre ON jugadores(nombre);

