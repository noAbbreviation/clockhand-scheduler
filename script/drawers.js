function draw_rect(
    draw_ctx,
    dimensions = {
        pos_x: 10,
        pos_y: 10, 
        width: 100, 
        height: 100, 
    },
    style = {
        fillStyle: "white",
        strokeStyle: "black",
        lineWidth: "5",
        lineCap: "round",
        lineJoin: "round",
    }
) {
    apply_with_defaults(draw_ctx, style);

    draw_ctx.fillRect(dimensions.pos_x, dimensions.pos_y, dimensions.width, dimensions.height);
}

function draw_text(
    draw_ctx,
    text,
    dimensions = {
        pos_x: 100,
        pos_y: 100,
    },
    style = {
        font: "30px serif",
        textAlign: "center",
        textBaseline: "middle",
        fillStyle: "rgb(255,255,255)",
    }
) {
    apply_with_defaults(draw_ctx, style);
    
    draw_ctx.beginPath();
    draw_ctx.fillText(text, dimensions.pos_x, dimensions.pos_y);
}

function draw_circle(
    draw_ctx,
    dimensions = {
        pos_x: 10,
        pos_y: 10,
        radius: 10,
    },
    style = {
        fillStyle: "rgb(255,255,255)",
        strokeStyle: "rgb(0,0,0)",
    }
) {
    apply_with_defaults(draw_ctx, style);

    draw_ctx.beginPath();
    draw_ctx.ellipse(
        dimensions.pos_x,
        dimensions.pos_y,
        dimensions.radius,
        dimensions.radius,
        0,
        0,
        2 * Math.PI
    );
    draw_ctx.fill();
    draw_ctx.stroke();
}

function draw_line(
    draw_ctx,
    dimensions = {
        pos_x1: 10,
        pos_y1: 10,
        pos_x2: 10,
        pos_y2: 10,
    },
    style = {
        lineWidth: "5",
        lineCap: "round",
        lineJoin: "round",
        strokeStyle: "rgb(0,0,0)",
    }
) {
    apply_with_defaults(draw_ctx, style);
    
    draw_ctx.beginPath();
    draw_ctx.moveTo(dimensions.pos_x1, dimensions.pos_y1);
    draw_ctx.lineTo(dimensions.pos_x2, dimensions.pos_y2);
    draw_ctx.stroke();
}

function draw_circle_slice(
    draw_ctx,
    center = {
        pos_x: 10,
        pos_y: 10,
    },
    radius,
    start_angle,
    end_angle,
    inner_stroke_style = {
        fillStyle: "white",
        strokeStyle: "black",
        lineWidth: "10",
        lineCap: "round",
        lineJoin: "round",
    },
    outer_stroke_style = {},
) {
    const fallback_style = {...inner_stroke_style, ...outer_stroke_style};
    apply_with_defaults(draw_ctx, fallback_style);

    const start_point = rotate_point(center, radius, start_angle);
    
    draw_ctx.beginPath();
    draw_ctx.moveTo(center.pos_x, center.pos_y);
    draw_ctx.lineTo(start_point.pos_x, start_point.pos_y);
    draw_ctx.arc(center.pos_x, center.pos_y, radius, start_angle, end_angle);
    draw_ctx.lineTo(center.pos_x, center.pos_y);

    draw_ctx.stroke();
    draw_ctx.fill();
    
    apply_with_defaults(draw_ctx, inner_stroke_style);
    draw_ctx.stroke();
}
