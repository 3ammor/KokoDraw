'use strict';
module.exports = function(sequelize, DataTypes) {
  var Room = sequelize.define('Room', {
    name: DataTypes.STRING,
    data: DataTypes.STRING
  },	 {
    classMethods: {
      associate: function(models) {
                Room.belongsToMany(models.User, {
                    through: "UserRoom"
                  }
              );
      }
    }
  });
  return Room;
};
