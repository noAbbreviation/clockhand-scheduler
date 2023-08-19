function draw_rect(
    draw_ctx,
    dimensions = {
        pos_x: 10,
        pos_y: 10, 
        width: 100, 
        height: 100, 
    },
    fill_style = "rgb(0,0,0)"
) {
    if (draw_ctx === null) {
        return;
    }

    draw_ctx.fillStyle = fill_style;
    draw_ctx.fillRect(dimensions.pos_x, dimensions.pos_y, dimensions.width, dimensions.height);
}

function draw_text(
    draw_ctx,
    style = {
        font: "20px serif",
        textAlign: "center",
    },
    colors = {
        fillStyle: "rgb(255,255,255)",
        strokeStyle: "rgb(0,0,0)",
    }
) {

}
