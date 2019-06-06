var selected_images = [];
var selected_image_names = [];
var up;
var display;

window.onload = function () {
    up = setInterval("buttons_up_animation()", 10);
    display = setInterval("buttons_display_animation()", 10);
};

function buttons_up_animation() {
    let initial_top = 150;
    let final_top = 50;
    let buttons_holder = document.getElementById("buttons_holder");
    if (!buttons_holder) {
        clearInterval(up);
        return;
    }
    let current_top = parseInt(window.getComputedStyle(buttons_holder, null).top);
    if (Math.abs(current_top - final_top) < 4) {
        clearInterval(up);
    } else {
        let up_velocity = 4;
        buttons_holder.style.top = String(current_top - up_velocity * (current_top - final_top) / (initial_top - final_top)) + 'px';
    }
}

function buttons_display_animation() {
    let buttons_holder = document.getElementById("buttons_holder");
    if (!buttons_holder) {
        clearInterval(display);
        return;
    }
    let current_opacity = parseFloat(window.getComputedStyle(buttons_holder, null).opacity);
    if (Math.abs(1 - current_opacity) < 0.005) {
        clearInterval(display);
    } else {
        let display_velocity = 0.02;
        buttons_holder.style.opacity = String(current_opacity + display_velocity);
    }
}

function file_selected(e) {
    let images_holder = document.getElementById("images_holder") as HTMLDivElement;
    for (var i = 0; i < e.files.length; i++) {
        let image = e.files[i];
        let imageName = image.name;
        if (selected_image_names.indexOf(imageName) == -1) {
            selected_images.push(image);
            selected_image_names.push(imageName);
            create_image_container(image, images_holder);
        }
    }
}

function create_image_container(image: File, images_holder: HTMLDivElement) {
    let image_container = document.createElement("div");
    image_container.className = "image_container";

    let reader = new FileReader();
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

        let img = document.createElement("img") as HTMLImageElement;
        img.src = reader.result as string;
        image_container.appendChild(img);
        images_holder.appendChild(image_container);
    };
    reader.readAsDataURL(image);
}