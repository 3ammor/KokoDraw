'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    id: {type: DataTypes.INTEGER, unique: true, autoIncrement: true},
    name: {type: DataTypes.STRING, primaryKey: true},
    fullname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  },{
    classMethods: {
      associate: function(models) {
        User.belongsToMany(models.Room, {
        through: "UserRoom",
     		onDelete: "CASCADE",
      		foreignKey: {
        		allowNull: false
          }
     		});
  }
}});
  return User;
};

                       
