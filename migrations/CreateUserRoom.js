'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('UserRoom', {
      userid: {
	type: Sequelize.INTEGER,
	references: { model: "Users", key: "id" },
	primaryKey: true
      },
      roomid: {
        type: Sequelize.STRING,
	references: { model: "Rooms", key: "id" },
	primaryKey: true
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
    return queryInterface.dropTable('UserRoom');
  }
};
