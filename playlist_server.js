const express = require("express");
const app = express();
const db = require("./db/playlist")

app.use(express.json());

app.put("/playlist/:URLname", async (req, res) => {
    const name = req.params.URLname;
    try{
        await db.createPlaylist(name);
        res.status(201).send();
    
    } catch (error) {
        res.status(409).send(error.message);
        console.log(error.message);
    }
});

app.get("/playlist/:URLname", async (req, res) => {
    const playlista = req.params.URLname;
    try{
        await db.getAllSongs(playlista);
        res.status(200).json();
    
    } catch (error) {
        res.status(404).send(error.message);
        console.log(error.message);
    }
});

app.delete("/playlist/:id", async (req, res) => {
    await db.deleteSong(req.params.id);
    res.status(200).json({ sucess: true });
});

app.listen(1337, () => console.log("Playlist Server is running on port 1337"));