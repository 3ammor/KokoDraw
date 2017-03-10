
var path;
var tool = "Path";

function onMouseDown(event) {

    if (tool == 'Path') {
        // Create a new path and set its stroke color to black:
        path = new Path({
            segments: [event.point],
            // Select the path, so we can see its segment points:
            fullySelected: false
        });
        path.strokeColor = new Color(0, 0, 1);
        path.strokeWidth = 10;
        socket.emit('path_request', myRoom + '_' + id, event.point)
    }
}

// While the user drags the mouse, points are added to the path
// at the position of the mouse:
function onMouseDrag(event) {
    path.add(event.point);

    socket.emit('path_point', myRoom + '_' + id, event.point)
}

// When the mouse is released, we simplify the path:
function onMouseUp(event) {
    // When the mouse is released, simplify it:
    path.simplify(10);
}