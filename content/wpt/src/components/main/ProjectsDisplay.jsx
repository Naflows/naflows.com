import localstorage_name from '../../main';
import PropTypes from 'prop-types';

import '../../../public/styles/components/main/ProjectsDisplay.scss';
import Button from '../modules/button';
import { useState } from 'react';
import NewProject from '../../scripts/alert/NewProjet';

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
                        pj_id={project}
                    />
                )
            }
            {
                projects.map((project,index) => {
                    return (
                        <div key={index} className="project" >
                            <div className="image">
                                <img src={project.image} alt="project" />
                            </div>
                            <div className="header">
                                <div className="name">
                                    {project.name}
                                </div>
                                <div className="words">
                                    <div className="written">
                                        {project.stats.total} / {project.length}
                                    </div>
                                </div>
                            </div>
                            <div className="actions">
                                <div className="actions-row">
                                    <Button 
                                        text="Mettre à jour"
                                        onClick={() => setDisplayUpdatePopUp(project)}
                                        className="primary width100"
                                    />
                                    <Button 
                                        icon = '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Z"/></svg>'
                                        onClick={() => {
                                            setDisplay(true)
                                            setProject(project)
                                        }}
                                        className="primary"
                                    />
                                    <Button
                                        icon='<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M160-120q-17 0-28.5-11.5T120-160v-97q0-16 6-30.5t17-25.5l505-504q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L313-143q-11 11-25.5 17t-30.5 6h-97Zm544-528 56-56-56-56-56 56 56 56Z"/></svg>'
                                        className='primary'
                                        onClick={() => {
                                            setViewProjectSelection(true)
                                            setSelectedProject(project)
                                        }}
                                    />
                                </div>
                                <Button 
                                    text="Modifier"
                                    onClick={() => {
                                        setProject(project.id)
                                        setState(true)
                                    }}
                                    className="secondary"
                                />
                            </div>
                        </div>
                    )
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
    setSelectedProject: PropTypes.object
}

export default ProjectsDisplay;