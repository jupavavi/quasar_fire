export const fillCircle = (ctx, x, y, size = 4) => {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.fill();
};

export const strokeCircle = (ctx, x, y, size = 4) => {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.stroke();
};

export const renderSatelite = (ctx, { position, distance = 0 }, time = 0) => {
    ctx.fillStyle = "#FFFFFF";
    ctx.strokeStyle = "#DDDDDD";
    fillCircle(ctx, position[0], position[1], 16);
    strokeCircle(ctx, position[0], position[1], distance);
};

export const renderEmissor  = (ctx, position, time = 0) => {
    ctx.fillStyle = "#00FF00";
    fillCircle(ctx, position[0], position[1], 16);
}