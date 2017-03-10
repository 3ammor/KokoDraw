// Database creation.
var Sequelize = require('sequelize')
    , sequelize = new Sequelize('mysql://root:0000@localhost:3306/kokodraw');

sequelize.authenticate()
    .then(function(err) {
        console.log('Connection has been established successfully.');
    })
    .catch(function (err) {
        console.log('Unable to connect to the database:', err);
    });

var User = sequelize.define('User', {
    name: {type: Sequelize.STRING, primaryKey: true},
    fullname: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING
});

var Room = sequelize.define('Room', {
    id: {type: Sequelize.INTEGER, primaryKey: true},
    name: Sequelize.STRING,
    data: Sequelize.STRING
});

UserRoom = sequelize.define('UserRoom', {
});

User.belongsToMany(Room,{ through: UserRoom });

sequelize.sync();

