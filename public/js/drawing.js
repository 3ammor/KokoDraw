paper.install(window);
var myColor = new Color(0, 0, 0);

window.onload = function () {
    document.getElementById("myCanvas").setAttribute('width', window.innerWidth * 0.96);
    document.getElementById("myCanvas").setAttribute('height', window.innerHeight * 0.92);
    paper.setup('myCanvas');

    // Create a simple drawing tool:

    var path;
    var socket = io.connect('http://localhost:3000');
    var tool = new Tool();
    var myTool = "Path";
    var usersPaths = {};
    var myRoom = 0;
    var id = 0;

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
        }
    };

// While the user drags the mouse, points are added to the path
// at the position of the mouse:
    tool.onMouseDrag = function (event) {
        path.add(event.point);

        socket.emit('path_point', myRoom, id, event.point)
    };

// When the mouse is released, we simplify the path:
    tool.onMouseUp = function (event) {
        // When the mouse is released, simplify it:
        path.simplify(10);

        socket.emit('path_end', myRoom, id)
    };

    function recieveAction() {
        socket.on('path_request_u', function (id, point, color) {
            usersPaths[id] = new Path({
                segments: [event.point],
                // Select the path, so we can see its segment points:
                fullySelected: false
            });
            path.strokeColor = color;
            path.strokeWidth = 10;
        });

        socket.on('path_point_u', function (id, point) {
            usersPaths[id].add(point);
        });

        socket.on('path_end_u', function (id) {
            usersPaths[id].simplify(10);
        });

        socket.on('join:load_page', function (json) {
            paper.project.importJSON(json)
        });
    }
};

function changeColor(r, g, b) {
    myColor = new Color(r, g, b);
}
