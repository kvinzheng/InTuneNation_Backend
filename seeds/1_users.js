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
        hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
        profile_picture:'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_960_720.png',
        created_at: new Date('2016-06-21 14:26:16 UTC'),
        updated_at: new Date('2016-06-21 14:26:16 UTC'),
      },
      {
        id: 2,
        first_name: 'Kevin',
        last_name: 'Zheng',
        email: 'kvinzheng@gmail.com',
        hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
        profile_picture:'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_960_720.png',
        created_at: new Date('2016-06-22 14:26:16 UTC'),
        updated_at: new Date('2016-06-22 14:26:16 UTC'),
      },
      {
        id: 3,
        first_name: 'Reid',
        last_name: 'Delahunt',
        email: 'reidpierredelahunt@gmail.com',
        profile_picture:'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_960_720.png',
        hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
        created_at: new Date('2016-06-23 14:26:16 UTC'),
        updated_at: new Date('2016-06-23 14:26:16 UTC'),
      },
      {
        id: 4,
        first_name: 'Marty',
        last_name: 'Yee',
        email: 'martytheemartian@yahoo.com',
        profile_picture:'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_960_720.png',
        hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
        created_at: new Date('2016-06-24 14:26:16 UTC'),
        updated_at: new Date('2016-06-24 14:26:16 UTC'),
      },
      {
        id: 5,
        first_name: 'Michael',
        last_name: 'Martinez',
        email: 'martinez1212@gmail.com',
        profile_picture:'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_960_720.png',
        hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
        created_at: new Date('2016-06-25 14:26:16 UTC'),
        updated_at: new Date('2016-06-25 14:26:16 UTC'),
      },
      {
        id: 6,
        first_name: 'Ryan',
        last_name: 'Thissen',
        email: 'rmt1855@gmail.com',
        profile_picture:'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_960_720.png',
        hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC'),
      },
      {
        id: 7,
        first_name: 'Alexander',
        last_name: 'KKrawiec',
        email: 'alexanderkrawiec@gmail.com',
        profile_picture:'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_960_720.png',
        hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
        created_at: new Date('2016-06-27 14:26:16 UTC'),
        updated_at: new Date('2016-06-27 14:26:16 UTC'),
      },
      {
        id: 8,
        first_name: 'parker',
        last_name: 'lewis',
        email: 'parklewis@gmail.com',
        profile_picture:'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_960_720.png',
        hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
        created_at: new Date('2016-06-28 14:26:16 UTC'),
        updated_at: new Date('2016-06-28 14:26:16 UTC'),
      }
    ]);
  })
  .then(() => {
    return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));");
  });
};
