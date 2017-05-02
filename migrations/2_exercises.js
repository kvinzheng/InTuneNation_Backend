exports.up = function(knex) {
  return knex.schema.createTable('exercises', (table) => {
    table.increments();
    table.integer('user_id').references('id').inTable('users').onDelete('CASCADE').notNullable().index();
    table.string('notes_array').notNullable().defaultTo('[]');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) { return knex.schema.dropTable('exercises'); };
