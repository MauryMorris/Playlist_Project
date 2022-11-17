const knex = require("./knex");

async function createPlaylist(name) {
    const rekord = await knex("playlist").select("id").where("name", name).first();

    if (!rekord)
    {
        return await knex('playlist').insert({name});
    };
    throw new Error("Podana playlista już istnieje w bazie danych!");
};

async function getAllSongs(playlista) {
    console.log(playlista); //Wyświetla nazwę
    const playlist_space = await knex("songs").select("*").where("playlist_id", playlista).first();
    
    if (playlist_space)
    {
        return await knex("playlist").select("song_name","src_link").from(playlist_space);
    }
    throw new Error("Podana playlista nie zawiera utworów!");
};

function deleteSong(id) {
    return knex("playlist").where("id", id).del();
};

module.exports = {
    createPlaylist,
    getAllSongs,
    deleteSong
}