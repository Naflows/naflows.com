import PropTypes from 'prop-types';
import appSvg from '../../../../public/modules/utilities/svg';
import { downloadImage } from '../../../edit/src/modules/download';


const ImageRender = ( { image } ) => {
    return (
        <div className="resource image">
            <div className="resource-content">
                <div className="label">
                    {image.label}
                </div>
                <div className="description">
                    {image.description}
                </div>
            </div>
            <div className="image">
                <img src={image.src} />
            </div>
        </div>
    )
};
ImageRender.propTypes = {
    image: PropTypes.object.isRequired,
};


export default ImageRender;