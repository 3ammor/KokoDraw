'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Users', {
      id: {
	type: Sequelize.INTEGER,
	primaryKey: true,
	autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
	unique: true
      },
      fullname: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
	unique: true
      },
      password: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Users');
  }
};
