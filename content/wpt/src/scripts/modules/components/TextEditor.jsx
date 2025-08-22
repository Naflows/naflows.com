import React, { useEffect } from 'react';
import EditorJS from '@editorjs/editorjs';

import '../../../../public/styles/components/TextEditor/index.scss';

const TextEditor = () => {

    useEffect(() => {
        const editor = new EditorJS({
            holder: 'editor', // Specify the id of the container element
            /**
             * Enable the usage of the inline toolbar
             */
            inlineToolbar: true,
            /**
             * Enable the usage of the paragraph block
             */
            tools: {

                // Add more tools as needed
            },
        });

        // Clean up function

    }, []);

    return (
        <div className='text-editor'>
            <div id="editor"></div> {/* The container div for Editor.js */}
        </div>
    );
};

export default TextEditor;
