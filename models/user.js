'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
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

                       
