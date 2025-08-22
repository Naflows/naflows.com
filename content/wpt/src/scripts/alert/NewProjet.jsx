import PropTypes from 'prop-types';
import Alert from '../../components/main/alert';
import Input from '../../components/modules/input';
import cancel from './WhereCancelButtonIs';


import '../../../public/styles/scripts/alert/NewProjet.scss';
import Button from '../../components/modules/button';
import { useState } from 'react';
import localstorage_name from '../../main';
import { v4 } from 'uuid';

const updateWordsPerDay = () => {
    const ms = new Date(document.querySelector("#project_end").value).getTime() - new Date().getTime();
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const words = parseInt(document.querySelector('#project_length').value);
    document.querySelector("#date_informations").innerHTML = `${Math.round(words/days)} mots par jour`
}

const NewProject = ({
    setState,
    update = false,
    pj_id = null
}) => {
    console.log("Attempting to update project",pj_id)

    const [
        project, setProject
    ] = useState(null);
    const [
        end, setEnd
    ] = useState(project && project.end ? true : false);
    const [imageSrc, setImageSrc] = useState("https://via.placeholder.com/150");


    if (pj_id && !project) {
        const lc = JSON.parse(localStorage.getItem(localstorage_name));
        const project = lc.projects.find((p) => p.id === pj_id);
        console.log("Update: project is",project)
        setProject(project);
        setImageSrc(project.image)
    }








    const addProject = () => {
        const lc = JSON.parse(localStorage.getItem(localstorage_name)) || [];

        const _project = {
            name: document.querySelector("#project_name").value,
            description: document.querySelector("#project_description").value,
            length: document.querySelector("#project_length").value,
            end: end ? document.querySelector("#project_end").value : null,
            image: imageSrc,
            id : (update ? project.id : v4()),
            chapters : update ? project.chapters : [],

            stats : update ? project.stats : {
                total : 0,
                sessions : []
            }
        };

        if (update) {
            const index = lc.projects.findIndex((p) => p.id === project.id);
            lc.projects[index] = _project;
        } else {
            lc.projects.push(_project);
        }

        localStorage.setItem(localstorage_name, JSON.stringify(lc));
        setState(false);
    }

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        
        const reader = new FileReader();

        reader.onloadend = () => {
            setImageSrc(reader.result);

        };

        if (file && file.size > 200 * 8 ) {
            reader.readAsDataURL(file);
        }
    };

    if ((update && project) || (!update && !project)) {
        return (
            <Alert 
                title={
                    update ? `Modifier ${project.name}` : "Nouveau projet"
                }
                message={
                    update ? "Modifier les informations du projet" : "Créer un nouveau projet"
                }
                showCloseButton={true}
                className=""
                buttons={[
                    {
                        text: update ? "Modifier" : "Ajouter",
                        onClick: () => {
                            addProject();
                        },
                        className: "primary",
                        style: {}
                    },
                    update ? {
                        text: "Supprimer",
                        className: "secondary",
                        style: {},
                        parameters : {
                            onDoubleClick : () => {
                                const lc = JSON.parse(localStorage.getItem(localstorage_name));
                                const index = lc.projects.findIndex((p) => p.id === project.id);
                                lc.projects.splice(index, 1);
                                localStorage.setItem(localstorage_name, JSON.stringify(lc));
                                setState(false); 
                            }
                        }
                    } : null,
                    cancel(setState)
                ]}
                additional_content={[
                    <div key={1} className="field header-special">
                        <div className="input">
                            <label htmlFor="project_name">Nom du projet</label>
                            <Input type="text" placeholder="Nom du projet" value={
                                update ? project.name : ""
                            } onChange={() => {}} className="" parameters={{id: "project_name"}} />
                        </div>
                        <div className="new-image">
                            <div className="image" onClick={() => {
                                document.querySelector(".fileAddition").click();
                            }}>
                                <img src={imageSrc} alt="project" />
                            </div>
                            <Input 
                                type="file" 
                                placeholder="Upload"
                                onChange={handleImageUpload} 
                                className="fileAddition" 
                                style={{}}
                                parameters={{
                                    accept: "image/*"
                                }}
                            />
                        </div>
                    </div>,
                    <div key={2} className="field">
                        <label htmlFor="project_description">Description du projet</label>
                        <Input type="text" placeholder="Description du projet" value={
                            update ? project.description : ""
                        } onChange={() => {}} className="textarea" parameters={{id: "project_description"}} />
                    </div>,
                    <div key={3} className="field">
                        <label htmlFor="project_length">Longueur du projet</label>
                        <Input 
                            type="number" 
                            placeholder="1500" 
                            value={
                                update ? project.length : 1000
                            } 
                            onChange={() => updateWordsPerDay()} 
                            className="" 
                            style={{}} 
                            parameters={{
                                step : 500,
                                min: 1000,
                                id : "project_length"
                            }}
                        />
                    </div>,
                    <Button key={4}
                        text={
                            (end || (update && project.end)) ? "Annuler la fin du projet" : "Définir la fin du projet"
                        }
                        onClick={() => setEnd(!end)}
                        className="primary"
                    />,
                    <div key={5} className={`field ${end ? "" : "idle"}`}>
                        <label htmlFor="project_end">Fin du projet</label>
                        <div className="input-container">
                            <Input 
                                type="date" 
                                value={
                                    update ? project.end : (new Date().toISOString().split("T")[0])
                                } 
                                onChange={() => updateWordsPerDay()} 
                                className="" 
                                parameters={{
                                    id : "project_end"
                                }}
                            />
                            <div id="date_informations" className='input-result-displayer'>
                                
                            </div>
                        </div>
                    </div>,
                ]}
            
            />
        )
    }
};

NewProject.propTypes = {
    setState: PropTypes.func,
    update: PropTypes.bool,
    pj_id: PropTypes.number
};

export default NewProject;