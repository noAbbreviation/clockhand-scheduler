window.addEventListener("DOMContentLoaded", () => {
    init_globals();
    init_canvases();

    init_option_buttons();
    init_slice_add_form();
    init_slice_edit_form();

    init_download_button();
    render_main_canvas();
});

window.addEventListener("resize", () => {
    const canvas_container = document.querySelector(".main-canvas");
    canvas_container.style["height"] = "100%";
    canvas_container.style["width"] = getComputedStyle(canvas_container).height;
    
    const main_canvas = document.querySelector("#main-canvas");
    main_canvas.style["width"] = "100%";
    main_canvas.style["height"] = "100%";
    render_main_canvas();
});

function init_globals() {
    const main_container = document.querySelector(".main-container");
    
    main_container.context = {};
    main_container.context = globals;
}

function get_globals() {
    return document.querySelector(".main-container").context;
}

function init_option_buttons() {
    const options = document.querySelectorAll(".sidebar ul button");
    for (const option of options) {
        option.addEventListener("click", click_option_button);
    }
}

function click_option_button(event) {
    const canvas_names = event.target.id.split("-");
    canvas_names.pop();
    
    const dialog_id = canvas_names.join("-");
    const dialog = document.querySelector(`#${dialog_id}`);
    dialog.showModal();
    
    if (dialog_id === "slice-edit") {
        const select = document.querySelector("#slice-to-edit");
        select.textContent = "";
        
        const options = create_slice_edit_options(get_globals().slices);
        for (const option of options) {
            select.appendChild(option);
        }
    }
    
    const draw_ctx = dialog.querySelector(`#submenu-canvas`).getContext("2d");
    const slices = get_globals().slices;
    draw_clock_slices(draw_ctx, slices);
}

function render_main_canvas() {
    const globals = get_globals(); 
    const draw_ctx = globals.main_canvas.draw_ctx;
    const slices = globals.slices;
    
    draw_clock_slices(draw_ctx, slices);
}

function init_canvases() {
    const global = get_globals().main_canvas;
    const main_canvas = document.querySelector("#main-canvas");
    global.draw_ctx = main_canvas.getContext("2d");
    
    const sub_canvases = document.querySelectorAll("#submenu-canvas");
    for (const sub_canvas of sub_canvases) {
        sub_canvas.style["width"] = "100%";
        sub_canvas.style["height"] = "100%";
    }
}

function init_download_button() {
    const download_btn = document.querySelector("#download-canvas-button");

    download_btn.addEventListener("click", () => {
        const canvas_element = get_globals().main_canvas.draw_ctx.canvas;
        const download_loader = document.querySelector("#download-loader");
        const canvas_as_stream = canvas_element.toDataURL("image/png").replace("image/png", "image/octet-stream");
        
        download_loader.setAttribute("download", "schedule.png");
        download_loader.setAttribute("href", canvas_as_stream);
        download_loader.click();
    });
}
