import PropTypes from 'prop-types';
import { useState } from 'react';
import save from '../../../../modules/save';
import appInput from '../../../../../../../public/modules/utilities/input';
import { Tools } from '../../../fields/field';
import { popup } from '../../../../../../../public/modules/utilities/popup';
import { DefaultArticle } from '../../../body';
import Editor from '../../../../main/app/Init';


const ImageRender = ( {image, imageIndex, fieldIndex, setFields} ) => {
    const [ img, setImg ] = useState(image.src);
    return (
        <div className="image-resource" key={imageIndex} id={image.id}>
            <>
                {Editor.InfoBox(image.label)}
                <div className="image">
                    <div className="content">
                        <img src={img} />
                    </div>
                </div>
            </>
            <Tools funcs={{
                edit : function() {
                    popup.new({ 
                        title : `Edit an image`, 
                        description: "Change the fields above to edit your image.",
                        code : (
                            <div className="content">
                                <div className="input-container">
                                    {Editor.InfoBox('Image link')}
                                    {appInput.new('input','Image link',image.src,'ImageLink',[])}
                                </div>
                                <div className="input-container">
                                    {Editor.InfoBox('Image label')}
                                    {appInput.new('input','Image label',image.label,'ImageLabel',[])}
                                </div>
                                <div className="input-container">
                                    {Editor.InfoBox('Image description')}
                                    {appInput.new('textarea','Image description',image.description,'ImageDescription', [])}
                                </div>
                            </div>
                        )
                    }, [{type : "filled", container : {text:"Save"}, action : function() {
                        const label = document.getElementById('ImageLabel');
                        const description = document.getElementById('ImageDescription');
                        const link = document.getElementById('ImageLink');
                        DefaultArticle.content[fieldIndex].visualResources[imageIndex].src = link.value;
                        DefaultArticle.content[fieldIndex].visualResources[imageIndex].label = label.value;
                        DefaultArticle.content[fieldIndex].visualResources[imageIndex].description = description.value;
                        save(DefaultArticle);
                        popup.close();
                        setImg(img);
                        setFields(DefaultArticle.content)
                    }}])
                }, 
                delete : function() {
                    ContentDeletion(document.getElementById(image.id),fieldIndex,imageIndex);
                }
            }}/>
        </div>
    )
};

function ContentDeletion(p,I,i) {
    popup.new({
        title : "Image deletion",
        description : "Are you sure you want to delete this image?"
    }, [{
        type : "filled",
        container : {text:"Delete"},
        action: function() {
            p.remove();
            DefaultArticle.content[I].visualResources.splice(i,1);
            save(DefaultArticle);
            popup.close();
        }
    }])
}

ImageRender.propTypes = {
    image : PropTypes.object.isRequired,
    imageIndex : PropTypes.number.isRequired,
    fieldIndex : PropTypes.number.isRequired,
    setFields : PropTypes.func.isRequired
};


export default ImageRender;