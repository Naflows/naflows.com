import { useState } from "react";
import AppButton from "../../../../../public/modules/utilities/buttons/visual";
import appSvg from "../../../../../public/modules/utilities/svg";
import './index.css';
import { DefaultArticle } from "../body";
import Field from "./field";




const Fields = () => {
    const [ fields, setFields ] = useState(DefaultArticle.content);
    return (
        <>
            <AppButton 
                type = "filled"
                container= {{svg : appSvg.new('plus') , text : "New field"}}
                custom_properties={["fixed_new_fields"]}
                action = {() => {
                    DefaultArticle.content = [...DefaultArticle.content, {
                        general: {
                            name: "New field",
                            description: ""
                        },
                        resources: [],
                        content: [],
                        visualResources: []
                    }];
                    setFields(DefaultArticle.content);
                }}
            />
            <div className="fields">
                {
                    fields.map((f,i) => (<Field field = {f} i={i} setFields = {setFields}/>))
                }
            </div>
        </>
    )
};

export default Fields;