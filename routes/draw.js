/**
 * Created by gemy on 3/10/17.
 */
var double_p = require('./double_p.js');
var paper = require('paper');


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
};

exports.add_point = function (room, point, id) {
    paths = double_p.paths;
    projects = double_p.projects;
    projects[room].activate();
    paths[room][id].add(new paper.Point(point[1], point[2]));
};

exports.draw_end = function (room, id) {
    paths = double_p.paths;
    projects = double_p.projects;
    projects[room].activate();

    paths[room][id].simplify(10);

    // add in data base

};

