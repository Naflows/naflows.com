import fileTransfer from "../../../../../../editor/edit";
import findParentWithClass from "../../../../../../public/modules/parent";
import AppButton from "../../../../../../public/modules/utilities/buttons/visual";
import appSvg from "../../../../../../public/modules/utilities/svg";
import './index.css'
import SearchInput from "./search/input";
import { storage } from "../../../../../../editor/edit/src/storage/access";
import { Link, Route, Routes } from "react-router-dom";
import EditorApp from "../../../../../../editor/edit/src/app";
import { useState } from "react";

function NewArticle() {
    fileTransfer()
}


const ChangeDisplay = (t,state,setState) => {
    const param = storage.access("SesAPIParameters");

    if (!t.classList.contains('display-button')) {
        t = findParentWithClass(t,'display-button');
    }
    param.preferedDisplay = t.id;

    if (t.id == "line") {
        document.querySelector('.storage-render').classList.add('line');
        
        Array.from(document.querySelectorAll('.article-read-display')).forEach((i) => {
            i.classList.add('line');
        });
    } else {
        document.querySelector('.storage-render').classList.remove('line');
        Array.from(document.querySelectorAll('.article-read-display')).forEach((i) => {
            i.classList.remove('line');
        });
    }

    storage.set(param,"SesAPIParameters");
    setState(!state);
};





const ResultToolBar = () => {
    const [ displayState, setDisplayState ] = useState(false);

    return (
        <>
            <Routes>
                <Route path="/editor/edit/" element={<EditorApp />}/>
            </Routes>
            <div className="result-toolbar">
                <div className="important-container">
                    <Link to={"/editor/edit"}>
                        <AppButton 
                            type="filled"
                            container = {{
                                svg : appSvg.new('plus'),
                                text : 'New',
                            }}
                            action = {() => NewArticle()}
                        />
                    </Link>
                    <SearchInput />
                </div>
                <div className="display">
                    <div className="display-button" id="grid" onClick={(event) => ChangeDisplay(event.target,displayState,setDisplayState)}>
                        {
                            storage.access('SesAPIParameters').preferedDisplay == "grid" ? appSvg.new('check') : null 
                        }
                        <div className="button">
                            {appSvg.new('displayGrid')}
                        </div>
                    </div>
                    <div className="display-button" id="line" onClick={(event) => ChangeDisplay(event.target,displayState,setDisplayState)}>
                        {
                            storage.access('SesAPIParameters').preferedDisplay == "line" ? appSvg.new('check') : null 
                        }
                        <div className="button">
                            {appSvg.new('displayLine')}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};


export default ResultToolBar;