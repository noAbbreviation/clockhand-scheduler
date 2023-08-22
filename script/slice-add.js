function bind_slice_add_form() {
    const form = document.querySelector(".popups #slice-add-form");
    let draw_ctx = document.querySelector("#slice-add #submenu-canvas").getContext("2d");

    form.draw_ctx = draw_ctx;
    form.context = {};

    const form_inputs = form.querySelectorAll("input");
    for (const input of form_inputs) {
        input.addEventListener("input", input_change_slice_add);

        input.draw_ctx = draw_ctx;
        input.form_store = form.context;
    }
}

function input_change_slice_add(event) {
    const element = event.target;
    const new_value = element.value;

    element.form_store[element.id] = new_value;
    console.log(element.form_store[element.id]);

    if (new_value.includes(":")) {
        const time_angle = get_angle_from_time(new_value);
        const center = {
            pos_x: 250,
            pos_y: 250,
        };
        const rotated_point = rotate_point(center, 230, time_angle);

        draw_line(element.draw_ctx, combine_points(center, rotated_point));
    }
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
