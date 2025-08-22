import AppButton from "../../../../../public/modules/utilities/buttons/visual";
import ArticleRender from "../../../../render";
import ReactDOM from "react-dom";



const DisplayRender = () => {
    return (
        <AppButton 
            type = "blank"
            container={{text : "Display render"}}
            action = {() => {
                const renderContainer = document.createElement('div');
                renderContainer.className = "renderContainer";
                document.body.appendChild(renderContainer);
                const portal = ReactDOM.createPortal((
                    <ArticleRender />
                ), renderContainer);
                ReactDOM.render(portal, renderContainer);
            }}
        />
    )
};

export default DisplayRender;