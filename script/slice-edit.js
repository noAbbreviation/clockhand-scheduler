function init_slice_edit_form() {
    const form = document.querySelector("#slice-edit-form");
    const draw_ctx = document.querySelector("#slice-edit #submenu-canvas").getContext("2d");
    
    form.draw_ctx = draw_ctx;
    form.context = {};

    const edit_select = form.querySelector("select");
    const starting_options = create_new_edit_options(get_globals().slices);
    for (const option of starting_options) {
        edit_select.appendChild(option);
    }

    edit_select.addEventListener("input", () => {
        const inputs_field = document.querySelector("#slice-edit #inputs-field");
        inputs_field.disabled = false;
    });
    
    const edit_inputs = form.querySelectorAll("input");
    for (const input of edit_inputs) {
        input.addEventListener("input", () => console.log("here"));

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
