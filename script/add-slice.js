function get_angle_on_hour(num) {
    const starting_angle = 10 * ANGLE_IN_12;
    return starting_angle + (Math.floor(num) * ANGLE_IN_12);
}

function draw_starting_clock(draw_ctx) {
    const center = {
        pos_x: 250,
        pos_y: 250,
    };
    const circle_style = {
        lineWidth: "5",
        strokeStyle: "rgb(175, 175, 175)",
    };
    const clock_text_style = {
        fillStyle: "rgb(49, 49, 49)",
    };
    const dot_style = {
        lineWidth: "3",
        strokeStyle: "black",
    };
    const circle_radius = 230;
    const text_radius = circle_radius * 88 * 0.01;

    draw_circle(draw_ctx, {...center, radius: circle_radius}, circle_style);
    draw_circle(draw_ctx, {...center, radius: 1}, dot_style);

    for (let i=1; i<=12; i++) {
        draw_clock_text(draw_ctx, `${i}`, {
            center,
            angle: get_angle_on_hour(i),
            radius: text_radius,
        }, clock_text_style);
    }
}
