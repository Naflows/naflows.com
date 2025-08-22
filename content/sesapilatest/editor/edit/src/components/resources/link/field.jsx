import { useState } from 'react';
import findParentWithClass from '../../../../../../public/modules/parent';
import AppButton from '../../../../../../public/modules/utilities/buttons/visual';
import appInput from '../../../../../../public/modules/utilities/input';
import { popup } from '../../../../../../public/modules/utilities/popup';
import appSvg from '../../../../../../public/modules/utilities/svg';
import './index.css';
import { DefaultArticle } from '../../body';
import PropTypes from 'prop-types';
import save from '../../../modules/save';
import { storage } from '../../../storage/access';


function NewLink(t, setResources, resources, edit = false, editValue) {
    popup.new(
        {
            title: edit ? "Edit Resource" : "Create a new resource",
            description: "Enter the name of your hypertext, followed by its link.",
            code: (
                <div className="new_link">
                    {appInput.new('input', 'Hypertext name', edit ? editValue.name : '', "linkName")}
                    {appInput.new('input', 'Hypertext link', edit ? editValue.src : '', "linkSrc")}
                </div>
            ),
            customEndMessage: "Close"
        },
        [
            {
                type: "filled",
                container: { text: edit ? "Update" : "Add" },
                action: function () {
                    const name = document.querySelector('#linkName');
                    const link = document.querySelector('#linkSrc');
                    if (name.value && link.value) {
                        if (edit) {
                            const updatedArray = resources.map(obj => (
                                obj.id === editValue.id ? { ...obj, name: name.value, src: link.value } : obj
                            ));
                            setResources(updatedArray);
                        } else {
                            setResources([...resources, { name: name.value, src: link.value, id: (new Date()).getTime() }]);
                        }
                        popup.close();
                    }
                }
            },
            edit ? (
                {
                    type: "filled",
                    container: { text: "Delete" },
                    action: function () {
                        const updatedArray = resources.filter(obj => obj.id !== editValue.id);
                        setResources(updatedArray);
                        popup.close();
                    }
                }
            ) : null
        ]
    );
}

const ResourceField = ({ fieldType }) => {
    const [resources, setResources] = useState(fieldType== "main" ? DefaultArticle.resources : DefaultArticle.content[fieldType].resources);
    const handleContextMenu = (event, resource) => {
        event.preventDefault();
        NewLink(event.target, setResources, resources, true, resource);
    };

    if (fieldType == 'main') {
        DefaultArticle.resources = resources;
    } else {
        DefaultArticle.content[fieldType].resources = resources;
    }

    save(DefaultArticle);


    return (
        <div className="resources">
            <AppButton
                type="filled"
                container={{
                    svg: appSvg.new('newlink'),
                    text: 'New linked resource'
                }}
                custom_properties={["new-resource-button"]}
                action={(event) => NewLink(event.target, setResources, resources)}
            />
            <div className="container">
                {resources.map((e, i) => (
                    <div className={
                        "resource" + " " + (fieldType != "main" ? "hover-harder" : "")
                    } key={e.id} onClick={(event) => handleContextMenu(event, e)}>
                        {appSvg.new('link')}
                        <a className="text" href={e.src} target='_blank'>
                            {e.name}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

ResourceField.propTypes = {
    fieldType : PropTypes.string.isRequired,
};

export default ResourceField;