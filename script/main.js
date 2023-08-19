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
    let rounded_line_style = {
        lineCap: "round",
        lineJoin: "round",
    };

    draw_circle(draw_ctx, {
        pos_x: 250,
        pos_y: 250,
        radius: 200,
    });

    draw_text(draw_ctx, "hello", {
        pos_x: 100,
        pos_y: 100,
    }, {
        font: "3em monospace",
        textAlign: "center",
    },
        "rgb(0,0,255)"
    );
    
    draw_line(draw_ctx, {
        pos_x1: 100,
        pos_y1: 100,
        pos_x2: 200,
        pos_y2: 200,
    }, {
        lineWidth: "30",
        strokeStyle: "rgb(255,0,0)",
        ...rounded_line_style,
    });
}
