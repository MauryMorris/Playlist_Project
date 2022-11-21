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
        const result = await db.getAllSongs(playlista);
        res.status(200).json(result);
    
    } catch (error) {
        res.status(404).send(error.message);
        console.log(error.message);
    }
});

app.put("/playlist/:URLname/add", async (req, res) => {
    const name = req.params.URLname;
    const putData = req.body;
    try{
        await db.insertSong(name, putData);
        res.status(201).send();
    
    } catch (error) {
        res.status(409).send(error.message);
        console.log(error.message);
    }
});

app.get("/playlist", async (req, res) => {
    try{
        const result = await db.getAllPlaylists("/playlist");
        res.status(200).json(result);
    
    } catch (error) {
        res.status(404).send(error.message);
        console.log(error.message);
    }
});

app.delete("playlist/:URLname", async (req, res) => {
    const name = req.params.URLname;
    console.log(name);
        await db.deletePlaylist(name);        
});

app.listen(1337, () => console.log("Playlist Server is running on port 1337"));