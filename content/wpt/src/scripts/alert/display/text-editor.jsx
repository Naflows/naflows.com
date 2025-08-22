import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Alert from '../../../components/main/alert';
import localstorage_name from '../../../main';
import cancel from '../WhereCancelButtonIs';

import '../../../../public/styles/components/TextEditor/index.scss';

import SaveByButton from '../editorModules/scripts/SaveByButton';
import SelectChapters from '../editorModules/components/SelectChapters';
import InnerProjectsDisplayer from '../editorModules/components/InnerProjectsDisplayer';
import InnerChaptersDisplayer from '../editorModules/components/InnerChaptersDisplayer';
import Save from '../editorModules/scripts/Save';
import arch from '../../arch';

const TextEditor = ({
    setDisplay,setShowAlert,
    selectedProject, setSelectedProject,
    selectedChapter, setSelectedChapter
}) => {

    const [
        projects, setProjects
    ] = useState(
        JSON.parse(localStorage.getItem(localstorage_name)).projects
    );







    const [
        globalDisplayChapters, setGlobalDisplayChapters
    ] = useState([]);

    const [
        editor, setEditor
    ] = useState(null);

    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    const currentDate = `${day}/${month}/${year}`;
    const startingDate= currentDate;
    const startedAt = new Date().getTime();
    const [
        newCharacterCount, setNewCharacterCount
    ] = useState(0);

    const [
        modificationActive, setModificationActive
    ] = useState(false);

    const [
        dailyObjective, setDailyObjective
    ] = useState();

    useEffect(() => {
        if (selectedProject && selectedProject.chapters) {
            selectedProject.chapters.sort((a,b) => {
                return a.index - b.index
            })
            setGlobalDisplayChapters(selectedProject.chapters);
            if (selectedProject.end) {
                const date = new Date(selectedProject.end);
                const days = Math.floor((date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                const words = selectedProject.length;
                setDailyObjective(Math.round(words / days));
                console.log(
                    "Daily objective is",
                    dailyObjective
                )
            }
        }
    }, [selectedProject])

    useEffect(() => {
        console.log("New character count", newCharacterCount)
        if (selectedProject) {

            selectedProject.stats.total += newCharacterCount;
        }
    }, [newCharacterCount, selectedProject])

    useEffect(() => {
        if (selectedChapter && selectedChapter.content) {
            arch(
                setNewCharacterCount,
                setEditor,
                selectedProject,
                selectedChapter,
                dailyObjective
            )
        } else {
            if (editor) {
                editor.destroy();
                setEditor(null);
            }
        }
    }, [selectedChapter]);

    const PreSave = () => {
        selectedChapter.name = document.getElementById("chapter-name").value;
        selectedChapter.description = document.getElementById("chapter-description").value;
    }
    






    return (
        <>
            <Alert
                className={`select-editor ${selectedChapter && selectedProject ? "dispatch-header" : ""} ${selectedChapter ? "big" : ""}`}
                buttons={[
                    selectedProject ? (
                        {
                            text: "Retour",
                            onClick: () => {
                                if (selectedChapter == null) {
                                    setSelectedProject(null);
                                } else {
                                    Save(
                                        editor,
                                        selectedChapter,
                                        setSelectedChapter,
                                        selectedProject,
                                        newCharacterCount,
                                        startingDate,
                                        startedAt
                                    )
                                }
                            },
                            className: "primary"
                        }
                    ) : null,
                    selectedChapter != null ? (
                        {
                            text : "Sauvegarder",
                            onClick : () => {
                                Save(
                                    editor,
                                    selectedChapter,
                                    setSelectedChapter,
                                    selectedProject,
                                    newCharacterCount,
                                    startingDate,
                                    startedAt
                                )
                                SaveByButton(selectedProject, setProjects, projects, selectedChapter);
                            },
                            className : "primary"
                        }
                    ) : (
                        cancel(setDisplay, null, selectedChapter == null || selectedProject == null ? (
                            "Quitter"
                        ) : null)
                    )
                ]}
                additional_content={[
                    selectedChapter ? (
                        <SelectChapters
                            selectedChapter={selectedChapter}
                            PreSave={PreSave}
                            modificationActive={modificationActive}
                            setModificationActive={setModificationActive}
                            newCharacterCount={newCharacterCount}
                            dailyObjective={dailyObjective}
                            selectedProject={selectedProject}
                        />
                    ) : null,
                    selectedProject ? (
                        null
                    ) : (
                        <InnerProjectsDisplayer
                            projects={projects}
                            setSelectedProject={setSelectedProject}
                            setDisplay={setDisplay}
                            setShowAlert={setShowAlert}
                        />
                    ),
                    selectedProject && selectedChapter == null ? (
                        <InnerChaptersDisplayer
                            globalDisplayChapters={globalDisplayChapters}
                            setSelectedChapter={setSelectedChapter}
                            selectedProject={selectedProject}
                            setDisplay={setDisplay}
                            setShowAlert={setShowAlert}
                            setGlobalDisplayChapters={setGlobalDisplayChapters}
                            setSelectedProject={setSelectedProject}
                            setProjects={setProjects}
                        />  
                    ) : null,
                    selectedChapter != null && selectedProject != null ? (
                        <div id="editor">
                            
                        </div>
                    ) : null
                ]}
            />
        </>
    )
};

TextEditor.propTypes = {
    setDisplay : PropTypes.func,
    setShowAlert : PropTypes.func,
    selectedProject : PropTypes.object,
    setSelectedProject : PropTypes.func,
    selectedChapter : PropTypes.object,
    setSelectedChapter : PropTypes.func
};

export default TextEditor;
