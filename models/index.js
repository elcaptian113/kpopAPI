const config = require("../config/config");
const Groups = require("./band");
const Idols = require("./idols");


const Sequelize = require("sequelize");
const sequelize = new Sequelize(
 config.DB,
 config.USER,
 config.PASSWORD, {
 host: config.HOST,
 dialect: config.dialect,
 port: config.PORT
});

sequelize
 .authenticate()
 .then(() => {
 console.log('Connection has been established successfully.');
 })
 .catch(err => {
 console.error('Unable to connect to the database:', err);
 })

const db = {};

db.Sequelize = Sequelize;


db.band = Groups(sequelize, Sequelize);
db.idols = Idols(sequelize, Sequelize, db.band);

module.exports = db;