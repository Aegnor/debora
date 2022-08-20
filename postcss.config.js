/* eslint-disable import/no-extraneous-dependencies */
const autoprefixer = require('autoprefixer');
const mqpacker = require('mqpacker');

module.exports = {
  plugins: [
    autoprefixer,
    mqpacker(),
  ],
};
