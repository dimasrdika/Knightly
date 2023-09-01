const dotenv = require("dotenv");
const path = require("path");
const knex = require("knex");
const knexFile = require("../../knexfile");
dotenv.config({
  path: path.resolve(__dirname, `.env.${process.env.NODE.ENV}`),
});
const environment = process.env.NODE_ENV || "development";
module.exports = knex(knexFile[environment]);
