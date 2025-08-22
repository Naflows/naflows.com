import AppTimeConverter from "../../../../../public/modules/utilities/time";
import { DefaultArticle } from "../../components/body";
import { storage } from "../../storage/access";



const save = (article) => {
    if (document.querySelector('.save-update')) {
        const s = storage.access();
        if (!s.articles) s.articles = [];
        
    
        const indexToUpdate = s.articles.findIndex((a) => a.time.createdOn === article.time.createdOn);
    
        if (indexToUpdate !== -1) {
            s.articles[indexToUpdate] = article;
        } else {
            s.articles.push(article);
        }
        
        
    
        storage.set(s);
        const update = () => {
            const box = document.querySelector('.save-update');
            const value = box.querySelector('.value');
            const info = box.querySelector('.info');
    
            value.innerHTML = "Changes saved";
            info.innerHTML = AppTimeConverter((new Date()).getTime());
    
            box.classList.add('active');
            setTimeout(() => {
                box.classList.remove('active');
            }, 5000);
        };
    
        update();
    }
};

export default save;