/**
 * Created by gemy on 3/10/17.
 */
var double_p = require('./double_p.js');
var paper = require('paper');
var db =require("../db/operations")


exports.draw = function (room, point, id, color) {
    paths = double_p.paths;
    projects = double_p.projects;
    projects[room].activate();
    paths[room][id] = new paper.Path({
        segments: [new paper.Point(point[1], point[2])],
        strokeColor: new paper.Color(color[1], color[2], color[3]),
        fullySelected: false,
        strokeWidth: 10
    });
    db.roomCreateUpdate(id,room,projects[room].exportJSON())

};

exports.add_point = function (room, point, id) {
    paths = double_p.paths;
    projects = double_p.projects;
    projects[room].activate();
    paths[room][id].add(new paper.Point(point[1], point[2]));
    db.roomCreateUpdate(id,room,projects[room].exportJSON())

};

exports.draw_end = function (room, id) {
    paths = double_p.paths;
    projects = double_p.projects;
    projects[room].activate();

    paths[room][id].simplify(10);
    db.roomCreateUpdate(id,room,projects[room].exportJSON())

};

exports.draw_rect = function (room, pos, size, color) {
    paths = double_p.paths;
    projects = double_p.projects;
    projects[room].activate();

    rect = new paper.Path.Rectangle({
        position: new paper.Point(pos[1], pos[2]),
        size: size,
        fillColor: new paper.Color(color[1], color[2], color[3])
    });
    db.roomCreateUpdate(id,room,projects[room].exportJSON())

};

exports.draw_circle = function (room, pos, size, color) {
    paths = double_p.paths;
    projects = double_p.projects;
    projects[room].activate();

    circle = new paper.Path.Circle({
        center: new paper.Point(pos[1], pos[2]),
        radius: size,
        fillColor: new paper.Color(color[1], color[2], color[3])
    });
    db.roomCreateUpdate(id,room,projects[room].exportJSON())

};

