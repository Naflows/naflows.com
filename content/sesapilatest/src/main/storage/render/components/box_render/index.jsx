import PropTypes from 'prop-types';
import '../../style/index.css';
import { useEffect, useRef, useState } from 'react';
import { popup } from '../../../../../../public/modules/utilities/popup';
import appSvg from '../../../../../../public/modules/utilities/svg';
import { storage } from '../../../../../../editor/edit/src/storage/access';
import downloadFile from '../../../../../../editor/edit/src/modules/download';

const download = (a,t) => {
    downloadFile(a,t);
    popup.close();
}

export function ExternalDownload(article) {
    popup.new(
        {
            title : "Download existing file",
            description : "Select your prefered filetype."
        },
        [
            {
                type : 'filled',
                container : { text : article.general.name + ".txt" },
                action : () => download(article,'text'),
                custom_properties : ["buttonContainText"]
            },
            {
                type : 'filled',
                container : { text : article.general.name + ".json" },
                action : () => download(article,'json'),
                custom_properties : ["buttonContainText"]
            }
        ]
    )

}


const ArticleSmallViewActions = ( { article } ) => {
    const [ viewOptions , setOptionsView ] = useState(false);
    const componentRef = useRef(null);

    const handleClickOutside = (event) => {
        if (componentRef.current && !componentRef.current.contains(event.target)) {
            setOptionsView(false);
        }
    };

    useEffect(() => {
        const handleMouseDown = (event) => {
            handleClickOutside(event);
        };

        document.addEventListener('mousedown', handleMouseDown);

        return () => {
            document.removeEventListener('mousedown', handleMouseDown);
        };
    }, []);

    return (
        <div className="open-more-actions" ref={componentRef}>
            <div className="button colorsvg" onClick={() => setOptionsView(!viewOptions)}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/></svg>
            </div>
            <div className="actions" style={{visibility: !viewOptions ? 'hidden' : 'visible', opacity: !viewOptions ? '0' : '1'}}>
                <div className="small-view-action" onClick={() => ExternalDownload(article)}>
                    <div className="icon">
                        {appSvg.new('download')}
                    </div>
                    <div className="text">
                        Download 
                    </div>
                </div>
                <div className="small-view-action" onClick={
                        () => popup.new(
                            {
                                title : '"' + article.general.name + '"' + " deletion",
                                description : "Are you sure you want to delete this file?"
                            },
                            [
                                {
                                    type : 'filled',
                                    container : { text : "Delete permanently" },
                                    action : function() {
                                        let s = storage.access();
                                        s.articles = s.articles.filter(item => item.time.createdOn !== article.time.createdOn);
                                        storage.set(s);
                                        window.location.href="";
                                    },
                                    custom_properties : []
                                }
                            ]
                        )
                }>
                    <div className="icon">
                        {appSvg.new('trash')}
                    </div>
                    <div className="text">
                        Delete 
                    </div>
                </div>

            </div>
        </div>
    )
}

ArticleSmallViewActions.propTypes = {
    article :                      PropTypes.object.isRequired,
};

export default ArticleSmallViewActions;