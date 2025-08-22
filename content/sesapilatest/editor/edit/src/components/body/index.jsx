import PropTypes from 'prop-types';
import appInput from '../../../../../public/modules/utilities/input';
import '../../../public/style/article/body.css';
import AppButton from '../../../../../public/modules/utilities/buttons/visual';
import appSvg from '../../../../../public/modules/utilities/svg';
import ResourceField from '../resources/link/field';
import save from '../../modules/save';
import Fields from '../fields';
import Editor from '../../main/app/Init';
import ArticleRender from '../../../../render';



export let DefaultArticle;


const ArticleBody = ( { article } ) => {
    DefaultArticle = article;
    return (
        <div className="article edit">
            <div className="header">
                <div className="title input-container">
                    {Editor.InfoBox('Article name')}
                    {appInput.new(
                        'input','Article title', DefaultArticle.general.name, "articleTitle",
                        ["pseudo-input"], function(event) {
                            let value = event.target.value;
                            DefaultArticle.general.name = value;
                            save(DefaultArticle);
                        }
                     )}
                 </div>
                <div className="description input-container">
                    {Editor.InfoBox('Article description')}
                    {appInput.new(
                        'textarea','Article description', DefaultArticle.general.description, "articleTitle",
                         ["pseudo-input"], function(event) {
                            let value = event.target.value;
                            DefaultArticle.general.description = value;
                            save(DefaultArticle);
                        }
                     )}
                </div>
            </div>
            <ResourceField fieldType='main'/>
            <Fields />
        </div>
    )
};



ArticleBody.propTypes = {
    article : PropTypes.object.isRequired,
};

export default ArticleBody;