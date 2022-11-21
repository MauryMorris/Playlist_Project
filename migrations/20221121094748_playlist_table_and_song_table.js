/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex, Promise) {
  return knex.schema.createTable('playlist', function(table) { //tworzenie nowej tabeli playlist
    table.increments('id'); // kolumna id z właściwością autoinkrementacji
    table.string('name').notNullable(); //kolumna name z właściwością notNullable
  })
  .createTable('songs', function(table) { //tworzenie nowej tabeli songs
    table.increments('id'); // kolumna id z właściwością autoinkrementacji
    table.string('song_name').notNullable(); //kolumna song_name z właściwością notNullable
    table.string('src_link').notNullable(); //kolumna src_link z właściwością notNullable
    table.integer('playlist_id').references('id').inTable('playlist'); //relacja id z tabeli playlist do playlist_id w tabeli songs
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('playlist').dropTable('songs');
  //stworzenie schematu tabel playlist i songs
};
