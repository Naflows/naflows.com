import { useState, useEffect, useRef } from "react";

import appInput from "../../../../../../public/modules/utilities/input";
import appSvg from "../../../../../../public/modules/utilities/svg";
import "../index.css";
import PropTypes from 'prop-types';
import ResourceField from "../../resources/link/field";
import { DefaultArticle } from "../../body";
import save from "../../../modules/save";
import OtherResources from "../../resources/other";
import { popup } from "../../../../../../public/modules/utilities/popup";
import Editor from "../../../main/app/Init";


export const Tools = ({ funcs }) => {
    const icons = {
        "edit" : appSvg.new('edit'),
        "delete" : appSvg.new('trash')
    }

    return (
        <div className="tools">
            <div className="parameters">
                {Object.keys(funcs).map((item) => (
                    <div className="parameter" onClick={() => funcs[item]()}>
                        {icons[item]}
                    </div>
                ))}
            </div>
        </div>
    );
}
Tools.propTypes = {
    funcs : PropTypes.object.isRequired,
};

const Field = ( { field,i, setFields } ) => {

    if (field) {
        return (
            <div className="field" id={i+"field"}>
                <div className="content">
                    <div className="header">
                        <div className="name input-container">
                            {Editor.InfoBox('Field name')}
                            {appInput.new('input','Field name',field.general.name || "New field","fieldName",[],function(event) {
                                let value = event.target.value;
                                DefaultArticle.content[i].general.name = value;
                                save(DefaultArticle);
                            })}
                        </div>
                        <div className="description input-container">
                            {Editor.InfoBox('Field description')}
                            {appInput.new('textarea','Field description',field.general.description || "","fieldDescription",["autosize"], function(event) {
                                let value = event.target.value;
                                DefaultArticle.content[i].general.description = value;
                                save(DefaultArticle);
                            })}
                        </div>
                    </div>
                    <OtherResources fieldType={i} />
                    <ResourceField fieldType={i} setFields={setFields} />
                </div>
                <Tools funcs={{
                    delete : function() {
                        ContentDeletion(i,setFields);
                    }
                }} />
            </div>
        )
    }
}

function ContentDeletion(id,setFields) {
    const p = document.getElementById(id+"field");
    popup.new({
        title : "Confirm deletion",
        description : "Are you sure you want to proceed?"
    }, [{
        type : "filled",
        container : {text:"Delete"},
        action: function () {
            if (p) {
                p.remove();
                if (id >= 0 && id < DefaultArticle.content.length) {
                    DefaultArticle.content.splice(id, 1);
                    setFields(DefaultArticle.content);
                }
            }
            popup.close();
        }
    }])
}

Field.propTypes = {
    field : PropTypes.object.isRequired,
    i: PropTypes.number.isRequired,
    setFields : PropTypes.func.isRequired
};

export default Field;