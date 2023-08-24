function init_slice_edit_form() {
    const form = document.querySelector("#slice-edit-form");
    const draw_ctx = document.querySelector("#slice-edit #submenu-canvas").getContext("2d");
    
    form.draw_ctx = draw_ctx;
    form.context = {};

    const edit_select = form.querySelector("select");
    edit_select.draw_ctx = draw_ctx;
    edit_select.form_store = form.context;
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

    const submit_button = form.querySelector("#slice-edit-submit-button");
    submit_button.form_context = form.context;
    submit_button.addEventListener("click", click_submit_slice_edit);
}

function click_submit_slice_edit(event) {
    event.preventDefault();

    const element = event.target;
    const edited_slice = {...element.form_context, selected: false};
    const slice_index = document.querySelector("#slice-to-edit").value;

    const old_slice = get_globals().slices[slice_index];
    for (const prop in edited_slice) {
        old_slice[prop] = edited_slice[prop];
    }

    const dialog = document.querySelector("dialog#slice-edit"); 
    dialog.close();

    render_main_canvas();
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

        const slice = slices[element.slice_index];
        const form = document.querySelector("#slice-edit-form");
        for (const prop in slice) {
            const input = form.querySelector(`input[id="${prop}"]`);
            
            if (input !== null && prop != "slice_color") {
                input.value = slice[prop];
            }
        }
        const slice_color_input = form.querySelector('input[id="slice_color"]');
        slice_color_input.value = rgb_to_hex(slice.slice_color);
        
    } else if (slice_index !== -1) {
        slices[slice_index].selected = false;

        inputs_field.disabled = true;
        // todo: add reset here too?
    }
    
    const current_slice = slices[element.slice_index];
    const form_store = element.form_store;
    for (const prop in current_slice) {
        form_store[prop] = current_slice[prop]; 
    }

    draw_clock_slices(draw_ctx, slices);
    draw_new_slice(draw_ctx, form_store);
}

function input_slice_edit(event) {
    const element = event.target;
    const new_value = element.value;

    const form_store = element.form_store;
    form_store[element.id] = new_value;

    const draw_ctx = element.draw_ctx;
    const slices = get_globals().slices;
    
    draw_clock_slices(draw_ctx, slices);
    draw_new_slice(draw_ctx, form_store);
}

// solution on github btw
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
