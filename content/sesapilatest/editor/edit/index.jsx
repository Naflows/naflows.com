import { useEffect } from 'react';
import data from '../../public/modules/data';

const fileTransfer = (article = null) => {
  if (!article) {
    article = data.template();
  }
  localStorage.setItem('running_article',JSON.stringify(article));
  useEffect(() => {
    document.title = article.general.name || "New article";
    return () => {
      document.title = article.general.name || "New article";
    };
  }, []); 

  console.log('New article:',article)

};



export default fileTransfer;
