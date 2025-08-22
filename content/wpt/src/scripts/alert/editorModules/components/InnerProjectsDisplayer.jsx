import PropTypes from 'prop-types';
import Button from '../../../../components/modules/button';

const InnerProjectsDisplayer = ({
    projects,
    setDisplay,
    setSelectedProject,
    setShowAlert
}) => {

    return (
        <div className="field">
            <div className="projects">
                <Button
                    icon='<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M440-440v120q0 17 11.5 28.5T480-280q17 0 28.5-11.5T520-320v-120h120q17 0 28.5-11.5T680-480q0-17-11.5-28.5T640-520H520v-120q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640v120H320q-17 0-28.5 11.5T280-480q0 17 11.5 28.5T320-440h120Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg>'
                    text="Nouveau projet"
                    onClick={() => {
                        setDisplay(false);
                        setShowAlert(true);
                    }}
                    className='primary'
                />
                {projects.map((project, index) => {
                    return (
                        <div
                            key={index}
                            className="project"
                            onClick={() => setSelectedProject(project)}
                        >
                            <img src={project.image} />
                            <div className="name">{project.name}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

InnerProjectsDisplayer.propTypes = {
    projects: PropTypes.array,
    setDisplay: PropTypes.func,
    setSelectedProject: PropTypes.func,
    setShowAlert: PropTypes.func
};

export default InnerProjectsDisplayer;