import React from "react";
import PropTypes from 'prop-types';
import { js_beautify } from "js-beautify";
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript'; // Import JavaScript syntax highlighting
import 'prismjs/themes/prism-dark.css';

class Container extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        Prism.highlightAll(); // Call Prism.highlightAll() to highlight code blocks
    }

    render() {
        return (
            <div className="container">
                <div className="main">
                    <div className="title">
                        {this.props.title}
                    </div>
                    <div className="description">
                        {this.props.description}
                    </div>
                </div>
                <pre className="code">
                    <code className="language-javascript">
                        {js_beautify(this.props.code)}
                    </code>
                </pre>
            </div>
        )
    }
}

Container.propTypes = {
    title : PropTypes.string.isRequired,
    description : PropTypes.string.isRequired,
    code : PropTypes.string.isRequired
}

export default Container;
