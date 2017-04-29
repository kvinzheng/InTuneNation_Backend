exports.up = function (knex) {
  return knex.schema.createTable('scores', (table) => {
    table.increments();
    table.integer('exercises_id').reference('id').inTable('exercise').onDelete('CASCADE').notNullable().index();
    table.string('scores_array').notNullable.defaultTo('[]');
    table.float('avg_score').notNullable().defaultTo(0);
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('scores');
};
