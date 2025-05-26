const gameService = require('./GameService'); // Updated service name
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const moment = require('moment');

const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// ROUTES FOR OUR API
// =======================================================

// Health Check
app.get('/health', (req, res) => {
    res.json("This is the health check");
});

// ADD PLAYER
app.post('/player', (req, res) => {
    try {
        t = moment().unix();
        console.log(`{ "timestamp": ${t}, "msg": "Adding Player", "username": "${req.body.username}" }`);
        gameService.addPlayer(req.body.username, function (success) {
            if (success) {
                res.json({ message: 'Player added successfully' });
            } else {
                res.status(400).json({ message: 'Could not add player' });
            }
        });
    } catch (err) {
        res.json({ message: 'Something went wrong', error: err.message });
    }
});

// GET ALL PLAYERS
app.get('/players', (req, res) => {
    try {
        gameService.getAllPlayers(function (results) {
            res.status(200).json({ players: results });
        });
    } catch (err) {
        res.json({ message: "Could not get all players", error: err.message });
    }
});

// RECORD A GAME RESULT
app.post('/game', (req, res) => {
    try {
        t = moment().unix();
        console.log(`{ "timestamp": ${t}, "msg": "Recording Game", "player1": ${req.body.player1}, "player2": ${req.body.player2}, "winner": ${req.body.winner} }`);
        gameService.recordGame(req.body.player1, req.body.player2, req.body.winner, function (success) {
            if (success) {
                res.json({ message: 'Game recorded successfully' });
            } else {
                res.status(400).json({ message: 'Could not record game' });
            }
        });
    } catch (err) {
        res.json({ message: 'Something went wrong', error: err.message });
    }
});

// GET GAME HISTORY
app.get('/games', (req, res) => {
    try {
        gameService.getGameHistory(function (results) {
            res.status(200).json({ games: results });
        });
    } catch (err) {
        res.json({ message: "Could not retrieve game history", error: err.message });
    }
});

// DELETE ALL GAMES
app.delete('/games', (req, res) => {
    try {
        gameService.deleteAllGames(function (result) {
            res.status(200).json({ message: "Deleted all game records." });
        });
    } catch (err) {
        res.json({ message: "Deleting all games may have failed.", error: err.message });
    }
});

// DELETE PLAYER BY ID
app.delete('/player/:id', (req, res) => {
    try {
        gameService.deletePlayerById(req.params.id, function (result) {
            res.status(200).json({ message: `Player with ID ${req.params.id} deleted successfully.` });
        });
    } catch (err) {
        res.json({ message: "Error deleting player", error: err.message });
    }
});

// GET PLAYER BY ID
app.get('/player/:id', (req, res) => {
    try {
        gameService.getPlayerById(req.params.id, function (result) {
            if (result.length > 0) {
                res.status(200).json(result[0]);
            } else {
                res.status(404).json({ message: "Player not found" });
            }
        });
    } catch (err) {
        res.json({ message: "Error retrieving player", error: err.message });
    }
});

// Start the server
app.listen(port, () => {
    t = moment().unix();
    console.log(`{ "timestamp": ${t}, "msg": "Game App Started on Port ${port}" }`);
});
