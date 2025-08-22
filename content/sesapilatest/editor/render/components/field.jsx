import PropTypes from 'prop-types';
import Resources from './resources';
import './styles/field.css';
import CodeRender from './components/code';
import ImageRender from './components/image';






const VisualResources = ( { content } ) => {
    return (
        <div className="content">
            {content.map((item, index) => {
                if (item.src) {
                    return <ImageRender image={item} key={index}/>;
                } else {
                    return <CodeRender code={item} key={index}/>
                }
            })}
        </div>
    )
};

VisualResources.propTypes = {
    content : PropTypes.object.isRequired
};


const Field = ( { field } ) => {
    return (
        <div className="field">
            <div className="field-header">
                <div className="name">
                    {field.general.name}
                </div>
                <div className="description">
                    {field.general.description}
                </div>
            </div>
            <Resources container={field.resources}/>
            {
                field.visualResources ? (
                    <VisualResources content={field.visualResources}/>
                ) : null
            }
        </div>
    )
};



Field.propTypes = {
    field: PropTypes.object.isRequired
};
export default Field;