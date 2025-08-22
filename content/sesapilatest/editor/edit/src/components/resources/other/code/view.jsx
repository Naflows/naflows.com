import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import save from '../../../../modules/save';
import appInput from '../../../../../../../public/modules/utilities/input';
import { Tools } from '../../../fields/field';
import { popup } from '../../../../../../../public/modules/utilities/popup';
import { DefaultArticle } from '../../../body';
import { js_beautify } from 'js-beautify';
import Editor from '../../../../main/app/Init';
import 'highlight.js/styles/github.css';
import hljs from 'highlight.js';


const CodeRender = ( {code, codeIndex, fieldIndex, setFields} ) => {
    const [ codeContent, setCode ] = useState(js_beautify(`${code.content}`));
    const [numLines, setNumLines] = useState(0);

    const newLine = (lineNumber) => {
        return (
            <div className="line" key={lineNumber}>
                <div className="number">{lineNumber + 1}</div>
            </div>
        );
      };

    useEffect(() => {
        // Update code content
        setCode(js_beautify(`${code.content}`));
    
        // Highlight code and update the number of lines
        hljs.highlightAll();
        const lines = codeContent.split('\n');
        setNumLines(lines.length);
      }, [code.content]);

    return (
        <div className={"code-resource"} key={codeIndex} id={code.id}>
            <>
                {Editor.InfoBox(code.label)}
                <pre className="code">
                    <div className="lines">
                        {Array.from({ length: numLines }, (_, i) => newLine(i))}
                    </div>
                    <code dangerouslySetInnerHTML={{ __html: codeContent }} />
                </pre>
            </>

                <Tools funcs={{
                    edit : function() {
                        popup.new({ 
                            title : `Edit a code`, 
                            description: "Change the fields above to edit your code.",
                            code : (
                                <div className="content">
                                    <div className="input-container">
                                        {Editor.InfoBox('Code label')}
                                        {appInput.new('input','Code label',code.label,'CodeLabel',[])}
                                    </div>
                                    <div className="input-container">
                                        {Editor.InfoBox('Code description')}
                                        {appInput.new('textarea','Code description',code.description,'CodeDescription', [])}
                                    </div>
                                    <div className="input-container">
                                        {Editor.InfoBox('Code')}
                                        {appInput.new('textarea','Code',js_beautify(code.content),'CodeContent', [])}
                                    </div>
                                </div>
                            )
                        }, [{type : "filled", container : {text:"Save"}, action : function() {
                            const label = document.getElementById('CodeLabel');
                            const description = document.getElementById('CodeDescription');
                            const content = document.getElementById('CodeContent');
                            console.log(content.value)
                            DefaultArticle.content[fieldIndex].visualResources[codeIndex].content = `${content.value}`;
                            DefaultArticle.content[fieldIndex].visualResources[codeIndex].label = label.value;
                            DefaultArticle.content[fieldIndex].visualResources[codeIndex].description = description.value;
                            save(DefaultArticle);
                            popup.close();
                            setCode('');
                            setCode(js_beautify(`${code.content}`));
                            setFields(DefaultArticle.content)
                        }}])
                    },
                    delete : function() {
                        ContentDeletion(document.getElementById(code.id),fieldIndex,codeIndex);
                    }
                }}/>
        </div>
    )
};

function ContentDeletion(p,I,i) {
    popup.new({
        title : "Code deletion",
        description : "Are you sure you want to delete this code?"
    }, [{
        type : "filled",
        container : {text:"Delete"},
        action: function() {
            p.remove();
            DefaultArticle.content[I].visualResources.splice(i,1);
            save(DefaultArticle);
            popup.close();
        }
    }])
}

CodeRender.propTypes = {
    code : PropTypes.object.isRequired,
    codeIndex : PropTypes.number.isRequired,
    fieldIndex : PropTypes.string.isRequired,
    setFields : PropTypes.func.isRequired
};


export default CodeRender;