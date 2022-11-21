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
    const playlist_id = playlist_space?.id;

    if (playlist_id !== undefined)
    {
        return await knex('songs').insert({
            ...putData,
            playlist_id
        });
    }
    throw new Error(`Such playlist (as: ${playlista}) does not exist!`);
};

async function getAllPlaylists() {
    return await knex('playlist').select('name');
};

async function deletePlaylist(playlista) {
    const playlist = await knex("playlist").select("id").where("name", playlista).first();
    const songs = await knex('songs').select('*').where("playlist_id", playlist.id);
    await songs.forEach(async song => {
        await knex('songs').where('id', song.id).del();
    });
    await knex("playlist").where('name', playlista).del();
};

async function delSong(playlistName, songId) {
    const playlist = await knex("playlist").select("id").where("name", playlistName).first();
    console.log(playlist);
    const songs = await knex('songs').select('*').where("playlist_id", playlist.id);
    console.log(songs);
    if(songs && songs.length > 0) {
        const songToDel = songs[songId]?.id;
        if (songToDel === undefined) {
            throw new Error(`Song with orderId: ${songId} does not exits`);
        }
        await knex('songs').where('id', songToDel).del();
        return;
    }
    throw new Error('Playlist empty');
}

module.exports = {
    createPlaylist,
    getAllSongs,
    insertSong,
    getAllPlaylists,
    deletePlaylist,
    delSong
}