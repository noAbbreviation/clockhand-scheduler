function bind_slice_add_form() {
    const form = document.querySelector(".popups #slice-add-form");
    const draw_ctx = document.querySelector("#slice-add #submenu-canvas").getContext("2d");
    
    form.draw_ctx = draw_ctx;
    form.context = {};
    
    const form_inputs = form.querySelectorAll("input");
    for (const input of form_inputs) {
        input.addEventListener("input", input_change_slice_add);
        
        input.draw_ctx = draw_ctx;
        input.form_store = form.context;
        form.context[input.id] = input.value; 
    }

    const submit_button = document.querySelector("#slice-add-submit-button");
    submit_button.addEventListener("click", click_submit_slice_add);        
    submit_button.context = form.context;
}

function click_submit_slice_add(event) {
    const globals = get_globals();
    
    event.preventDefault();
    
    const slices = globals.slices;
    const new_slice = {...event.target.context};
    slices.push(new_slice);
    
    const dialog = document.querySelector("dialog#slice-add"); 
    dialog.close();

    render_main_canvas();
}


function input_change_slice_add(event) {
    const element = event.target;
    const new_value = element.value;

    element.form_store[element.id] = new_value;

    if (new_value.includes(":")) {
        const time_angle = get_angle_from_time(new_value);
        const center = {
            pos_x: 250,
            pos_y: 250,
        };
        const rotated_point = rotate_point(center, 230, time_angle);

        draw_clock_bg(element.draw_ctx);
        draw_line(element.draw_ctx, combine_points(center, rotated_point));
        draw_clock_texts(element.draw_ctx);
    }
    draw_new_slice(element.draw_ctx, element.form_store);
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

function draw_new_slice(draw_ctx, form_store) {
    const global = get_globals().clock_circle_style;

    if (form_store.time_start === "" || form_store.time_end === "" || form_store.slice_color === "") {
        return;
    }
    const start_angle = get_angle_from_time(form_store.time_start);
    const end_angle = get_angle_from_time(form_store.time_end);
    const current_slices = get_globals().slices;

    draw_clock_slices(draw_ctx, current_slices, true);
    draw_circle_slice(draw_ctx, global.center, global.circle_radius, start_angle, end_angle, {
        lineWidth: "7",
        strokeStyle: form_store.slice_color,
    });
    draw_clock_texts(draw_ctx);
}

function draw_clock_slices(draw_ctx, slices, remove_text_flag) {
    const global = get_globals().clock_circle_style;

    clear_canvas(draw_ctx);
    draw_clock_bg(draw_ctx);
    for (const slice of slices) {
        const start_angle = get_angle_from_time(slice.time_start);
        const end_angle = get_angle_from_time(slice.time_end);

        draw_circle_slice(draw_ctx, global.center, global.circle_radius, start_angle, end_angle, {
            lineWidth: "7",
            strokeStyle: slice.slice_color,
        });
    }
    draw_clock_dot(draw_ctx);

    if (!remove_text_flag) {
        draw_clock_texts(draw_ctx);
    }
}
