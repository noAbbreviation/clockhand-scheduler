let draw_ctx;

window.onload = (_event) => {
    const main_canvas = document.querySelector("#main-canvas");
    main_canvas.style["width"] = "100%";
    main_canvas.style["height"] = "100%";

    if (main_canvas.getContext) {
        draw_ctx = main_canvas.getContext("2d");
        draw_clock(draw_ctx);
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
    }, "rgb(0,0,255)");
    
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

    draw_text(
        draw_ctx,
        "9",
        rotate_point({
            pos_x: 250,
            pos_y: 250,
        }, 160, Math.PI),
    {
        font: "3em monospace",
        textAlign: "center",
    }, "green");
}

function draw_clock(draw_ctx) {
    const center_coord = {
        pos_x: 250,
        pos_y: 250,
    };

    const circle_dim = {  
        radius: 230,
        ...center_coord,
    };

    draw_circle(draw_ctx, circle_dim, {
        fillStyle: "white",
        strokeStyle: "black",
    });
    
    const angle_in_12 = Math.PI / 6;
    let current_angle = angle_in_12 * 10;
    const numbers_radius = 200;

    let rotating_point = {...center_coord};

    for (let i=1; i<=12; i += 1) {
        rotating_point = rotate_point(center_coord, numbers_radius, current_angle);
        if (i >= 10 && i != 12) {
            rotating_point.pos_x += 3;
        } 

        draw_text(draw_ctx, `${i}`, {
            pos_x: rotating_point.pos_x,
            pos_y: rotating_point.pos_y + 5,
        }, {
            font: "2em monospace",
            textAlign: "center",
            textBaseline: "middle",
        }, "black");

        current_angle += angle_in_12;
    }
}
