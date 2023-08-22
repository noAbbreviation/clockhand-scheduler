let draw_ctx;

window.addEventListener("DOMContentLoaded", () => {
    init_globals();
    render_main_canvas();
    bind_slice_add_form();

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
    
    globals.clock_circle_style = {
        center: {
            pos_x: 250,
            pos_y: 250,
        },
        circle_style: {
            lineWidth: "5",
            strokeStyle: "rgb(175, 175, 175)",
        },
        dot_style: {
            lineWidth: "3",
            strokeStyle: "black",
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

    globals.slices = [];
    
    main_container.context = {};
    main_container.context = globals;
    console.log(globals);
}

function get_globals() {
    return document.querySelector(".main-container").context;
}

function click_option_button() {
    render_starting_submenu_canvas();
}

function render_main_canvas() {
    const main_canvas = document.querySelector("#main-canvas");
    main_canvas.style["width"] = "100%";
    main_canvas.style["height"] = "100%";
    
    if (main_canvas.getContext) {
        draw_ctx = main_canvas.getContext("2d");

        apply_defaults(draw_ctx);
        draw_starting_clock(draw_ctx);
    }
}

function render_starting_submenu_canvas() {
    const sub_canvases = document.querySelectorAll("#submenu-canvas");
    for (const sub_canvas of sub_canvases) {
        const sub_ctx = sub_canvas.getContext("2d");
        sub_canvas.style["width"] = "100%";
        sub_canvas.style["height"] = "100%";

        draw_starting_clock(sub_ctx);
    }
}
