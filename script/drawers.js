function draw_rect(
    draw_ctx,
    dimensions = {
        pos_x: 10,
        pos_y: 10, 
        width: 100, 
        height: 100, 
    },
    fill_style = "rgb(0,0,0)"
) {
    if (draw_ctx === null) {
        return;
    }

    draw_ctx.fillStyle = fill_style;
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
    },
    fillStyle = "rgb(255,255,255)"
) {
    draw_ctx.beginPath();
    draw_ctx.textAlign = style.textAlign;
    draw_ctx.textBaseline = style.textBaseline;
    draw_ctx.fillStyle = fillStyle;
    draw_ctx.font = style.font;
    draw_ctx.fillText(text, dimensions.pos_x, dimensions.pos_y);
    
    draw_ctx.stroke();
}

function draw_circle(
    draw_ctx,
    dimensions = {
        pos_x: 10,
        pos_y: 10,
        radius: 10,
    },
    colors = {
        fillStyle: "rgb(255,255,255)",
        strokeStyle: "rgb(0,0,0)",
    }
) {
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

    draw_ctx.fillStyle = colors.fillStyle;
    draw_ctx.fill();
    
    draw_ctx.strokeStyle = colors.strokeStyle;
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
        lineWidth: "30",
        lineCap: "round",
        lineJoin: "round",
        strokeStyle: "rgb(0,0,0)"
    }
) {
    draw_ctx.beginPath();
    draw_ctx.lineWidth = style.lineWidth;
    draw_ctx.lineCap = style.lineCap;
    draw_ctx.lineJoin = style.lineJoin;
    draw_ctx.strokeStyle = style.strokeStyle;

    draw_ctx.moveTo(dimensions.pos_x1, dimensions.pos_y1);
    draw_ctx.lineTo(dimensions.pos_x2, dimensions.pos_y2);
    draw_ctx.stroke();
}

function rotate_point(
    point = {
        pos_x: 10,
        pos_y: 10,
    },
    radius,
    angle,
) {
    const x_offset = radius * Math.cos(angle);
    const y_offset = radius * Math.sin(angle);

    return {
        pos_x: point.pos_x + x_offset,
        pos_y: point.pos_y + y_offset,
    };
}
