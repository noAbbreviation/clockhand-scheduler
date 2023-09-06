function init_slice_add_form() {
    const form = document.querySelector(".popups #slice-add-form");
    const draw_ctx = document.querySelector("#slice-add #submenu-canvas").getContext("2d");
    
    reset_form(form);
    form.addEventListener("focusin", focus_in_slice_add);
    form.addEventListener("focusout", focus_out_slice_add);
    
    const form_context = {};
    const slice_info = {};

    form.draw_ctx = draw_ctx;
    form.context = form_context;
    form.context.slice_info = slice_info;
    
    const form_inputs = form.querySelectorAll("input");
    for (const input of form_inputs) {
        input.addEventListener("input", input_change_slice_add);
        
        input.draw_ctx = draw_ctx;
        input.form_store = form_context;
        slice_info[input.id] = input.value;
    }
    slice_info.selected = true;

    const submit_button = document.querySelector("#slice-add-submit-button");
    submit_button.addEventListener("click", click_submit_slice_add);
    
    const cancel_button = form.querySelector(".cancel-button");
    cancel_button.addEventListener("click", click_cancel_slice_add);

    for (const button of form.querySelectorAll("button")) {
        button.draw_ctx = draw_ctx;
        button.form_store = form_context;
    }
}

function click_submit_slice_add(event) {
    event.preventDefault();

    const slices = get_globals().slices;
    const new_slice = event.target.form_store.slice_info;
    new_slice.selected = false;

    slices.push({...new_slice});
    slices.sort(compare_time_fn);
    
    const dialog = document.querySelector("dialog#slice-add"); 
    dialog.close();

    render_main_canvas();
}

function click_cancel_slice_add(event) {
    event.preventDefault();

    if (!confirm("Are you sure you want to cancel changes?")) {
        return;
    }

    const dialog = document.querySelector("dialog#slice-add");
    dialog.close();
}

function input_change_slice_add(event) {
    const element = event.target;
    const new_value = element.value;
    const draw_ctx = element.draw_ctx;
    const slice_info = element.form_store.slice_info;

    slice_info[element.id] = new_value;
    slice_info.selected = true;

    draw_with_new_slice(draw_ctx, slice_info);
}

function focus_in_slice_add(event) {
    const element = event.target;
    const draw_ctx = element.draw_ctx;
    const slice_info = element.form_store.slice_info;

    slice_info.selected = true;
    draw_with_new_slice(draw_ctx, slice_info);
}

function focus_out_slice_add(event) {
    const element = event.target;
    const draw_ctx = element.draw_ctx;
    const slice_info = element.form_store.slice_info;

    slice_info.selected = false;
    draw_with_new_slice(draw_ctx, slice_info);
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

function draw_with_new_slice(draw_ctx, slice_info) {
    if (slice_info.time_start == null || slice_info.time_end == null || slice_info.slice_color == null) {
        return
    }
    if (slice_info.time_start === "" || slice_info.time_end === "" || slice_info.slice_color === "") {
        return;
    }
    const globals = get_globals();
    const current_slices = globals.slices;
    const clock_style = globals.clock_circle_style;
    const slice_style = globals.clock_slices_style;
    
    const start_angle = get_angle_from_time(slice_info.time_start);
    const end_angle = get_angle_from_time(slice_info.time_end);

    const colored_inner_stroke = {
        ...slice_style.inner_stroke,
        strokeStyle: color_to_transparent(slice_info.slice_color, 0.1),
    };

    const outer_stroke = {...defaults, ...slice_style.outer_stroke};
    outer_stroke.fillStyle = lerp_colors(colored_inner_stroke.strokeStyle, base_color);

    if (slice_info.selected) {
        outer_stroke.fillStyle = color_to_transparent(outer_stroke.fillStyle);
        outer_stroke.strokeStyle = color_to_transparent(outer_stroke.strokeStyle);
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

function draw_clock_slices(draw_ctx, slices, remove_text_flag = false) {
    const globals = get_globals();
    const global = globals.clock_circle_style;
    const slice_style = globals.clock_slices_style;

    clear_canvas(draw_ctx);
    draw_clock_bg(draw_ctx);
    for (const slice of slices) {
        const start_angle = get_angle_from_time(slice.time_start);
        const end_angle = get_angle_from_time(slice.time_end);
        
        if (!slice.selected) {
            const lerped_color = lerp_colors(slice.slice_color, base_color);
            
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

function reset_form(form_element) {
    for (const prop in default_slice) {
        const input = form_element.querySelector(`#${prop}`);
        if (input === null) continue;

        input.value = default_slice[prop];
    }
}
