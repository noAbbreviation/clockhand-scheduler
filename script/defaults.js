const ANGLE_IN_12 = Math.PI / 6;

const rounded_line_style = {
    lineCap: "round",
    lineJoin: "round",
};

const defaults = {
    ...rounded_line_style,
    
    lineWidth: "2",
    font: "2.5em monospace",
    fillStyle: "rgb(255,255,255)",
    strokeStyle: "rgb(0,0,0)",
    textAlign: "left",
    textBaseline: "bottom",
}

const lerper_color = "rgb(255,255,255)";

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
    clear_canvas(draw_ctx);
    draw_clock_bg(draw_ctx);
    draw_clock_texts(draw_ctx);
}

function clear_canvas(draw_ctx) {
    const canvas = draw_ctx.canvas;
    draw_ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw_clock_bg(draw_ctx) {
    const global = get_globals().clock_circle_style;
    draw_circle(draw_ctx, {...global.center, radius: global.circle_radius}, global.circle_style);
}

function draw_clock_dot(draw_ctx) {
    const global = get_globals().clock_circle_style;
    draw_circle(draw_ctx, {...global.center, radius: 1}, global.outer_dot_style);
    draw_circle(draw_ctx, {...global.center, radius: 1}, global.inner_dot_style);
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

// TODO: Add more extensive comparison
function compare_time_fn(a, b) {
    let [a_hour, a_minute] = get_time_array(a.time_start);
    let [b_hour, b_minute] = get_time_array(b.time_start);

    a_hour = Math.abs(a_hour - 6) % 12;
    b_hour = Math.abs(b_hour - 6) % 12;

    if (a_hour !== b_hour) {
        return b_hour - a_hour;
    }

    return b_minute - a_minute;
}

function lerp_colors(from_color, to_color, percent = 0.85) {
    const color1 = from_color.includes("#") ? hex_to_rgb(from_color) : from_color;
    const color2 = to_color.includes("#") ? hex_to_rgb(to_color) : to_color;

    const rgb1 = unwrap_parens(color1).split(",");
    const rgb2 = unwrap_parens(color2).split(",");
    const lerped_color = [];

    for (let i=0; i<3; i++) {
        const value1 = Number(rgb1[i]);
        const value2 = Number(rgb2[i]);

        const buffer = value2 - value1;
        lerped_color.push(Math.floor(value1 + buffer * Number(percent)));
    }

    return `rgb(${lerped_color.join(",")})`
}
