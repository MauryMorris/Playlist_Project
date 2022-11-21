const e = require("express");
const express = require("express");
const app = express();
const db = require("./db/playlist")

app.use(express.json());

app.use((req, _res, next) => {
    console.log(`${req.method} ${req.path}\n${JSON.stringify(req.body, null, 2)}`);
    next();
})

app.put("/playlist/:name", async (req, res) => {
    const name = req.params.name;
    try{
        await db.createPlaylist(name);
        res.status(201).send();
    
    } catch (error) {
        res.status(409).send(error.message);
        console.log(error.message);
    }
});

app.get("/playlist/:name", async (req, res) => {
    const playlista = req.params.name;
    try{
        const result = await db.getAllSongs(playlista);
        res.status(200).json(result);
    
    } catch (error) {
        res.status(404).send(error.message);
        console.log(error.message);
    }
});

app.put("/playlist/:name/add", async (req, res) => {
    const name = req.params.name;
    const putData = req.body;
    try{
        await db.insertSong(name, putData);
        res.status(201).send();
    
    } catch (error) {
        res.status(409).send(error.message);
        console.log(error.message);
    }
});

app.get("/playlist", async (_req, res) => {
    try{
        const result = await db.getAllPlaylists();
        res.status(200).json(result);
    
    } catch (error) {
        res.status(404).send(error.message);
        console.log(error.message);
    }
});

app.delete("/playlist/:name", async (req, res) => {
    const name = req.params.name;
    await db.deletePlaylist(name);  
    res.status(200).send();
});

app.delete("/playlist/:name/del/:orderId", async (req, res) => {
    try {
        const {name, orderId} = req.params;
        await db.delSong(name, orderId);  
        res.status(200).send();
    } catch (error) {
        res.status(404).send(error.message);
        console.log(error.message);
    }
});


app.listen(1337, () => console.log("Playlist Server is running on port 1337"));