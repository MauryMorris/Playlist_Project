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

async function insertSong(playlista, putData) {
    const playlist_space = await knex("playlist").select("*").where("name", playlista).first();
    const playlist_id = playlist_space.id;

    if (playlist_id)
    {
        return await knex('songs').insert({song_name: putData.song_name,src_link: putData.src_link,playlist_id: playlist_id}).then(()=>{});
    };
};

async function getAllPlaylists() {
    return await knex('playlist').select('id','name');
};

async function deletePlaylist(playlista) {
    const playlist_space = await knex("playlist").select("*").where("name", playlista).first();
    const playlist_id = playlist_space.id;
    console.log(playlist_space);
    console.log(playlist_id);
};

module.exports = {
    createPlaylist,
    getAllSongs,
    insertSong,
    getAllPlaylists,
    deletePlaylist
}