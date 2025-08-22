

const drawArea = (context, padding, height, areaPoints) => {
    context.fillStyle =getComputedStyle(document.documentElement).getPropertyValue("--app-text-color");
    context.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue("--app-text-color");
    context.beginPath();
    context.moveTo(padding, height - padding);
    areaPoints.forEach(([x, y], index) => {
        context.lineTo(x, y);
        if (index === areaPoints.length - 1) {
            context.lineTo(x, height - padding);
        }
    });
    context.closePath();
    context.fill();
};

export default drawArea;