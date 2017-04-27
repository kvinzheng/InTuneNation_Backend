exports.up = function (knex) {
  // return knex.schema.createTable('note', (table) => {
  //   table.increments()
  //   .reference('id')
  //   .inTable('exercise')
  //   .onDelete('CASCADE')
  //   .index();
  //   table.string('piano_key').notNullable().defaultTo('');
  //   table.string('notename').notNullable().defaultTo('');
  //   table.string('note_octave').notNullable().defaultTo('');
  //   table.string('average_intonation_score').notNullable().defaultTo('');
  //   table.string('perfect_fq').notNullable().defaultTo('');
  //   table.timestamps(true, true);
  // });
};

exports.down = function (knex) {
  // return knex.schema.dropTable('note');
};
