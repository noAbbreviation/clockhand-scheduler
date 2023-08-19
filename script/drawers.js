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
    },
    fillStyle = "rgb(255,255,255)"
) {
    draw_ctx.beginPath();
    draw_ctx.textAlign = style.textAlign;
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
