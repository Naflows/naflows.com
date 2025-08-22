function DrawChart(ctx, humors) {
    const width = 100;
    const height = 100;
    const radius = 50;
    const colors = [
        "red", "blue", "green", "yellow", "purple"
    ];
    const total = humors.reduce((acc, val) => acc + val, 0);
    let startAngle = 0;
    let endAngle = 0;
    humors.forEach((humor, index) => {
        endAngle = startAngle + (humor / total) * Math.PI * 2;
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, radius, startAngle, endAngle);
        ctx.lineTo(width / 2, height / 2);
        ctx.fillStyle = colors[index];
        ctx.fill();
        startAngle = endAngle;
    });
}

const State1 = (
    canvas,
    project
) => {
    if (canvas) {
        console.log("State1")
        console.log(project)
    
        const ctx = canvas.getContext('2d');
    
        const written = project.stats.total;
        const length = parseInt(project["length"]);
            
    
        let total = 0;
        const data = [ written, length ];
        data.forEach((i) => total+=i);
        const colors = [
            getComputedStyle(document.body).getPropertyValue("--app-second-hue"),
            getComputedStyle(document.body).getPropertyValue("--app-main-hue")
        ];
        let angle = { start : 0, end : 0 };
    
        for (var i = 0; i < data.length; i++) {
            ctx.fillStyle = colors[i];
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2, canvas.height / 2);
            ctx.arc(
                canvas.width / 2,  // x
                canvas.height / 2, // y
                canvas.height / 2, // radius
                angle.end,           // startingAngle (radians)
                angle.end + Math.PI * 2 * (data[i] / total), // endingAngle (radians)
                 false // antiClockwise (boolean)
            );
            ctx.lineTo(canvas.width / 2, canvas.height / 2);
            ctx.fill();
            angle.end += Math.PI * 2 * (data[i] / total);
        }
    }
};

export default State1;