var selected_images = [];
var selected_image_names = [];
var up;
var display;
window.onload = function () {
    up = setInterval("buttons_up_animation()", 10);
    display = setInterval("buttons_display_animation()", 10);
};
function buttons_up_animation() {
    var initial_top = 150;
    var final_top = 50;
    var buttons_holder = document.getElementById("buttons_holder");
    if (!buttons_holder) {
        clearInterval(up);
        return;
    }
    var current_top = parseInt(window.getComputedStyle(buttons_holder, null).top);
    if (Math.abs(current_top - final_top) < 4) {
        clearInterval(up);
    }
    else {
        var up_velocity = 4;
        buttons_holder.style.top = String(current_top - up_velocity * (current_top - final_top) / (initial_top - final_top)) + 'px';
    }
}
function buttons_display_animation() {
    var buttons_holder = document.getElementById("buttons_holder");
    if (!buttons_holder) {
        clearInterval(display);
        return;
    }
    var current_opacity = parseFloat(window.getComputedStyle(buttons_holder, null).opacity);
    if (Math.abs(1 - current_opacity) < 0.005) {
        clearInterval(display);
    }
    else {
        var display_velocity = 0.02;
        buttons_holder.style.opacity = String(current_opacity + display_velocity);
    }
}
function file_selected(e) {
    var images_holder = document.getElementById("images_holder");
    for (var i = 0; i < e.files.length; i++) {
        var image = e.files[i];
        var imageName = image.name;
        if (selected_image_names.indexOf(imageName) == -1) {
            selected_images.push(image);
            selected_image_names.push(imageName);
            create_image_container(image, images_holder);
        }
    }
}
function create_image_container(image, images_holder) {
    var image_container = document.createElement("div");
    image_container.className = "image_container";
    var reader = new FileReader();
    reader.onloadstart = function (e) {
        console.log("开始读取....");
    };
    reader.onprogress = function (e) {
        console.log("正在读取中....");
    };
    reader.onabort = function (e) {
        console.log("中断读取....");
    };
    reader.onerror = function (e) {
        console.log("读取异常....");
    };
    reader.onload = function (e) {
        console.log("成功读取....");
        var img = document.createElement("img");
        img.src = reader.result;
        image_container.appendChild(img);
        images_holder.appendChild(image_container);
    };
    reader.readAsDataURL(image);
}
