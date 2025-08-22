import PropTypes from 'prop-types';
import appSvg from '../../../../../../public/modules/utilities/svg';
import AppButton from '../../../../../../public/modules/utilities/buttons/visual';
import { popup } from '../../../../../../public/modules/utilities/popup';
import './index.css';
import appInput from '../../../../../../public/modules/utilities/input';
import { useState } from 'react';
import save from '../../../modules/save';
import { DefaultArticle } from '../../body';
import { Tools } from '../../fields/field';
import ImageRender from './image/view';
import CodeDrop from './code/popup';
import CodeRender from './code/view';

export const ImageDrop = () => {
    const [image, setImage] = useState('');

    return(
        <div className="image-addition">
            <div className="input-fields">
                {appInput.new('input','Image link','','imageLink',[],function(event) {
                    const value = event.target.value;
                    if (value) {
                        setImage(value);
                    }
                })}
                {appInput.new('input','Image label','','imageLabel')}
                {appInput.new('textarea','Image description','','imagedescription')}
            </div>
            <div className="render">
                <img src={image} />
            </div>
        </div>
    )  
};


export const newImage = (resources,setResources,fieldType) => {
    const link = document.querySelector('#imageLink');
    const label = document.querySelector('#imageLabel');
    const desc = document.querySelector('#imagedescription');
    popup.close();

    setResources([...resources, { label: label.value, description: desc.value, src: link.value, id: (new Date()).getTime() }]);
    DefaultArticle.content[fieldType].visualResources = resources;
    save(DefaultArticle);
}

export const newCode = (resources,setResources,fieldType) => {
    const content = document.querySelector('#codeContent');
    const label = document.querySelector('#codeLabel');
    const desc = document.querySelector('#codeDescription');
    popup.close();

    setResources([...resources, { label: label.value, description: desc.value, content: content.value, id: (new Date()).getTime() }]);
    DefaultArticle.content[fieldType].visualResources = resources;
    save(DefaultArticle);
}


const OtherResources = ({ fieldType, setFields }) => {
    if (!DefaultArticle.content[fieldType].visualResources) {
        DefaultArticle.content[fieldType].visualResources = [];
    }

    const [resources, setResources] = useState(DefaultArticle.content[fieldType].visualResources);

    if (DefaultArticle.content[fieldType].visualResources != resources) {
        DefaultArticle.content[fieldType].visualResources = resources;
    }


    save(DefaultArticle);

    const v = DefaultArticle.content[fieldType].visualResources;
    return (
        <div className="other-resources" key={fieldType}>
            <div className="resources-container">
                {
                    v ? v.map((r,i) => {
                        if (r.src) {
                            return <ImageRender image={r} imageIndex={i} fieldIndex={fieldType} key={i} setFields = {setFields} />
                        } else {
                            return <CodeRender code={r} codeIndex={i} fieldIndex={fieldType} key={i}  setFields = {setFields}  />
                        }
                    }) : null
                }
            </div>
            <AppButton
                type="filled"
                container={{
                    svg: appSvg.new('newimage'),
                    text: 'New support'
                }}
                action={() => {
                    popup.new({
                        title : "Create a new support",
                        description : "Please pick one of the two supports you would like to add.",
                    },[{
                        type : "filled",
                        container : {svg: appSvg.new('image'),text:"Image"},
                        action : function() {
                            popup.close();
                            popup.new({
                                title : "Create a new support: image",
                                description : "Fill the necessary fields to add an image.",
                                code: (
                                    <ImageDrop />
                                )
                            }, [{
                                type : "filled",
                                container : {text:"Save"},
                                action : () => (newImage(resources,setResources,fieldType))
                            }])
                        }
                    }, {
                        type : "filled",
                        container : {svg: appSvg.new('code'),text:"Code"},
                        action: function() {
                            popup.close();
                            popup.new({
                                title : "Create a new support: code",
                                description : "Fill the necessary fields to add a code.",
                                code: (
                                    <CodeDrop />
                                )
                            }, [{
                                type : "filled",
                                container : {text:"Save"},
                                action : () => (newCode(resources,setResources,fieldType))
                            }])
                        }
                    }])
                }}
            />
        </div>
    )
};
OtherResources.propTypes = {
    fieldType : PropTypes.string.isRequired,
    setFields : PropTypes.func.isRequired
};
export default OtherResources;