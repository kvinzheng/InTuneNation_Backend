
exports.up = function (knex) {
  return knex.schema.createTable('user_exericse', (table) => {
    table.increments();
    table.string('user_id').notNullable().reference('id').inTable('users').onDelete('CASCADE').index();
    table.string('exercise_id').notNullable().reference('id').inTable('exercise').onDelete('CASCADE').index();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('user_exericse')
};
