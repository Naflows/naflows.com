import AppButton from "../../public/modules/utilities/buttons/visual";
import { popup } from "../../public/modules/utilities/popup";
import { DefaultArticle } from "../edit/src/components/body";
import Field from "./components/field";
import Header from "./components/header";
import './index.css';


const render = {
    header : function(article) {
        return <Header article={article}/>
    }
};

const ArticleRender = () => {
    const article = DefaultArticle;
    if (article && article.general.name) {
        document.body.classList.add('no-scroll');
        return (
            <div className="render">
                <div className="render-body">
                    <div className="body">
                        {render.header(article)}
                        <div className="fields">
                            {article.content.map((item,index) => (
                                <Field field={item} key={index}/>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="button-actions">
                    <AppButton
                        type="filled"
                        container={{text : "Close"}}
                        custom_properties={["bigButton"]}
                        action={() => {
                            const render = document.querySelector('.render');
                            if (render) {
                                render.remove();
                                document.body.classList.remove('no-scroll')
                            }

                        }}
                    />
                </div>
            </div>
        )
    } 
};


export default ArticleRender;