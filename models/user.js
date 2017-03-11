'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true},
    email: DataTypes.STRING,
    password: DataTypes.STRING
  },{
  classMethods: {
      associate: function(models) {
                User.belongsToMany(models.Room, {
                    through: "UserRoom"
                  }
              );
      }
    }
  });
  return User;
};
