

const drawArea = (ctx, padding, height, areaPoints) => {
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    areaPoints.forEach(([x, y], index) => {
        ctx.lineTo(x, y);
        if (index === areaPoints.length - 1) {
            ctx.lineTo(x, height - padding);
        }
    });
    ctx.closePath();
    ctx.fill();
};

export default drawArea;