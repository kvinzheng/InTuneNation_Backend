/* eslint func-names: ["error", "never"]*/
exports.up = function (knex) {
  return knex.schema.createTable('scores', (table) => {
    table.increments();
    // scores table belongs to user table
    table.integer('user_id').references('id').inTable('users').onDelete('CASCADE')
    .notNullable()
    .index();
    // scores table belongs to exercises table
    table.integer('exercises_id').references('id').inTable('exercises').onDelete('CASCADE')
    .notNullable()
    .index();
    table.string('scores_array').notNullable().defaultTo('[]');
    table.float('avg_score').notNullable().defaultTo(0);
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('scores');
};
