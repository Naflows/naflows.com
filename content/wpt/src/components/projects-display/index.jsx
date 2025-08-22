import localstorage_name from '../../main';
import PropTypes from 'prop-types';

import '../../../public/styles/components/main/ProjectsDisplay.scss';
import { useState } from 'react';
import NewProject from '../../scripts/alert/display/create-new-project';
import Project from './components/project';

const ProjectsDisplay = ({
    setDisplayUpdatePopUp,
    setProject, 
    setDisplay,
    project,
    setViewProjectSelection,
    setSelectedProject
}) => {
    const projects = JSON.parse(localStorage.getItem(localstorage_name)).projects || [];

    const [
        state, setState
    ] = useState(false);





    return (
        <div className="projects-container">
            {
                state && (
                    <NewProject
                        setState={setState}
                        update={true}
                        projectId={project}
                    />
                )
            }
            {
                projects.map((project,index) => {
                    return <Project
                        key={index}
                        project={project}
                        index={index}
                        setProject={setProject}
                        setDisplayUpdatePopUp={setDisplayUpdatePopUp}
                        setDisplay={setDisplay}
                        setViewProjectSelection={setViewProjectSelection}
                        setSelectedProject={setSelectedProject}
                        setState={setState}
                    />
                })
            }
        </div>
    )
}

ProjectsDisplay.propTypes = {
    setDisplayUpdatePopUp: PropTypes.func,
    setProject: PropTypes.func,
    setDisplay: PropTypes.func,
    project: PropTypes.object,
    setViewProjectSelection: PropTypes.func,
    setSelectedProject: PropTypes.object,
    
}

export default ProjectsDisplay;