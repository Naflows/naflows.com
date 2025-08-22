import { useState } from "react";
import appInput from "../../../../../../../public/modules/utilities/input";


const ImageDrop = () => {
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

export default ImageDrop;