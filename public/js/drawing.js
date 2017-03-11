paper.install(window);
var myColor = new Color(0, 0, 0);
var myTool = "Path";
var socket = io.connect('http://localhost:3000');
var usersPaths = {};

socket.on('path_request_u', function (id, point, color) {
    console.log('tez mostafa');
    console.log(color);
    usersPaths[id] = new Path({
        segments: [new Point(point[1], point[2])],
        // Select the path, so we can see its segment points:
        fullySelected: false
    });
    usersPaths[id].strokeColor = new Color(color[1], color[2], color[3]);
    usersPaths[id].strokeWidth = 10;
});

socket.on('path_point_u', function (id, point) {
    usersPaths[id].add(new Point(point[1], point[2]));
});

socket.on('path_end_u', function (id) {
    usersPaths[id].simplify(10);
    usersPaths[id] = null;
});

socket.on('rect_u', function (point, size, color) {
    new Path.Rectangle({
        position: new Point(point[1], point[2]),
        size: size,
        fillColor: new Color(color[1], color[2], color[3])
    });
});

socket.on('circle_u', function (point, size, color) {
    new Path.Circle({
        center: new Point(point[1], point[2]),
        radius: size,
        fillColor: new Color(color[1], color[2], color[3])
    });
});

socket.on('join:load_page', function (json) {
    console.log('.......................');
    paper.project.importJSON(json)
});

window.onload = function () {
    document.getElementById("myCanvas").setAttribute('width', window.innerWidth * 0.96);
    document.getElementById("myCanvas").setAttribute('height', window.innerHeight * 0.92);
    paper.setup('myCanvas');


    var path;
    var circle;
    var rect;
    var size_;
    var tool = new Tool();
    var myRoom = 0;
    var id = 0;

    socket.emit('join', myRoom);


    tool.onMouseDown = function (event) {

        if (myTool == 'Path') {
            // Create a new path and set its stroke color to black:
            path = new Path({
                segments: [event.point],
                // Select the path, so we can see its segment points:
                fullySelected: false
            });
            path.strokeColor = myColor;
            path.strokeWidth = 10;
            socket.emit('path_request', myRoom, id, event.point, myColor)
        } else if (myTool == 'Rect') {
            rect = new Path.Rectangle({
                position: event.point,
                size: 20,
                fillColor: myColor
            });
        } else {
            circle = new Path.Circle({
                center: event.point,
                radius: 20,
                fillColor: myColor
            });
        }
    };


    tool.onMouseDrag = function (event) {
        if (myTool == 'Path') {
            path.add(event.point);
            socket.emit('path_point', myRoom, id, event.point)
        } else if (myTool == 'Rect') {
            var p = rect.position;
            rect.remove();
            size_ = Math.sqrt(Math.pow(p.x - event.point.x, 2) + Math.pow(p.y - event.point.y, 2));
            rect = new Path.Rectangle({
                position: p,
                size: size_,
                fillColor: myColor
            });
        } else {
            var p = new Point(circle.position);
            circle.remove();
            size_ = Math.sqrt(Math.pow(p.x - event.point.x, 2) + Math.pow(p.y - event.point.y, 2));
            circle = new Path.Circle({
                center: p,
                radius: size_,
                fillColor: myColor
            });
        }
    };

// When the mouse is released, we simplify the path:
    tool.onMouseUp = function (event) {
        if (myTool == 'Path') {
            // When the mouse is released, simplify it:
            path.simplify(10);

            socket.emit('path_end', myRoom, id)
        } else if (myTool == "Rect") {
            socket.emit('rect', myRoom, id, rect.position, size_,myColor)
        } else {
            socket.emit('circle', myRoom, id, circle.position, size_,myColor)
        }
    };




};

function changeColor(r, g, b) {
    myColor = new Color(r, g, b);
}

function changeMyTool(t) {
    myTool = t;
}

