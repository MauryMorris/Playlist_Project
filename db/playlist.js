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
    const playlist_space = await knex("playlist").select("*").where("name", playlista).first();
    const playlist_id = playlist_space.id;
    
    return await knex('songs').select("*").where("playlist_id", playlist_id);
};

async function insertSong(name) {
    const rekord = await knex("playlist").select("id").where("name", name).first();

    if (!rekord)
    {
        return await knex('playlist').insert({name});
    };
    throw new Error("Podana playlista już istnieje w bazie danych!");
};

module.exports = {
    createPlaylist,
    getAllSongs,
    insertSong
}