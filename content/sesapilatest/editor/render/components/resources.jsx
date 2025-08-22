import PropTypes from 'prop-types';
import './styles/resources.css';
import appSvg from '../../../public/modules/utilities/svg';

  
const Resource = ( { resource } ) => {
    return (
        <a href={resource.src} target='_blank' className='resource'>
            <div className="name">{resource.name}</div>
            <div className="icon">{appSvg.new('open')}</div>
        </a>
    )
};


const Resources = ( { container } ) => {
    return (
        <div className="resources-container">
            <div className="container">
                {container.map((item, index) => (
                    <Resource resource={item} key={index} />
                ))}
            </div>
        </div>
    )
};


Resource.propTypes = {
    resource : PropTypes.object.isRequired
};
Resources.propTypes = {
    container: PropTypes.array.isRequired
};
export default Resources;