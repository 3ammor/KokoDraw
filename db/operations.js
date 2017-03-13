var models = require('../models/index');

exports.roomCreateUpdate = function (user_id, token, json) {

    jsonString = JSON.stringify(json);
    console.log(token);

    models.Room.findOne({
        where: {
            name: token
        }
    }).then(function (room) {

        if (room != null && jsonString != "\"[]\"") {
            room.updateAttributes({data: jsonString}).success(function () {
                return 0;
            });
        }

        else {
            models.Room.create({
                name: token,
                data: jsonString
            }).then(function (room) {
                models.User.findOne({
                    where: {
                        id: user_id
                    }
                }).then(function (user) {
                    user.addRoom(room);
                    return 0;
                }).catch(function (err) {
                    return -1;
                });

            }).catch(function (err) {
                return -1;
            });
        }
    }).catch(function (err) {
        return -1;
    })
};


exports.checkExistence = function (token, callback) {
    models.Room.findOne({
        where: {
            name: token
        }
    }).then(function (room) {
        if (room != null) {
            console.log("checker true");
            return callback(true);
        }
        console.log("checker false");
        return callback(false);
    }).catch(function (err) {
        return callback(false);
    });
};

exports.getJSON = function (token, callback) {
    models.Room.findOne({
        where: {
            name: token
        }
    }).then(function (room) {
        if (room != null) {
            ret = JSON.parse(room.data);
            return callback(ret);
        }
        return callback(null);
    }).catch(function (err) {
        return callback(null);
    });
};

exports.getRoomToken = function (roomid) {
    models.Room.findOne({
        where: {
            id: roomid
        }
    }).then(function (room) {
        if (room != null) {
            return room.token;
        }
        return null;
    }).catch(function (err) {
        return null;
    });
};

exports.getUsername = function (userid, callback) {
    models.User.findOne({
        where: {
            id: userid
        }
    }).then(function (user) {
        if (user != null) {
            console.log(user.name);
            return callback(user.name);
        }
        return callback(null);
    }).catch(function (err) {
        return callback(null);
    });
};

exports.getRoomsForUser = function (userid, callback) {
    models.User.findAll({
        where: {
            'id': userid
        },
        include: [{model: models.Room, as: models.Room.tableName, attributes: ['name']}],
        attributes: ['id'],
        raw: true
    }).then(function (rooms) {
        if (rooms != null) {
            var arr = [];
            rooms.forEach(function (room) {
                if (room["Rooms.name"] != null)
                    arr.push(room["Rooms.name"]);
            });
            return callback(arr);
        }
        return callback(null);
    }).catch(function (err) {
        return callback(null);
    });
};

exports.leaveRoom = function (userid, token, callback) {
    models.Room.findOne({
        where: {
            'name': token
        }
    }).then(function (room) {
        models.User.findOne({
            where: {
                'id': userid
            }
        }).then(function (user) {
            user.removeRoom(room);
            return callback();
        }).catch(function (err) {
        });
        return callback();
    }).catch(function (err) {
    });
};

exports.joinRoom = function (userid, token, callback) {
    models.Room.findOne({
        where: {
            'name': token
        }
    }).then(function (room) {
        models.User.findOne({
            where: {
                'id': userid
            }
        }).then(function (user) {
            user.addRoom(room);
            return callback();
        }).catch(function (err) {
        });
        return callback();
    }).catch(function (err) {
    });
};