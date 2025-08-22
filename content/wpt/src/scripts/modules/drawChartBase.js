const drawCharBase = (ctx, w, h) => {

    ctx.moveTo(0, 0);
    ctx.lineTo(0, h);
    ctx.moveTo(0,h);
    ctx.lineTo(w,h);
    ctx.stroke();
}

export default drawCharBase;