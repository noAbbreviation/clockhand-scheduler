const ANGLE_IN_12 = Math.PI / 6;

const rounded_line_style = {
    lineCap: "round",
    lineJoin: "round",
};

const defaults = {
    ...rounded_line_style,
    
    lineWidth: "2",
    font: "2.5em monospace",
    fillStyle: "white",
    strokeStyle: "black",
    textAlign: "left",
    textBaseline: "bottom",
}

function apply_defaults(draw_ctx) {
    for (const prop in defaults) {
        draw_ctx[prop] = defaults[prop];
    }
}

function get_angle_on_hour(num) {
    const starting_angle = 9 * ANGLE_IN_12;
    return starting_angle + (Math.floor(num) * ANGLE_IN_12);
}

function get_angle_on_minute(num) {
    const MINUTES_ON_HOUR = 60;
    return (Math.floor(num) / MINUTES_ON_HOUR) * ANGLE_IN_12;
}


function draw_starting_clock(draw_ctx) {
    draw_clock_bg(draw_ctx);
    draw_clock_texts(draw_ctx);
}

function draw_clock_bg(draw_ctx) {
    const global = get_globals().clock_circle_style;
    
    draw_circle(draw_ctx, {...global.center, radius: global.circle_radius}, global.circle_style);
    draw_circle(draw_ctx, {...global.center, radius: 1}, global.dot_style); 
}

function draw_clock_texts(draw_ctx) {
    const global = get_globals().clock_texts_style;

    for (let i=1; i<=12; i++) {
        draw_clock_text(draw_ctx, `${i}`, {
            center: global.center,
            angle: get_angle_on_hour(i),
            radius: global.text_radius,
        }, global.clock_text_style);
    }
}
