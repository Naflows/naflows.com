import React, { useEffect } from 'react';
import Toolsbar from '../../components/toolbar';
import ArticleBody from '../../components/body';
import Error from './Error';
import { storage } from '../../storage/access';

const Editor = {
    init : function() {
        try {
            const infoBar = document.querySelector('.info-bar');
            if (infoBar) infoBar.remove();
          
            const drive = [
              document.querySelector('.result-toolbar'),
              document.querySelector('.storage-render')
            ];
            drive.forEach((i) => {
              if (i) i.remove();
            })
            
            let article;
            const s = JSON.parse(localStorage.getItem('running_article'));
            if (s) {
              article = s;
            } 
            if (!article) {
                return null;
            }
            useEffect(() => {
              document.title = article.general.name || "New article";
            }, [])
          
          
            return (
              <>
                <Toolsbar article={article}/>
                <ArticleBody article = {article} />
                <div className="popup-container-dnd"></div>
              </>
            );
        } catch (error) {
            return null;
        }
    },
    error : function() {
        return <Error />
    },
    InfoBox : function(text) {
        const Storage = storage.access('SesAPIParameters')
        return (
            <div className="info-box" style={{display : Storage.enableInfoBox ? 'flex' : 'none'}}>
                {text}
            </div>
        )
    }
}

export default Editor;