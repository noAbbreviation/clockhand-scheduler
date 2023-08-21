function bind_slice_add_form() {
    const form = document.querySelector(".popups #slice-add-form");
    form.context = {};

    const form_inputs = form.querySelectorAll("input");
    for (const input of form_inputs) {
        input.addEventListener("input", input_change_slice_add);
    }
}

function input_change_slice_add(event) {
    const element = event.target;
    const new_value = element.value;

    let form_store = element.parentElement; 
    while (form_store.nodeName !== undefined && form_store.nodeName.toLowerCase() !== "form") {
        form_store = form_store.parentElement;
    }

    form_store.context[element.id] = new_value;
    console.log(form_store.context);
}
