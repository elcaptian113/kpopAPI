const config = require("../config/config");
const Groups = require("./band");
const Idols = require("./idols");

//set ORM credentials
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
 config.DB,
 config.USER,
 config.PASSWORD, {
 host: config.HOST,
 dialect: config.dialect,
 port: config.PORT
});

//set ORM process for connections
sequelize
 .authenticate()
 .then(() => {
 console.log('Connection has been established successfully.');
 })
 .catch(err => {
 console.error('Unable to connect to the database:', err);
 })

const db = {};

//initialise ORM and object models
db.Sequelize = Sequelize;


db.band = Groups(sequelize, Sequelize);
db.idols = Idols(sequelize, Sequelize, db.band);

module.exports = db;