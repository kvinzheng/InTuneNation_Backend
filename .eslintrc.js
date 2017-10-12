module.exports = {
  extends: "airbnb-base",
  rules: {
    semi: 0,
  },
  plugins: [
    "import"
  ],
  env: {
    node: true
  },
  globals: {
    describe: true,
    it: true,
    beforeEach: true,
    afterEach: true,
  }
};
