'use strict';
module.exports = function(sequelize, DataTypes) {
  var Room = sequelize.define('Room', {
    id: {type: DataTypes.INTEGER, primaryKey: false, unique: true, autoIncrement: true},
    name: {type: DataTypes.STRING, primaryKey: true},
    data: DataTypes.TEXT('long')
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
