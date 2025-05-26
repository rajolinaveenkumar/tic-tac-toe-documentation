CREATE DATABASE IF NOT EXISTS game_db;
USE game_db;

-- Table for storing player information
CREATE TABLE IF NOT EXISTS players (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    wins INT DEFAULT 0,
    losses INT DEFAULT 0
);

-- Table for storing game history
CREATE TABLE IF NOT EXISTS games (
    id INT AUTO_INCREMENT PRIMARY KEY,
    player1 INT,
    player2 INT,
    winner INT,
    game_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (player1) REFERENCES players(id),
    FOREIGN KEY (player2) REFERENCES players(id),
    FOREIGN KEY (winner) REFERENCES players(id)
);

-- Create a MySQL user for the game app
CREATE USER IF NOT EXISTS 'game_user'@'%' IDENTIFIED BY 'GamePass@123';
GRANT ALL ON game_db.* TO 'game_user'@'%';
FLUSH PRIVILEGES;
