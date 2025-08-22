import { storage } from "../../storage/access";

const ShadowCheck = {
    pageLink : function() {
      const pageUrl = window.location.href;
      return pageUrl;
    },
    editing : function() {
      const link = ShadowCheck.pageLink();
      return link.includes('?id=');
    },
    redirect : function(ReturnID = false) {
      const link = ShadowCheck.pageLink();
      const searchPart = link.split('?')[1];
      const urlParameters = new URLSearchParams(searchPart);
      const id = parseInt(urlParameters.get('id'));

      if (ReturnID) {
        return id;
      }
      
      const Storage = storage.access();
      if (!Storage.articles) Storage.articles = [];
      storage.set(Storage)
      const foundArticle = Storage.articles.find((article) => {
        return article.time.createdOn === id;
      });
      return foundArticle;
      }
  };

  
export default ShadowCheck;