window.addEventListener("DOMContentLoaded", () => {
    init_globals();
    init_canvases();
    bind_slice_add_form();
    render_main_canvas();
    
    const options = document.querySelectorAll(".content button");
    for (const option of options) {
        option.addEventListener("click", click_option_button);
        
        switch (option.id) {
            case "slice-add-button":
                option.addEventListener("click", () => {});
        }
    }
});

function init_globals() {
    const main_container = document.querySelector(".main-container");
    const globals = {};
    
    globals.main_canvas = {};

    globals.clock_circle_style = {
        center: {
            pos_x: 250,
            pos_y: 250,
        },
        circle_style: {
            lineWidth: "5",
            strokeStyle: "rgb(175, 175, 175)",
        },
        inner_dot_style: {
            lineWidth: "10",
            strokeStyle: "black",
        },
        outer_dot_style: {
            lineWidth: "15",
            strokeStyle: defaults.fillStyle,
        },
        circle_radius: 230,
    };

    globals.clock_texts_style = {
        center: globals.clock_circle_style.center,
        text_radius: globals.clock_circle_style.circle_radius * 88 * 0.01,
        clock_text_style: {
            fillStyle: "rgb(49, 49, 49)",
        },
    };

    globals.clock_slice_style = {
        inner_stroke: {
            lineWidth: "3",
        },
        outer_stroke: {
            lineWidth: "7",
            strokeStyle: "white",
        }
    };

    globals.slices = [];
    
    main_container.context = {};
    main_container.context = globals;
    console.log(globals);
}

function get_globals() {
    return document.querySelector(".main-container").context;
}

function click_option_button(event) {
    const canvas_names = event.target.id.split("-");
    canvas_names.pop();
    
    const dialog_id = canvas_names.join("-");
    const dialog = document.querySelector(`#${dialog_id}`);
    dialog.showModal();
    
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
    
    main_canvas.style["width"] = "100%";
    main_canvas.style["height"] = "100%";
    global.draw_ctx = main_canvas.getContext("2d");
    
    const sub_canvases = document.querySelectorAll("#submenu-canvas");
    for (const sub_canvas of sub_canvases) {
        sub_canvas.style["width"] = "100%";
        sub_canvas.style["height"] = "100%";
    }
}
