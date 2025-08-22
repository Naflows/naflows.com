import { useEffect, useState } from 'react';
import hljs from 'highlight.js';
import appSvg from '../../../../public/modules/utilities/svg';
import PropTypes from 'prop-types';


const CodeRender = ( { code } ) => {
    const [ codeContent, setCode ] = useState(js_beautify(`${code.content}`));
    const [numLines, setNumLines] = useState(0);
    const [copy, setCopy] = useState(false);

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
        hljs.highlightAll();
        const lines = codeContent.split('\n');
        setNumLines(lines.length);
      }, [code.content]);


    return (
        <div className="resource code">
            <div className="resource-content">
                <div className="label">
                    {code.label}
                </div>
                <div className="description">
                    {code.description}
                </div>
            </div>
            <pre className="code">
                <div className="lines">
                    {Array.from({ length: numLines }, (_, i) => newLine(i))}
                </div>
                <code dangerouslySetInnerHTML={{ __html: codeContent }} />
                <div className="action" onClick={() => {
                            navigator.clipboard.writeText(code.content);
                            setCopy(true);
                            setTimeout(() => {
                                setCopy(false);
                            }, 2500);
                        }}>
                        <div className="icon">
                        {!copy ? appSvg.new('copy') : appSvg.new('check_copy')}
                    </div>
                </div>
            </pre>
        </div>
    )
};
CodeRender.propTypes = {
    code: PropTypes.object.isRequired,
};


export default CodeRender;