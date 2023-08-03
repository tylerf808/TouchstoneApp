const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL ||
  'touchstone_db',
  'root',
  'password',
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  }
);

module.exports = sequelize;