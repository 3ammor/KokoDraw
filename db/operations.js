var models = require('../models/index');

exports.roomCreateUpdate = function (user_id, token, json) {

    jsonString = JSON.stringify(json);
    console.log(token);

    models.Room.findOne({
        where: {
            name: token
        }}).then(function (room) {

        if (room != null && jsonString != "\"[]\"") {
                console.log("kosy");
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
            return -1;
        })
};


exports.checkExistence = function (token, checker, callback) {
    models.Room.findOne({
        where: {
            name: token
        }
    }).then(function (room) {
        if(room != null) {
            console.log("checker true");
            checker.check = true;
            callback();
            return;
        }
        checker.check = false;
        callback();
        return;
    }).catch(function (err) {
        checker.check = false;
        callback();
        return;
    });
};

exports.getJSON = function (token, ret, callback) {
    models.Room.findOne({
        where: {
            name: token
        }
    }).then(function (room) {
        if (room != null) {
            ret.json = JSON.parse(room.data);
            callback();
            return;
        }
        ret.json = null;
        callback();
        return;
    }).catch(function (err) {
        ret.json = null;
        callback();
        return;
    });
};

exports.getRoomToken=function (roomid) {
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
}

function createUserInRoom(userid, roomid) {

}