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
