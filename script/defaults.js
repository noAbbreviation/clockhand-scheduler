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
    const center = {
        pos_x: 250,
        pos_y: 250,
    };
    const circle_style = {
        lineWidth: "5",
        strokeStyle: "rgb(175, 175, 175)",
    };
    const dot_style = {
        lineWidth: "3",
        strokeStyle: "black",
    };
    const circle_radius = 230;
    
    draw_circle(draw_ctx, {...center, radius: circle_radius}, circle_style);
    draw_circle(draw_ctx, {...center, radius: 1}, dot_style); 
}

function draw_clock_texts(draw_ctx) {
    const center = {
        pos_x: 250,
        pos_y: 250,
    };
    const circle_radius = 230;
    const text_radius = circle_radius * 88 * 0.01;
    const clock_text_style = {
        fillStyle: "rgb(49, 49, 49)",
    };

    for (let i=1; i<=12; i++) {
        draw_clock_text(draw_ctx, `${i}`, {
            center,
            angle: get_angle_on_hour(i),
            radius: text_radius,
        }, clock_text_style);
    }
}
