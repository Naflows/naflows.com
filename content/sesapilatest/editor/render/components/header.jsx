import './../index.css';
import PropTypes from 'prop-types';
import Resources from './resources';
import './styles/header.css';
import AppTimeConverter from '../../../public/modules/utilities/time';
import AppButton from '../../../public/modules/utilities/buttons/visual';

const Header = ({ article }) => {
    console.log(article)
    return (
        <div className="render-header">
            <div className="main">
                <>
                    <div className="identity">
                        <div className="title">
                            <span>{article.general.name}</span>
                            <div className="informations">
                                Created on {AppTimeConverter(article.time.createdOn)}
                            </div>
                        </div>
                        <div className="description">
                            {article.general.description}
                        </div>
                    </div>
                </>
                <>
                    
                </>
            </div>
            <Resources container = {article.resources} />
        </div>
    )
};
Header.propTypes = {
    article : PropTypes.object.isRequired
};

export default Header;
