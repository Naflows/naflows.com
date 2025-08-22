import PropTypes from 'prop-types';
import './style/index.css';
import fileTransfer from '../../../../editor/edit';
import AppTimeConverter from '../../../../public/modules/utilities/time';
import ArticleSmallViewActions from './components/box_render';
import { storage } from '../../../../editor/edit/src/storage/access';
import { Link, Route, Routes } from 'react-router-dom';
import EditorApp from '../../../../editor/edit/src/app';






const ArticleSmallView = ( { article } ) => {
    try {
        article = JSON.parse(article)
    } catch(error) {
        article = article;
    }
    const name = article.general.name;
    const description = article.general.description;
    const createdOn = article.time.createdOn;
    const lastEdit = article.time.lastEdit;
    
    return (
        <>
            <div id={createdOn} className={"article-read-display" + " " + storage.access('SesAPIParameters').preferedDisplay}>
                <Link to={`editor/edit/?id=${createdOn}`} className='link'>
                    <div className="content" onClick={() => fileTransfer(article)}>
                        <div className="header">
                            <div className="name">
                                {name}
                            </div>
                            {
                                description ? (
                                    <div className="description">
                                        {description}
                                    </div>
                                ) : null
                            }
                        </div>
                        <div className="statistics">
                            <div className="container">
                                <span>Last edit on</span>
                                <span>{AppTimeConverter(lastEdit)}</span>
                            </div>
                            <div className="container">
                                <span>Created on</span>
                                <span>{AppTimeConverter(createdOn)}</span>
                            </div>
                        </div>
                    </div>
                </Link>
                <ArticleSmallViewActions article={article} />
            </div>
        </>
        
    )
};
ArticleSmallView.propTypes = {
    article :                      PropTypes.object.isRequired,
};

export default ArticleSmallView;