function init_slice_edit_form() {
    const form = document.querySelector("#slice-edit-form");
    const draw_ctx = document.querySelector("#slice-edit #submenu-canvas").getContext("2d");
    
    const form_context = {};
    const slice_info = {};
    form_context.slice_info = slice_info;
    form.draw_ctx = draw_ctx;
    form.context = form_context;

    clear_form(form);
    form.addEventListener("focusin", focus_in_slice_edit);
    form.addEventListener("focusout", focus_out_slice_edit);

    const edit_select = form.querySelector("select");
    edit_select.draw_ctx = draw_ctx;
    edit_select.form_context = form_context;
    edit_select.addEventListener("input", input_slice_edit_select);
    form_context.slice_index = -1;
    
    const edit_inputs = form.querySelectorAll("input");
    for (const input of edit_inputs) {
        input.addEventListener("input", input_slice_edit);

        input.draw_ctx = draw_ctx;
        input.form_context = form_context;
    }

    const submit_button = form.querySelector("#slice-edit-submit-button");
    submit_button.addEventListener("click", click_submit_slice_edit);

    const delete_button = form.querySelector("#slice-delete-submit-button");
    delete_button.addEventListener("click", click_submit_slice_delete);

    const cancel_button = form.querySelector(".cancel-button");
    cancel_button.addEventListener("click", click_cancel_slice_edit);

    for (const button of form.querySelectorAll("button")) {
        button.draw_ctx = draw_ctx;
        button.form_context = form_context;
    }
}

function click_submit_slice_edit(event) {
    event.preventDefault();

    const element = event.target;
    const edited_slice = element.form_context.slice_info;
    const slice_index = document.querySelector("#slice-to-edit").value;

    const old_slice = get_globals().slices[slice_index];
    for (const prop in edited_slice) {
        old_slice[prop] = edited_slice[prop];
    }
    old_slice.selected = false;
    get_globals().slices.sort(compare_time_fn);

    const dialog = document.querySelector("dialog#slice-edit"); 
    dialog.close();

    render_main_canvas();
}

function click_submit_slice_delete(event) {
    event.preventDefault();
    
    if (!confirm("Are you sure you want to delete the selected slice?")) {
        return;
    }

    const slice_index = document.querySelector("#slice-to-edit").value;
    const slices = get_globals().slices;  
    slices.splice(slice_index, 1);
    
    const dialog = document.querySelector("dialog#slice-edit"); 
    dialog.close();
    
    render_main_canvas();
}

function click_cancel_slice_edit(event) {
    event.preventDefault();

    const slices = get_globals().slices;
    if (slices.length !== 0 && !confirm("Are you sure you want to cancel changes?")) {
        return;
    }

    const dialog = document.querySelector("dialog#slice-edit"); 
    dialog.close();    
}


function create_slice_edit_options(slices) {
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

function focus_in_slice_edit(event) {
    const element = event.target;
    const draw_ctx = element.draw_ctx;
    const slice_info = element.form_context.slice_info;
    
    slice_info.selected = true;
    draw_with_new_slice(draw_ctx, slice_info);
}

function focus_out_slice_edit(event) {
    const element = event.target;
    const draw_ctx = element.draw_ctx;
    const slice_info = element.form_context.slice_info;

    slice_info.selected = false;
    draw_with_new_slice(draw_ctx, slice_info);
}

function input_slice_edit_select(event) {
    const inputs_field = document.querySelector("#slice-edit #inputs-field");
    inputs_field.disabled = false;
    
    const element = event.target;
    const draw_ctx = element.draw_ctx;
    
    const slices = get_globals().slices;
    const selected_value = element.value;

    let slice_index = element.form_context.slice_index;
    
    if (selected_value !== "") {
        if (slice_index !== -1) {
            slices[slice_index].selected = false;
        }
        slice_index = selected_value;
        slices[slice_index].selected = true;

        const slice = slices[slice_index];
        const form = document.querySelector("#slice-edit-form");
        for (const prop in slice) {
            const input = form.querySelector(`input[id="${prop}"]`);
            
            if (input !== null && prop != "slice_color") {
                input.value = slice[prop];
            }
        }
        const slice_color_input = form.querySelector('input[id="slice_color"]');
        slice_color_input.value = rgb_to_hex(slice.slice_color);
        element.form_context.slice_index = selected_value;
        
    } else if (slice_index !== -1) {
        slices[slice_index].selected = false;
        
        inputs_field.disabled = true;
        const form = document.querySelector("#slice-edit-form");
        clear_form(form);
    }
    
    const current_slice = slices[slice_index];
    const slice_info = element.form_context.slice_info;
    for (const prop in current_slice) {
        slice_info[prop] = current_slice[prop];
    }

    draw_with_new_slice(draw_ctx, slice_info);
}

function input_slice_edit(event) {
    const element = event.target;
    const new_value = element.value;

    const slice_info = element.form_context.slice_info;
    slice_info[element.id] = new_value;

    const draw_ctx = element.draw_ctx;    
    draw_with_new_slice(draw_ctx, slice_info);
}

function clear_form(form_element) {
    for (const input of form_element.querySelectorAll("input:not([type='color'])")) {
        input.value = "";
    }
    const color_form = form_element.querySelector("input[type='color']");
    color_form.value = default_slice.slice_color;
}
