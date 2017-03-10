/**
 * Created by gemy on 3/10/17.
 */



var express = require("express"),
    paper = require('paper'),
    socket = require('socket.io'),
    http = require('http'),
    https = require('https');
   double_p = require('double_p.js');




io.sockets.on('connection', function (socket) {
    socket.on('disconnect', function () {
        console.log("disconnecting");
    })


    socket.on('path_request_u', function (room_id, id, point,color) {
        io.in(room).emit('path_request_u', id, point);
        draw.draw_end(room, point, id,color);
    });


    socket.on('path_point_u', function (room, id, point) {
        io.in(room).emit('path_point_u', id, point);
        draw.add_point(room, point, id);
    });

    socket.on('path_end_u', function (room, id, point) {
        io.in(room).emit('path_end_u', id, point);
        draw.draw_end(room, point, id);
    });



});


function join(socket, room) {
    socket.join(room);
    paths=double_p.paths;
    projects=double_p.projects;
    var project = double_p.projects[room];
    if (!project) {
      if (! db.check_existence(room)){
          paths=double_p.paths;
          projects=double_p.projects;
          paths[room]={};
          projects[room]= new paper.Project();
      }
      else {
         project_json= db.get_project(room)
          projects[room]= new paper.Project();
          projects[room].importJSON(project_json);
          io.in(room).emit('join:load_page',project_json);


      }

    }
    else  {
        var project_json = projects[room].exportJSON();
        io.in(room).emit('join:load_page',project_json);

      }
    io.in(room).emit('join:end');


}