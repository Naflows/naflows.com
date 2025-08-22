import drawArea from "../../modules/canvasMethods/draw-area";
import drawCharBase from "../../modules/canvasMethods/draw-chart-base";
import drawPoints from "../../modules/canvasMethods/drawPoints";

const State3 = (
    canvas,
    project,
    setCanvasWordsHoverValues,
    canvasWordsType
) => {
    
    if (canvas) {
        canvas.addEventListener('mouseleave', () => {
            setCanvasWordsHoverValues({});
        });
        

        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();

        const sessions = project.stats.sessions;
        const width = canvas.width;
        const height = canvas.height;

        const charWidth = width / sessions.length - 2;

        drawCharBase(ctx, width, height);
        const padding = 1;

        const maxWords = sessions.reduce((max, session) => {
            const words = session.words;
            return words > max ? words : max;
        }, 0);

        const wordsGrow = [0];
        sessions.map((session, index) => {
            let x = padding + index *  Math.min(charWidth, 5) + index * 2;
            let y = height - (session.words / maxWords) * height + padding;
            let w = padding + Math.min(charWidth, 5);
            let h = (session.words / maxWords) * height - padding;

            let ratio = Math.round(session.words / wordsGrow[index]);
            if (session.words < wordsGrow[index]) {
                ratio = -ratio;
            }

            if (canvasWordsType === "bars") {

                
                ctx.strokeStyle=getComputedStyle(document.documentElement).getPropertyValue("--app-text-color");
                ctx.lineWidth = 1;
                ctx.strokeRect(x, y, w, h);
            } else if (canvasWordsType === "points") {
                const newCoordinates = drawPoints(ctx,padding,height,maxWords,index,charWidth,ratio, session.words);
                x = newCoordinates[0];
                y = newCoordinates[1];
            } else if (canvasWordsType == "area") {
                drawArea(ctx, padding, height, sessions.map((session, index) => {
                    const x = padding + index * Math.min(charWidth, 5) + index * 2;
                    const y = height - (session.words / maxWords) * height + padding;
                    return [x, y];
                }));
            }
    
    
            canvas.addEventListener('mousemove', (event) => {
                const rect = canvas.getBoundingClientRect();
                const mouseX = event.clientX - rect.left;
                const mouseY = event.clientY - rect.top;


    
                if (mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h) {
                    canvas.style.cursor = "pointer";
    

    
                    setCanvasWordsHoverValues({
                        mood : session.mood,
                        date : session.date,
                        words : session.words,
                        hours : session.hours,
                        minutes : session.minutes,
                        x : event.clientX,
                        y : event.clientY,
                        index : index + 1,
                        notes : session.notes,
                        ratio:  ratio == Infinity ? 0 : ratio
                    })
                }
            });
            wordsGrow.push(session.words)

        });

        ctx.stroke();
    }
};


export default State3;