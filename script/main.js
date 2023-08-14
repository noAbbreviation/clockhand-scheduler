let draw_ctx;

window.onload = (_event) => {
    const main_canvas = document.querySelector("#main-canvas");

    if (main_canvas.getContext) {
        draw_ctx = main_canvas.getContext("2d");
        draw_test(draw_ctx);
    }
}

function draw_test(draw_ctx) {
    let test_dimensions = {
        pos_x: 10,
        pos_y: 20,
        width: 30,
        height: 40
    };

    draw_rect(draw_ctx, test_dimensions, "rgb(0,255,0)");
}
