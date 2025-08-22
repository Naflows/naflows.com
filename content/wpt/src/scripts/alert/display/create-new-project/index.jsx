import PropTypes from 'prop-types';
import Alert from '../../../../components/main/alert';


import '../../../../../public/styles/scripts/alert/NewProjet.scss';
import { useEffect, useState } from 'react';
import appStorage from '../../../modules/main/storage-management/directory';
import wordsPerDayRatio from '../../../modules/main/general-modules/words-day-ratio';
import createNewProject__buttons from './alert-content/variables/buttons';
import NewProjectHeader from './alert-content/components/new-project-header';
import NewProjectDescription from './alert-content/components/new-project-description';
import NewProjectEnd from './alert-content/components/new-project-end';
import NewProjectLength from './alert-content/components/new-project-length';
import setAdaptativeCover from '../../../modules/main/general-modules/set-adaptative-cover';

const updateWordsPerDay = () => {
    const ratio = wordsPerDayRatio(
        document.querySelector("#project_end").value,
        document.querySelector("#project_length").value
    );
    document.querySelector("#date_informations").innerHTML = `${ratio} mots par jour`
}

const CreateNewProject = ({
    setState,
    update = false,
    projectId = null
}) => {
    
    const [end, setEnd] = useState(null);
    const [alert,setAlert] = useState({});
    const [project, setProject] = useState(null);
    const [idleState, setIdleState] = useState(true);
    const [imageSrc, setImageSrc] = useState(setAdaptativeCover());


    // If the project is being updated, we need to find it in the projects library
    if (update && projectId && !project) {
        const project = appStorage.projectsLib.find(projectId);

        setProject(project);
        setImageSrc((
            project.image ==  "/public/resources/placeholders/cover_placeholder_white_theme.png" ||
            project.image == "/public/resources/placeholders/cover_placeholder_black_theme.png"
        ) ? setAdaptativeCover() : project.image);
        setEnd(project && project.end ? true : false);
        setAlert({
            title : update ? `Modifier ${project.name}` : "Nouveau projet"
        });
    }

    useEffect(() => {
        setIdleState(end)
    }, [end])
 


    if ((update && project) || (!update && !project)) {
        return (
            <Alert 
                title={alert.title}
                message={alert.message}
                showCloseButton={true}
                buttons={createNewProject__buttons(setState, update, project, end, imageSrc)}
                additional_content={[
                    <NewProjectHeader
                        key={0}
                        imageSrc={imageSrc}
                        setImageSrc={setImageSrc}
                        project={project}
                        update={update}
                    />,
                    <NewProjectDescription
                        key={1}
                        project={project}
                        update={update}
                    />,
                    <NewProjectLength
                        key={2}
                        update={update}
                        project={project}
                        updateWordsPerDay={updateWordsPerDay}
                    />,
                    <NewProjectEnd
                        key={3}
                        update={update}
                        project={project}
                        updateWordsPerDay={updateWordsPerDay}
                        idleState={idleState}
                        end={end}
                        setEnd={setEnd}
                    />,
                ]}
            
            />
        )
    }
};

CreateNewProject.propTypes = {
    setState: PropTypes.func,
    update: PropTypes.bool,
    projectId: PropTypes.number
};

export default CreateNewProject;