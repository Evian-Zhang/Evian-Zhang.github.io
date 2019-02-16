function setCanvasSize () {
    let connector = document.getElementById("connector") as HTMLCanvasElement;
    let canvasContainer = document.getElementById("canvasContainer") as HTMLDivElement;
    connector.style.width = canvasContainer.scrollWidth + "px";
    connector.style.height = canvasContainer.scrollHeight + "px";
}

window.onload = function () {
    setCanvasSize();
    let connector = document.getElementById("connector") as HTMLCanvasElement;
    if (connector.getContext) {
        var context = connector.getContext("2d");
        context.clearRect(0, 0, connector.width, connector.height);
        context.fillStyle = "red"; // 指定填充颜色为红色
        context.fillRect(10, 10, 150, 150);
    }
};

window.onresize = function () {
    setCanvasSize();
    let connector = document.getElementById("connector") as HTMLCanvasElement;
    if (connector.getContext) {
        var context = connector.getContext("2d");
        context.clearRect(0, 0, connector.width, connector.height);
        context.fillStyle = "red"; // 指定填充颜色为红色
        context.fillRect(10, 10, 150, 150);
    }
};