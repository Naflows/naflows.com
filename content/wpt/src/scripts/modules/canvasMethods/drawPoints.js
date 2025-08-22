const drawPoints = (
    ctx,
    padding,
    height,
    max,
    index,
    charWidth,
    ratio,
    dividerType
) => {
    const radius = 3;
    const x = padding + index * Math.min(charWidth, 5) + index * 2;
    const y = height - (dividerType / max) * height + padding;

    ctx.fillStyle = (ratio == null || ratio > 0) ? "rgba(64, 156, 36,1)" : "rgba(255,0,0,0.5)";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();

    return [x,y];
}

export default drawPoints;