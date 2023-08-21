function bind_slice_add_form() {
    const form = document.querySelector(".popups #slice-add-form");
    form.context = {};

    const form_store = form.context;
    const time_start = form.querySelector("#time_start");
    const time_end = form.querySelector("#time_end");
    const slice_color = form.querySelector("#slice_color");

    time_start.addEventListener("input", (event) => {
        form_store.time_start = event.target.value;
        console.log(form.context.time_start);
    });

    time_end.addEventListener("input", (event) => {
        form_store.time_end = event.target.value;
        console.log(form.context.time_start);
    });

    slice_color.addEventListener("input", (event) => {
        form_store.slice_color = event.target.value;
        console.log(form.context.slice_color);
    });
}
