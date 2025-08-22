import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../modules/button';
import setAdaptativeCover from '../../../scripts/modules/main/general-modules/set-adaptative-cover';

const Project = ({ 
    project, 
    index,
    setProject,
    setDisplayUpdatePopUp,
    setDisplay,
    setViewProjectSelection,
    setSelectedProject,
    setState
 }) => {
    const [displayRolledMenu, setDisplayRolledMenu] = useState(false);
    const rollMenuRef = useRef(null);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (rollMenuRef.current && !rollMenuRef.current.contains(event.target)) {
                setDisplayRolledMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);



    return (
        <div key={index} className="project">
            <div className="roll-menu" ref={rollMenuRef}>
                <div
                    className="icon-alone-display"
                    onClick={() => {
                        setDisplayRolledMenu(!displayRolledMenu);
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 -960 960 960"
                        width="24"
                    >
                        <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
                    </svg>
                </div>
                <div
                    style={{
                        display: displayRolledMenu ? 'flex' : 'none',
                    }}
                    className="roll-menu-content"
                >
                    <Button
                        text="Modifier"
                        onClick={() => {
                            setProject(project.id);
                            setState(true);
                            console.log(
                                "This is the project that will be updated: ",
                                project
                            )
                        }}
                        className="secondary"
                    />
                </div>
            </div>
            <div className="projet-preview-content unselectable">
                    <div className="image">
                        <img src={(
                            project.image === "/public/resources/placeholders/cover_placeholder_white_theme.png" ||
                            project.image === "/public/resources/placeholders/cover_placeholder_black_theme.png"
                        ) ? setAdaptativeCover() : project.image} alt="project" />
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
            </div>
            <div className="actions">
                <div className="actions-row">
                    <Button
                        text="Mettre à jour"
                        onClick={() => setDisplayUpdatePopUp(project)}
                        className="primary width100"
                    />
                    <Button
                        icon='<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Z"/></svg>'
                        onClick={() => {
                            setDisplay(true);
                            setProject(project);
                        }}
                        className="primary"
                    />
                    <Button
                        icon='<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M160-120q-17 0-28.5-11.5T120-160v-97q0-16 6-30.5t17-25.5l505-504q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L313-143q-11 11-25.5 17t-30.5 6h-97Zm544-528 56-56-56-56-56 56 56 56Z"/></svg>'
                        className="primary"
                        onClick={() => {
                            setViewProjectSelection(true);
                            setSelectedProject(project);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

Project.propTypes = {
    project: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    setProject: PropTypes.func.isRequired,
    setDisplayUpdatePopUp: PropTypes.func.isRequired,
    setDisplay: PropTypes.func.isRequired,
    setViewProjectSelection: PropTypes.func.isRequired,
    setSelectedProject: PropTypes.func.isRequired,
    setState: PropTypes.func.isRequired,
};

export default Project;