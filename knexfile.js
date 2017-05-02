module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/ppp_dev',
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/ppp_test',
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
  },
};
