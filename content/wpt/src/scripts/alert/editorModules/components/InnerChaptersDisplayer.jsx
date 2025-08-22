import PropTypes from 'prop-types';
import DeleteChapter from '../scripts/DeleteChapter';
import Button from '../../../../components/modules/button';
import DisplayProgress from '../DisplayProgress';
import Input from '../../../../components/modules/input';
import { v4 } from 'uuid';

const InnerChaptersDisplayer = ({
    selectedProject,
    setSelectedChapter,
    setGlobalDisplayChapters,
    globalDisplayChapters,
    setProjects,
    setSelectedProject,
}) => {

    return (
        <div className="field">
            <div className="sub-field-container display-column">
                <DisplayProgress
                    max={selectedProject.length}
                    progress={parseInt(selectedProject.stats.total)}
                />
                <div className="sub-field display-row">
                    <Button
                        icon='<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M440-440H240q-17 0-28.5-11.5T200-480q0-17 11.5-28.5T240-520h200v-200q0-17 11.5-28.5T480-760q17 0 28.5 11.5T520-720v200h200q17 0 28.5 11.5T760-480q0 17-11.5 28.5T720-440H520v200q0 17-11.5 28.5T480-200q-17 0-28.5-11.5T440-240v-200Z"/></svg>'
                        onClick={() => {
                            if (!selectedProject.chapters) {
                                selectedProject.chapters = []
                            } 
                            selectedProject.chapters.push({
                                name : "Nouveau chapitre",
                                index : selectedProject.chapters.length+1,
                                id : v4(),
                                content : {
                                    blocks : []
                                }
                            })
                            setSelectedChapter(selectedProject.chapters[selectedProject.chapters.length-1]);
                        }}
                        className='primary width-fit-content'
                    />
                    <Input
                        type="text"
                        placeholder='Rechercher un chapitre'
                        parameters={{
                            id : "chapter-search"
                        }}
                        onChange={() => {
                            let search = document.getElementById("chapter-search").value.toLowerCase();
                            if (search.length >= 2) {
                                let chapters = selectedProject.chapters.filter((chapter) => {
                                    return chapter.name.toLowerCase().includes(search) || (chapter.description && chapter.description.toLowerCase().includes(search));
                                });
                                setGlobalDisplayChapters(chapters);
                            } else {
                                setGlobalDisplayChapters(selectedProject.chapters);
                            }
                        }}
                    />
                </div>
            </div>
            <div className="chapters">
                {
                    globalDisplayChapters.map((chapter, index) => {
                        return (
                            <div
                                key={index}
                                className="chapter"
                            >
                                <div className="chapter-content" onClick={() => {
                                    setSelectedChapter(chapter);
                                }}>
                                    <div className="name">{chapter.name}</div>
                                    <div className="description">{
                                        chapter.description ? (
                                            chapter.description.length > 50 ? chapter.description.substring(0,50) + "..." : chapter.description
                                        ) : "Pas de description"
                                    }</div>
                                </div>
                                <div className="icon-alone-display" onDoubleClick={() =>{
                                    DeleteChapter(
                                        selectedProject,
                                        setSelectedProject,
                                        setProjects,
                                        chapter
                                    )
                                    setGlobalDisplayChapters(selectedProject.chapters);
                                    
                                }} >
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-120q-33 0-56.5-23.5T200-200v-520q-17 0-28.5-11.5T160-760q0-17 11.5-28.5T200-800h160q0-17 11.5-28.5T400-840h160q17 0 28.5 11.5T600-800h160q17 0 28.5 11.5T800-760q0 17-11.5 28.5T760-720v520q0 33-23.5 56.5T680-120H280Zm120-160q17 0 28.5-11.5T440-320v-280q0-17-11.5-28.5T400-640q-17 0-28.5 11.5T360-600v280q0 17 11.5 28.5T400-280Zm160 0q17 0 28.5-11.5T600-320v-280q0-17-11.5-28.5T560-640q-17 0-28.5 11.5T520-600v280q0 17 11.5 28.5T560-280Z"/></svg>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

InnerChaptersDisplayer.propTypes = {
    selectedProject: PropTypes.object,
    setSelectedChapter: PropTypes.func,
    setGlobalDisplayChapters: PropTypes.func,
    globalDisplayChapters: PropTypes.array,
    setProjects: PropTypes.func,
    setSelectedProject : PropTypes.func,
    setProjects : PropTypes.func
};

export default InnerChaptersDisplayer;