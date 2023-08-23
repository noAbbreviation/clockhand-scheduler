function init_slice_edit_form() {
    const form = document.querySelector("#slice-edit-form");
    const draw_ctx = document.querySelector("#slice-edit #submenu-canvas").getContext("2d");
    
    form.draw_ctx = draw_ctx;
    form.context = {};

    const edit_select = form.querySelector("select");
    edit_select.addEventListener("input", (event) => {
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
