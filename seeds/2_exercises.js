exports.seed = function (knex, Promise) {
  return knex('exercises').del()
  .then(() => {
    return knex('exercises').insert([
      {
        id: 1,
        user_id: 1,
        notes_array: '[40,42,44]',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },
      {
        id: 2,
        user_id: 2,
        notes_array: '[28,31,35,40]',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },
      {
        id: 3,
        user_id: 2,
        notes_array: '[40,42,44,40,42]',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },
      {
        id: 4,
        user_id: 2,
        notes_array: '[33,30,36]',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },
      {
        id: 5,
        user_id: 3,
        notes_array: '[37,35]',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },
      {
        id: 6,
        user_id: 1,
        notes_array: '[37,35,39]',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },
      {
        id: 7,
        user_id: 3,
        notes_array: '[33,35,33]',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },
      {
        id: 8,
        user_id: 3,
        notes_array: '[30,31,32]',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },
      {
        id: 9,
        user_id: 1,
        notes_array: '[31,33]',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },
      {
        id: 10,
        user_id: 1,
        notes_array: '[40,42,45]',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },
      {
        id: 11,
        user_id: 1,
        notes_array: '[40,42,44,47]',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },
      {
        id: 12,
        user_id: 2,
        notes_array: '[32,31,30,44,42]',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },
      {
        id: 13,
        user_id: 2,
        notes_array: '[36,33,30]',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },
      {
        id: 14,
        user_id: 2,
        notes_array: '[40,33,30,40]',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },
      {
        id: 15,
        user_id: 2,
        notes_array: '[36,33,30,33]',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },
      {
        id: 16,
        user_id: 1,
        notes_array: '[32,33,34]',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },
      {
        id: 17,
        user_id: 2,
        notes_array: '[47,41,39]',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },
      {
        id: 18,
        user_id: 1,
        notes_array: '[32,33,30]',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },
      {
        id: 19,
        user_id: 4,
        notes_array: '[44,47,42]',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },
      {
        id: 20,
        user_id: 4,
        notes_array: '[36,35,37]',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },
    ]);
  })
  .then(() => {
    return knex.raw("SELECT setval('exercises_id_seq', (SELECT MAX(id) FROM exercises));");
  });
};
