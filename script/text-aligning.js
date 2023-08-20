function get_text_bounding_box(draw_ctx, text, font) {
    draw_ctx.font = font;
    const m = draw_ctx.measureText(text);

    const height = Number(m.actualBoundingBoxAscent) + Number(m.actualBoundingBoxDescent);
    const width = Number(m.actualBoundingBoxRight) - Number(m.actualBoundingBoxLeft);

    return { width, height };
}

function draw_clock_text(
    draw_ctx,
    text,
    rotation_stat = {
        center: {
            pos_x: 10,
            pos_y: 10,
        },
        angle: Math.PI,
        radius: 10,
    },
    style = {
        font: "30px serif",
        textAlign: "center",
        textBaseline: "middle",
    },
    fillStyle = "rgb(255,255,255)"
) {
    const box = get_text_bounding_box(draw_ctx, text, style.font);
    let rotated_point = rotate_point(rotation_stat.center, rotation_stat.radius, rotation_stat.angle);

    rotated_point = {
        pos_x: rotated_point.pos_x - box.width/2,
        pos_y: rotated_point.pos_y + box.height/2,
    };

    draw_text(draw_ctx, text, rotated_point, style, fillStyle);
}
