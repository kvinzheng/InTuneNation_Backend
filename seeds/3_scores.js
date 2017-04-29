exports.seed = function (knex, Promise) {
  return knex('scores').del().then(() => {
    return knex('scores').insert([
      {
        id: 1,
        exercises_id: 1,
        scores_array: '[79, 91, 86]',
        avg_score: 85.33,
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },
      {
        id: 2,
        exercises_id: 1,
        scores_array: '[77, 88, 85]',
        avg_score: 83.33,
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },
      {
        id: 3,
        exercises_id: 2,
        scores_array: '[88, 91, 86, 93]',
        avg_score: 89.5,
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },
      {
        id: 4,
        exercises_id: 2,
        scores_array: '[79, 88, 84, 90]',
        avg_score: 85.25,
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },
      {
        id: 5,
        exercises_id: 3,
        scores_array: '[89, 88, 85, 96, 80]',
        avg_score: 87.6,
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },
      {
        id: 6,
        exercises_id: 3,
        scores_array: '[79, 77, 82, 85, 81]',
        avg_score: 80.8,
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },

    ]);
  }).then(() => {
    return knex.raw("SELECT setval('scores_id_seq', (SELECT MAX(id) FROM scores));");
  });
};
