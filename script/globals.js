const globals = {};

globals.main_canvas = {};

globals.clock_circle_style = {
    center: {
        pos_x: 250,
        pos_y: 250,
    },
    circle_style: {
        lineWidth: "10",
        strokeStyle: "rgb(175, 175, 175)",
    },
    inner_dot_style: {
        lineWidth: "10",
        strokeStyle: "black",
    },
    outer_dot_style: {
        lineWidth: "15",
        strokeStyle: defaults.fillStyle,
    },
    circle_radius: 230,
};

globals.clock_texts_style = {
    center: globals.clock_circle_style.center,
    text_radius: globals.clock_circle_style.circle_radius * 88 * 0.01,
    clock_text_style: {
        fillStyle: "rgb(49, 49, 49)",
    },
};

globals.clock_slices_style = {
    inner_stroke: {
        lineWidth: "3",
    },
    outer_stroke: {
        lineWidth: "6",
        strokeStyle: "rgb(253, 255, 240)",
        fillStyle: "rgb(253, 253, 253)",
    }
};

globals.slices = [];
