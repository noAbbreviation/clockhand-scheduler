function bind_slice_add_button() {
    const form = document.querySelector(".popups #slice-add-form");

    form.context = {};
    const form_store = form.context;

    const time_start = form.querySelector("#time_start");
    time_start.addEventListener("input", (event) => {
        form_store.time_start = event.target.value;
        console.log(form.context.time_start);
    });
}
