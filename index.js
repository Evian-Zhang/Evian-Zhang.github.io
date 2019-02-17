function transToEm(x) {
    return x * parseFloat(getComputedStyle(document.body).fontSize.replace("px", ""));
}
function setCanvasContainerSize() {
    var canvas_container = document.getElementById("canvas_container");
    var article_container_list = document.getElementsByClassName("article_container");
    var header = document.getElementById("main_header");
    var max_center = header.offsetTop + header.offsetHeight;
    for (var _i = 0, _a = Array.from(article_container_list); _i < _a.length; _i++) {
        var article_container = _a[_i];
        max_center = Math.max(max_center, article_container.offsetTop + article_container.offsetHeight);
    }
    canvas_container.style.height = String(max_center) + "px";
    var canvas = document.getElementById("main_canvas");
    canvas.width = canvas_container.offsetWidth;
    canvas.height = canvas_container.offsetHeight;
}
function drawTree() {
    var main_canvas = document.getElementById("main_canvas");
    if (main_canvas.getContext) {
        var context = main_canvas.getContext("2d");
        context.clearRect(0, 0, main_canvas.width, main_canvas.height);
        var header = document.getElementById("main_header");
        var root_x = main_canvas.width / 2;
        var root_y = header.offsetHeight;
        context.moveTo(root_x, root_y);
        var article_container_list = document.getElementsByClassName("article_container");
        var max_y = header.offsetTop + header.offsetHeight / 2;
        var node_list = [];
        for (var _i = 0, _a = Array.from(article_container_list); _i < _a.length; _i++) {
            var article_container = _a[_i];
            var container_left = article_container.offsetLeft;
            var node = {
                x: container_left < root_x ? container_left - transToEm(2) + article_container.offsetWidth : container_left - transToEm(2),
                y: article_container.offsetTop + article_container.offsetHeight / 2
            };
            node_list.push(node);
        }
        node_list.sort(function (a, b) { return a.y - b.y; });
        for (var nodeIndex = 0; nodeIndex < node_list.length; nodeIndex = nodeIndex + 1) {
            var tmpNode = node_list[nodeIndex];
            context.lineTo(root_x, tmpNode.y);
            context.lineTo(tmpNode.x, tmpNode.y);
            context.moveTo(root_x, tmpNode.y);
        }
        context.strokeStyle = "#ffffff";
        context.lineWidth = 10;
        context.lineCap = "round";
        context.shadowBlur = 20;
        context.shadowColor = "#4169E1";
        context.stroke();
    }
}
window.onload = function () {
    setCanvasContainerSize();
    drawTree();
};
window.onresize = function () {
    setCanvasContainerSize();
    drawTree();
};
