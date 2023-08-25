function unwrap_parens(string_with_parens) {
    return string_with_parens.split("(")[1].split(")")[0];
}

function add_rbg_transparency(rgb_string, opacity = 0.5) {
    const inner_args = unwrap_parens(rgb_string);

    return `rgba(${inner_args}, ${opacity})`;
}

// got this on stackoverflow
function hex_to_rgb(hex_string) {
    if (!hex_string.includes("#")) {
        return hex_string;
    }

    const numbers = hex_string.split("#")[1];
    const SLICE_LENGTH = 2;

    const [r, gb] = [numbers.slice(0,SLICE_LENGTH), numbers.slice(SLICE_LENGTH)];
    const [g, b] = [gb.slice(0,SLICE_LENGTH), gb.slice(SLICE_LENGTH)];

    const red = parseInt(r, 16);
    const green = parseInt(g, 16);
    const blue = parseInt(b, 16);

    return `rgb(${red},${green},${blue})`;
}

function color_to_transparent(color_string, opacity = 0.5) {
    return add_rbg_transparency(hex_to_rgb(color_string, opacity));
}

// solution on stackoverflow btw
// Question title: `RGB to hex and hex to RGB`
function component_to_hex(component) {
    let hex = Number(component).toString(16);
    
    if (hex.length === 1) {
        hex = "0" + hex;
    }
    return hex;
}

function rgb_to_hex(rgb_string) {
    if (!rgb_string.includes("rgb")) {
        return rgb_string;
    }

    const [r, g, b] = unwrap_parens(rgb_string).split(",");
    return "#" + component_to_hex(r) + component_to_hex(g) + component_to_hex(b);
}
