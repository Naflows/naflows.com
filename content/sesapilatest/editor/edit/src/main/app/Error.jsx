import { useState } from "react";
import appSvg from "../../../../../public/modules/utilities/svg";
import ShadowCheck from "./ShadowCheck";
import AppButton from "../../../../../public/modules/utilities/buttons/visual";
import app from "../../../../../app";

const Error = ( { } ) => {
    return (
        <div className="error-message">
            <div className="top">
                <div className="big">An error occured</div>
                <div className="info">The document you requested is not available</div>
            </div>
            <div className="more">
                <div className="content">
                    <div className="description">
                        <span>The link is either broken or the document does not exist.</span>
                        <span>If you believe there is an error, please report it.</span>
                    </div>
                    <div className="information">
                        Document <span className="num">{ShadowCheck.redirect(true)}</span> is not available.
                    </div>
                </div>
            </div>
            <div className="error-buttons">
                <AppButton 
                    type="filled"
                    container={{text:"Head back home"}}
                    action={() => {
                        window.location.href = '/';
                    }}
                />  
                <AppButton 
                    type="textual"
                    container={{text:"Report an issue"}}
                    action={() => {
                        window.open(app.support.src);
                    }}
                    custom_properties={["textualColor"]}
                />
            </div>
        </div>
      )
};



export default Error;