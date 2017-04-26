exports.up = function (knex) {
  return knex.schema.createTable('exercise', (table) => {
    table.increments();
    table.string('average_intonation_score').notNullable().defaultTo(0);
    table.integer('note_id').unique().references('id').inTable('note').onDelete('CASCADE').notNullable().index();

    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('exercise');
};
