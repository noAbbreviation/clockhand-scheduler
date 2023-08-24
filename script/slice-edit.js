function init_slice_edit_form() {
    const form = document.querySelector("#slice-edit-form");
    const draw_ctx = document.querySelector("#slice-edit #submenu-canvas").getContext("2d");
    
    form.draw_ctx = draw_ctx;
    form.context = {};

    const edit_select = form.querySelector("select");
    edit_select.draw_ctx = draw_ctx;
    edit_select.slice_index = -1;

    const starting_options = create_new_edit_options(get_globals().slices);
    for (const option of starting_options) {
        edit_select.appendChild(option);
    }

    edit_select.addEventListener("input", input_select_edit);
    
    const edit_inputs = form.querySelectorAll("input");
    for (const input of edit_inputs) {
        input.addEventListener("input", input_slice_edit);

        input.draw_ctx = draw_ctx;
        input.form_store = form.context;
    }
}

function create_new_edit_options(slices) {
    const option = document.createElement("option");
    const options = [];

    option.innerText = "--select a slice--";
    option.value = "";
    options.push(option);

    for (let i=0; i<slices.length; i++) {
        const slice = slices[i];

        const new_option = option.cloneNode();
        new_option.innerText = `${slice.time_start} to ${slice.time_end}`;
        new_option.value = i;

        options.push(new_option);
    }
    return options;
}

function input_select_edit(event) {
    const inputs_field = document.querySelector("#slice-edit #inputs-field");
    inputs_field.disabled = false;

    const element = event.target;
    const draw_ctx = element.draw_ctx;
    
    const slices = get_globals().slices;
    const selected_value = element.value;
    let slice_index = element.slice_index;
    
    if (selected_value !== "") {
        if (element.slice_index !== -1) {
            slices[slice_index].selected = false;
        }

        element.slice_index = selected_value;
        slices[element.slice_index].selected = true;
    } else if (slice_index !== -1) {
        slices[slice_index].selected = false;
    }
    
    draw_clock_slices(draw_ctx, slices);
}

function input_slice_edit(event) {
    const element = event.target;
    const new_value = element.value;

    element.form_store[element.id] = new_value;

    const draw_ctx = element.draw_ctx;
    const form_store = element.form_store;
    const slices = get_globals().slices;
    
    draw_clock_slices(draw_ctx, slices);
}
