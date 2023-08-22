function bind_slice_add_form() {
    const form = document.querySelector(".popups #slice-add-form");
    form.context = {};

    const form_inputs = form.querySelectorAll("input");
    for (const input of form_inputs) {
        input.addEventListener("input", input_change_slice_add);

        input.form_store = form.context;
    }
}

function input_change_slice_add(event) {
    const element = event.target;
    const new_value = element.value;

    element.form_store[element.id] = new_value;
    console.log(element.form_store[element.id]);
}

function get_time_array(time_str) {
    let [hour, minute] = time_str.split(":");
    return [Number(hour) % 24, Number(minute)];
}
