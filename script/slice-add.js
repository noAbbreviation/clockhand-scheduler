function init_slice_add_form() {
    const form = document.querySelector(".popups #slice-add-form");
    const draw_ctx = document.querySelector("#slice-add #submenu-canvas").getContext("2d");
    
    form.draw_ctx = draw_ctx;
    form.context = {};
    
    const form_inputs = form.querySelectorAll("input");
    for (const input of form_inputs) {
        input.addEventListener("input", input_change_slice_add);
        input.addEventListener("blur", blur_slice_add);
        input.addEventListener("focusin", () => {}); // TODO!: Add triggers here (for selected)
        input.addEventListener("focusout", () => {}); // TODO!
        
        input.draw_ctx = draw_ctx;
        input.form_store = form.context;
        form.context[input.id] = input.value; 
    }
    form.context.selected = true;

    const submit_button = document.querySelector("#slice-add-submit-button");
    submit_button.addEventListener("click", click_submit_slice_add);
    submit_button.context = form.context;
}

function click_submit_slice_add(event) {
    event.preventDefault();

    const globals = get_globals();
    const slices = globals.slices;
    const new_slice = {...event.target.context, selected: false};
    slices.push(new_slice);
    slices.sort(compare_time_fn);
    
    const dialog = document.querySelector("dialog#slice-add"); 
    dialog.close();

    render_main_canvas();
}

function input_change_slice_add(event) {
    const element = event.target;
    const new_value = element.value;
    const draw_ctx = element.draw_ctx;
    const form_store = element.form_store;
    const slices = get_globals().slices;

    form_store[element.id] = new_value;
    form_store.selected = true;

    draw_clock_slices(draw_ctx, slices);
    draw_with_new_slice(draw_ctx, form_store);
}

function blur_slice_add(event) {
    const element = event.target;
    const draw_ctx = element.draw_ctx;
    const form_store = element.form_store;
    const slices = get_globals().slices;

    form_store.selected = false;
    
    draw_with_new_slice(draw_ctx, form_store);
}

function get_time_array(time_str) {
    let [hour, minute] = time_str.split(":");
    return [Number(hour) % 24, Number(minute)];
}

function get_angle_from_time(time) {
    let hour, minute;

    if (typeof time === "string") {
        [hour, minute] = get_time_array(time);
    } else {
        [hour, minute] = time;
    }
    return get_angle_on_hour(hour) + get_angle_on_minute(minute);
}

function draw_with_new_slice(draw_ctx, form_store) {
    if (form_store.time_start === "" || form_store.time_end === "" || form_store.slice_color === "") {
        return;
    }
    const globals = get_globals();
    const current_slices = globals.slices;
    const clock_style = globals.clock_circle_style;
    const slice_style = globals.clock_slices_style;
    
    const start_angle = get_angle_from_time(form_store.time_start);
    const end_angle = get_angle_from_time(form_store.time_end);

    const colored_inner_stroke = {
        ...slice_style.inner_stroke,
        strokeStyle: color_to_transparent(form_store.slice_color, 0.1),
    };

    const outer_stroke = {...slice_style.outer_stroke};
    outer_stroke.fillStyle = lerp_colors(colored_inner_stroke.strokeStyle, lerper_color);

    if (form_store.selected) {
        for (let prop in outer_stroke) {
            if (prop === "fillStyle" || prop === "strokeStyle") {
                outer_stroke[prop] = color_to_transparent(outer_stroke[prop]);
            }
        }
    }

    draw_clock_slices(draw_ctx, current_slices, true);
    draw_circle_slice(
        draw_ctx,
        clock_style.center,
        clock_style.circle_radius,
        start_angle,
        end_angle,
        colored_inner_stroke,
        outer_stroke,
    );
    draw_clock_dot(draw_ctx);

    draw_clock_texts(draw_ctx);
}

function draw_clock_slices(draw_ctx, slices, remove_text_flag) {
    const globals = get_globals();
    const global = globals.clock_circle_style;
    const slice_style = globals.clock_slices_style;

    clear_canvas(draw_ctx);
    draw_clock_bg(draw_ctx);
    for (const slice of slices) {
        const start_angle = get_angle_from_time(slice.time_start);
        const end_angle = get_angle_from_time(slice.time_end);
        const lerped_color = lerp_colors(slice.slice_color, lerper_color);

        if (!slice.selected) {
            draw_circle_slice(
                draw_ctx,
                global.center,
                global.circle_radius,
                start_angle,
                end_angle,
                {...slice_style.inner_stroke, strokeStyle: slice.slice_color},
                {...slice_style.outer_stroke, fillStyle: lerped_color}
            );
        }
    }
    draw_clock_dot(draw_ctx);

    if (!remove_text_flag) {
        draw_clock_texts(draw_ctx);
    }
}

function unwrap_parens(string_with_parens) {
    return string_with_parens.split("(")[1].split(")")[0];
}

function add_rbg_transparency(rgb_string, opacity = 0.5) {
    const inner_args = unwrap_parens(rgb_string);

    return `rgba(${inner_args}, ${opacity})`;
}

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
