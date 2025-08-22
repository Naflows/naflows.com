
import EditorJS from '@editorjs/editorjs';
import edition from './edition';

export default function createEditor(
    selectedChapter,
    setEditor,
    selectedProject,
    setNewCharacterCount
) {
    const e = new EditorJS({
        holder: 'editor',
        data: selectedChapter.content,
        inlineToolbar: true,
        tools: {
            // Add more tools as needed
        },
        onChange: () => {
            edition(
                e,
                selectedChapter,
                selectedProject,
                setNewCharacterCount
            )
        },
    });
    setEditor(e);
}