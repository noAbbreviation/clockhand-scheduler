let draw_ctx;

window.onload = (_event) => {
    const main_canvas = document.querySelector("#main-canvas");
    main_canvas.style["width"] = "100%";
    main_canvas.style["height"] = "100%";

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
        height: 40,
    };

    draw_rect(draw_ctx, test_dimensions, "rgb(0,255,0)");
    draw_circle(draw_ctx, {
        pos_x: 200,
        pos_y: 200,
        radius: 100,
    });
}
