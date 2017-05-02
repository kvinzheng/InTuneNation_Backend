exports.seed = function (knex, Promise) {
  //Deletes All existing entries
  return knex('users').del().then(() => {
    //Inserts seed entries
    return knex('users').insert([
      {
        id: 1,
        first_name: 'Bob',
        last_name: 'Saget',
        email: 'bobsaget@gmail.com',
        hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud8ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },
      {
        id: 2,
        first_name: 'Kevin',
        last_name: 'Zheng',
        email: 'kvinzheng@gmail.com',
        hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud3ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },
      {
        id: 3,
        first_name: 'Reid',
        last_name: 'Delahunt',
        email: 'reidpierredelahunt@gmail.com',
        hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud5ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },
      {
        id: 4,
        first_name: 'Marty',
        last_name: 'Yee',
        email: 'martytheemartian@yahoo.com',
        hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },
      {
        id: 5,
        first_name: 'Michael',
        last_name: 'Martinez',
        email: 'martinez1212@gmail.com',
        hashed_password: '$2a$12$C9AGYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },
      {
        id: 6,
        first_name: 'Ryan',
        last_name: 'Thissen',
        email: 'rmt1855@gmail.com',
        hashed_password: '$2a$12$C9AGYmcLVGYlGoO4SSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },
      {
        id: 7,
        first_name: 'Alexander',
        last_name: 'KKrawiec',
        email: 'alexanderkrawiec@gmail.com',
        hashed_password: '$2a$12$C9AGYmcLVGYlGoO4SSZTPud6ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
      },
    ]);
  }).then(() => {
    return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));");
  });
};
