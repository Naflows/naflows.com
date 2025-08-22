import { useState } from "react";
import AppButton from "../../../../../public/modules/utilities/buttons/visual";
import { popup } from "../../../../../public/modules/utilities/popup";
import { storage } from "../../storage/access";
import Switch from "../../../../../public/modules/utilities/switch";
import { BetaView, buttonOpacity, displayManagement } from ".";


const EditorSettings = () => {
    const Storage = storage.access('SesAPIParameters');


    const [ switchField, setSwitchField ] = useState(Storage.enableInfoBox);
    const [ opacityButton, setopacityButton ] = useState(Storage.disableOpacity);
    const [ secondViewBeta, setSecondViewBeta ] = useState(Storage.enableSecondView);



    return (
        <AppButton
        type="blank"
        container={{text : "Editor settings"}}
        action={() => {
            popup.new({
                title : "Editor settings",
                description: "The following parameters are exclusive to this document, and allows you to customize your preferences regarding the edition.",
                code : (
                    <div className="in-parameters">
                        <Switch 
                            boxName="Display fields indicators"
                            boxDescription = "Fields above the inputs help understand what you are doing."
                            states = {{
                                default : switchField,
                                on : () => {
                                    displayManagement('flex');
                                    setSwitchField(true);
                                },
                                off : () => {
                                    displayManagement('none');
                                    setSwitchField(false);
                                }
                            }}
                        />
                        <Switch 
                            boxName="Buttons opacity"
                            boxDescription = "Buttons might take some place. Enable this parameter to reduce them."
                            states = {{
                                default : opacityButton,
                                on : () => {
                                    buttonOpacity(true);
                                    setopacityButton(true);
                                },
                                off : () => {
                                    buttonOpacity(false);
                                    setopacityButton(false);
                                }
                            }}
                        />
                        <Switch 
                            boxName="Display advanced edition"
                            boxDescription = "User experimentations: changing the display of the tools to edit a field."
                            states = {{
                                default : secondViewBeta,
                                on : () => {
                                    setSecondViewBeta(true);
                                    BetaView();
                                },
                                off : () => {
                                    setSecondViewBeta(false);
                                    BetaView();
                                }
                            }}
                        />
                    </div>
                ),
                customEndMessage : 'Done'
            })
        }}      
    />
    )
};

export default EditorSettings;