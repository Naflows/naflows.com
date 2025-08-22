import drawArea from "../../modules/canvasMethods/draw-area";
import drawCharBase from "../../modules/canvasMethods/draw-chart-base";
import drawPoints from "../../modules/canvasMethods/drawPoints";

const State2 = (
    canvas,
    project,
    setCanvasTimesHoverValues,
    canvasTimeType
) => {
    if (canvas) {
        canvas.addEventListener('mouseleave', () => {
            setCanvasTimesHoverValues({});
        });
        console.log("State2");
        console.log(project);
    
        const sessions = project.stats.sessions;
    
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.beginPath();
        const width = canvas.width;
        const height = canvas.height;
        
        const charWidth = width / sessions.length - 2;
    
        const getSeconds = (h,m) => {
            return h*3600 + m*60;
        }
        const maxSeconds = sessions.reduce((max, session) => {
            const seconds = getSeconds(parseInt(session.hours), parseInt(session.minutes));
            return seconds > max ? seconds : max;
        }, 0);
    
        drawCharBase(ctx,width,height); 
        const padding = 1; // Decrease the value of padding to create more space for the charts.
    
        const wordsGrow = [0];
        sessions.map((session, index) => {
            const s = getSeconds(parseInt(session.hours), parseInt(session.minutes));
    
            let x = padding + index *  Math.min(charWidth, 5) + index * 2;
            let y = height - (s / maxSeconds) * height + padding;
            let w = padding + Math.min(charWidth, 5);
            let h = (s / maxSeconds) * height - padding;
            
            if (canvasTimeType === "bars") {
                ctx.strokeStyle=getComputedStyle(document.documentElement).getPropertyValue("--app-text-color");
                ctx.lineWidth = 1;
                ctx.strokeRect(x, y, w, h);
            } else if (canvasTimeType === "points") {
                const newCoordinates = drawPoints(ctx,padding,height,maxSeconds,index,charWidth,null, s);
                x = newCoordinates[0];
                y = newCoordinates[1];
            } else if (canvasTimeType == "area") {
                drawArea(ctx, padding, height, sessions.map((session, index) => {
                    const t =  getSeconds(parseInt(session.hours), parseInt(session.minutes));
                    const x = padding + index * Math.min(charWidth, 5) + index * 2;
                    const y = height - (t / maxSeconds) * height + padding;
                    return [x, y];
                }));
            }
    
    
            canvas.addEventListener('mousemove', (event) => {
                const rect = canvas.getBoundingClientRect();
                const mouseX = event.clientX - rect.left;
                const mouseY = event.clientY - rect.top;
    
                if (mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h) {
                    const hours = session.hours;
                    const minutes = session.minutes;
                    canvas.style.cursor = "pointer";
    
    
                    setCanvasTimesHoverValues({
                        hours,
                        minutes,
                        words : session.words,
                        index : index + 1,
                        x : event.clientX,
                        y : event.clientY,
                        wordsAmount : wordsGrow[index+1]
                    })
                }
            });
    
            wordsGrow.push(wordsGrow[index] + session.words);
        });

        ctx.stroke()
    }

};


export default State2;