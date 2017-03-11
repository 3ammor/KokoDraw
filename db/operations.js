var models = require('../models/index');

function roomCreateUpdate(user_id, token, json) {

    jsonString = JSON.stringify(json);

    models.Room.findOne({
        where: {
            name: token
        }.then(function (room) {
            if (room != null) {
                room.updateAttributes({data: jsonString}).success(function () {
                    return 0;
                });
            }
            else {
                models.Room.create({
                    data: jsonString
                }).then(function (room) {
                    models.User.findOne({
                        where: {
                            id: user_id
                        }
                    }).then(function (user) {
                        room.addUser(user);
                        return 0;
                    }).catch(function (err) {
                        return -1;
                    });

                }).catch(function (err) {
                    return -1;
                });
            }
        }).catch(function (err) {
            return -1
        })
    });
}


function checkExistance(token) {
    models.Room.findOne({
        where: {
            name: token
        }
    }).then(function (room) {
            if (room != null) {
               return true;
            }
            return false;
        }).catch(function (err) { return false;});
}

function getJSON(token) {
    models.Room.findOne({
        where: {
            name: token
        }
    }).then(function (room) {
        if (room != null) {
            return JSON.parse(room.data);
        }
        return null;
    }).catch(function (err) {return null;});
}