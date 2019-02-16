function setCanvasSize() {
    var connector = document.getElementById("connector");
    var canvasContainer = document.getElementById("canvasContainer");
    connector.style.width = canvasContainer.scrollWidth + "px";
    connector.style.height = canvasContainer.scrollHeight + "px";
}
window.onload = function () {
    setCanvasSize();
    var connector = document.getElementById("connector");
    if (connector.getContext) {
        var context = connector.getContext("2d");
        context.clearRect(0, 0, connector.width, connector.height);
        context.fillStyle = "red"; // 指定填充颜色为红色
        context.fillRect(10, 10, 150, 150);
    }
};
window.onresize = function () {
    setCanvasSize();
    var connector = document.getElementById("connector");
    if (connector.getContext) {
        var context = connector.getContext("2d");
        context.clearRect(0, 0, connector.width, connector.height);
        context.fillStyle = "red"; // 指定填充颜色为红色
        context.fillRect(10, 10, 150, 150);
    }
};
