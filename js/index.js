var article_container_left_margin = 2;
var distance_from_line_to_container = 0.3;
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
        context.strokeStyle = "#ffffff";
        context.lineCap = "round";
        context.shadowBlur = 15;
        context.shadowColor = "#4169E1";
        context.lineWidth = 5;
        context.moveTo(root_x, root_y + transToEm(distance_from_line_to_container));
        var article_container_list = document.getElementsByClassName("article_container");
        var max_y = header.offsetTop + header.offsetHeight / 2;
        var node_list = [];
        for (var _i = 0, _a = Array.from(article_container_list); _i < _a.length; _i++) {
            var article_container = _a[_i];
            var container_left = article_container.offsetLeft;
            var node = {
                x: container_left < root_x ?
                    container_left - transToEm(article_container_left_margin) + article_container.offsetWidth + transToEm(distance_from_line_to_container) :
                    container_left - transToEm(article_container_left_margin) - transToEm(distance_from_line_to_container),
                y: article_container.offsetTop + article_container.offsetHeight / 2
            };
            node_list.push(node);
        }
        node_list.sort(function (a, b) { return a.y - b.y; });
        for (var nodeIndex = 0; nodeIndex < node_list.length; nodeIndex = nodeIndex + 1) {
            var tmpNode = node_list[nodeIndex];
            context.lineTo(root_x, tmpNode.y);
            context.stroke();
            context.lineTo(tmpNode.x, tmpNode.y);
            context.stroke();
            context.moveTo(root_x, tmpNode.y);
        }
    }
}
function adjustArticleContainer() {
    var left_container = document.getElementsByClassName("left");
    var right_container = document.getElementsByClassName("right");
    if (left_container.length > 1) {
        for (var i = 1; i < left_container.length; i++) {
            var previous = left_container[i - 1];
            left_container[i].style.top = String(previous.offsetTop + previous.offsetHeight) + "px";
        }
    }
    if (right_container.length > 1) {
        for (var i = 1; i < right_container.length; i++) {
            var previous = right_container[i - 1];
            right_container[i].style.top = String(previous.offsetTop + previous.offsetHeight) + "px";
        }
    }
}
function changeHref() {
    var cryptography_link = document.getElementById("cryptography");
    cryptography_link.href = "https://nbviewer.jupyter.org/github/Evian-Zhang/Introduction-to-modern-cryptography/blob/master/现代密码学简介.pdf?number=" + String(Math.random());
}
window.onload = function () {
    adjustArticleContainer();
    changeHref();
    setCanvasContainerSize();
    drawTree();
};
window.onresize = function () {
    adjustArticleContainer();
    setCanvasContainerSize();
    drawTree();
};
