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
    }, {
        lineWidth: "8",
        fillStyle: "white",
        strokeStyle: "orange"
    });

    draw_circle_slice(draw_ctx,
    {
        pos_x: 250,
        pos_y: 250,
    },
        170,
        Math.PI * 3/4,
        Math.PI * 5/4,
    );

    draw_text(draw_ctx, "hello", {
        pos_x: 400,
        pos_y: 100,
    }, {
        font: "3em monospace",
        textAlign: "center",
        fillStyle: "purple",
        strokeStyle: "black",
        lineWidth: "3",
    });
    
    draw_line(draw_ctx, {
        pos_x1: 250,
        pos_y1: 250,
        pos_x2: 400,
        pos_y2: 400,
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

    draw_rect(draw_ctx);
}

function draw_test_clock(draw_ctx) {
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
    const numbers_radius = circle_dim.radius * 90 * 0.01;
    draw_circle(draw_ctx, {...circle_dim, radius: numbers_radius}, {
        fillStyle: "white",
        strokeStyle: "black",
    });
   
    let rotating_point = {...center_coord};

    draw_circle_slice(
        draw_ctx,
        center_coord,
        circle_dim.radius,
        angle_in_12 * 10,
        3 * angle_in_12,
    {
        fillStyle: "lightgray",
        strokeStyle: "red",
        lineWidth: "6",
        lineCap: "round",
        lineJoin: "round",
    });

    for (let i=1; i<=12; i += 1) {
        rotating_point = rotate_point(center_coord, numbers_radius, current_angle);

        draw_clock_text(draw_ctx, `${i}`, {
            center: center_coord,
            angle: current_angle,
            radius: numbers_radius,
        }, {
            font: "2em monospace",
            // textAlign: "center",
            // textBaseline: "middle",
        }, "black");

        current_angle += angle_in_12;
    }
}
