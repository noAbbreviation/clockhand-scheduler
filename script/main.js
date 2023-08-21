let draw_ctx;

window.addEventListener("DOMContentLoaded", () => {
    render_main_canvas();

    const options = document.querySelectorAll(".content button");
    for (const option of options) {
        option.addEventListener("click", bind_option_buttons);
        
        switch (option.id) {
            case "slice-add-button":
                option.addEventListener("click", bind_slice_add_button);
        }
    }

});

function bind_option_buttons() {
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

function bind_slice_add_button() {
    const form = document.querySelector(".popups #slice-add-form");

    form.context = {};
    const form_store = form.context;

    const time_start = form.querySelector("#time_start");
    time_start.addEventListener("input", (event) => {
        form_store.time_start = event.target.value;
        console.log(form.context.time_start);
    });
}
