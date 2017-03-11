var models = require('../models/index');

exports.roomCreateUpdate = function (user_id, token, json) {

    jsonString = JSON.stringify(json);
    console.log(token);

    models.Room.findOne({
        where: {
            name: token
        }}).then(function (room) {

        if (room != null) {
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


exports.checkExistence = function (token) {
    console.log("a7aaaaaaaaaaa");
    models.Room.findOne({
        where: {
            name: token
        }
    }).then(function (room) {
        console.log("oooh yaaaah");
         if (room != null) {
            console.log("ah");

            return true;
        }
        console.log("la");
        return false;

    }).catch(function (err) {
        console.log("console 3m hosny");
        return false;
    });
    console.log("hey apple!");
};

exports.getJSON = function (token) {
    models.Room.findOne({
        where: {
            name: token
        }
    }).then(function (room) {
        if (room != null) {
            return JSON.parse(room.data);
        }
        return null;
    }).catch(function (err) {
        return null;
    });
}

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