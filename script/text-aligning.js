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

function combine_points(point1 = {
    pos_x: 10,
    pos_y: 10,
}, point2 = {
    pos_x: 20,
    pos_y: 20,
}) {
    return {
        pos_x1: point1.pos_x,
        pos_y1: point1.pos_y,
        pos_x2: point2.pos_x,
        pos_y2: point2.pos_y,
    };
}

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
        fillStyle: "rgb(255,255,255)",
        textAlign: "center",
        textBaseline: "middle",
    }
) {
    const HEIGHT_FIX_RATIO = 3/2;

    const box = get_text_bounding_box(draw_ctx, text, style.font);
    const text_center = {
        width: box.width/2,
        height: box.height/2,
    }

    const text_radius = Math.sqrt(text_center.width**2 + text_center.height**2);
    let rotated_point = rotate_point(rotation_stat.center, rotation_stat.radius - text_radius * Math.SQRT1_2, rotation_stat.angle);

    rotated_point = {
        pos_x: rotated_point.pos_x - text_center.width,
        pos_y: rotated_point.pos_y + text_center.height * HEIGHT_FIX_RATIO,
    };

    draw_text(draw_ctx, text, rotated_point, style);
}
