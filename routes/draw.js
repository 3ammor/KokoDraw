/**
 * Created by gemy on 3/10/17.
 */
var double_p = require('double_p.js');



exports.draw_end = function (room, point, id) {
        paths=double_p.paths;
        projects=double_p.projects;
        project[room].activate();
        paths[room][id] = new Path({
        segments: [event.point],
        strokeColor: 'black',
        fullySelected: true
    });

    }

exports.add_point = function (room, point, id) {
    paths=double_p.paths;
    projects=double_p.projects;
    project[room].activate();

    paths[room][id].add(point);

}

exports.draw_end = function (room, point, id) {
    paths=double_p.paths;
    projects=double_p.projects;
    project[room].activate();

    paths[room][id].simplify(10);

 // add in data base

}
