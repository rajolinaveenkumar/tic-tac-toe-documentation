const dbcreds = require('./DbConfig');
const mysql = require('mysql2'); // Using mysql2

// Database Connection
const con = mysql.createConnection({
    host: process.env.DB_HOST || dbcreds.DB_HOST,
    user: process.env.DB_USER || dbcreds.DB_USER,
    password: process.env.DB_PWD || dbcreds.DB_PWD,
    database: process.env.DB_DATABASE || dbcreds.DB_DATABASE
});

// ADD PLAYER
function addPlayer(username, callback) {
    var sql = `INSERT INTO players (username) VALUES ('${username}')`;
    con.query(sql, function (err, result) {
        if (err) {
            console.error("Error adding player:", err);
            return callback(false);
        }
        console.log(`Player '${username}' added successfully`);
        callback(true);
    });
}

// GET ALL PLAYERS
function getAllPlayers(callback) {
    var sql = "SELECT * FROM players";
    con.query(sql, function (err, result) {
        if (err) throw err;
        callback(result);
    });
}

// RECORD A GAME RESULT
function recordGame(player1, player2, winner, callback) {
    var sql = `INSERT INTO games (player1, player2, winner) VALUES (${player1}, ${player2}, ${winner})`;
    con.query(sql, function (err, result) {
        if (err) {
            console.error("Error recording game:", err);
            return callback(false);
        }
        console.log("Game recorded successfully");
        callback(true);
    });
}

// GET GAME HISTORY
function getGameHistory(callback) {
    var sql = "SELECT * FROM games";
    con.query(sql, function (err, result) {
        if (err) throw err;
        callback(result);
    });
}

// DELETE ALL GAMES
function deleteAllGames(callback) {
    var sql = "DELETE FROM games";
    con.query(sql, function (err, result) {
        if (err) throw err;
        callback(result);
    });
}

// DELETE PLAYER BY ID
function deletePlayerById(id, callback) {
    var sql = `DELETE FROM players WHERE id = ${id}`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(`Deleted player with ID ${id}`);
        callback(result);
    });
}

// GET PLAYER BY ID
function getPlayerById(id, callback) {
    var sql = `SELECT * FROM players WHERE id = ${id}`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        callback(result);
    });
}

module.exports = {
    addPlayer,
    getAllPlayers,
    recordGame,
    getGameHistory,
    deleteAllGames,
    deletePlayerById,
    getPlayerById
};
