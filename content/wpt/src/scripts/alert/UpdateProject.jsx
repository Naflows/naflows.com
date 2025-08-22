import PropTypes from 'prop-types';
import Alert from '../../components/main/alert';
import cancel from './WhereCancelButtonIs';
import Input from '../../components/modules/input';
import { useState } from 'react';
import localstorage_name from '../../main';
import moods from '../modules/moods';




/*
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-260q68 0 123.5-38.5T684-400H276q25 63 80.5 101.5T480-260ZM312-520l44-42 42 42 42-42-84-86-86 86 42 42Zm250 0 42-42 44 42 42-42-86-86-84 86 42 42ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M620-520q25 0 42.5-17.5T680-580q0-25-17.5-42.5T620-640q-25 0-42.5 17.5T560-580q0 25 17.5 42.5T620-520Zm-280 0q25 0 42.5-17.5T400-580q0-25-17.5-42.5T340-640q-25 0-42.5 17.5T280-580q0 25 17.5 42.5T340-520Zm140 260q68 0 123.5-38.5T684-400h-66q-22 37-58.5 58.5T480-320q-43 0-79.5-21.5T342-400h-66q25 63 80.5 101.5T480-260Zm0 180q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M620-520q25 0 42.5-17.5T680-580q0-25-17.5-42.5T620-640q-25 0-42.5 17.5T560-580q0 25 17.5 42.5T620-520Zm-280 0q25 0 42.5-17.5T400-580q0-25-17.5-42.5T340-640q-25 0-42.5 17.5T280-580q0 25 17.5 42.5T340-520Zm140 100q-68 0-123.5 38.5T276-280h66q22-37 58.5-58.5T480-360q43 0 79.5 21.5T618-280h66q-25-63-80.5-101.5T480-420Zm0 340q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-420q-68 0-123.5 38.5T276-280h408q-25-63-80.5-101.5T480-420Zm-168-60 44-42 42 42 42-42-42-42 42-44-42-42-42 42-44-42-42 42 42 44-42 42 42 42Zm250 0 42-42 44 42 42-42-42-42 42-44-42-42-44 42-42-42-42 42 42 44-42 42 42 42ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg>
                    

*/


const UpdateProject = ({
    setState,
    project
}) => {
    console.log("Attempting to update project",project)

    const [
        selectedMood, setSelectedMood
    ]  = useState("Heureux");

    const [
        wordsAlert, setWordsAlert
    ] = useState(false);

    const update = () => {
        try {
            const words = parseInt(document.getElementById("words").value);

            if (isNaN(words) || words === 0) {
                setWordsAlert(true);
            } else {
                const projects = JSON.parse(localStorage.getItem(localstorage_name)).projects;
                const index = projects.findIndex(p => p.id == project.id);
    
                const date = document.getElementById("date").value;
                const hours = document.getElementById("hours").value;
                const minutes = document.getElementById("minutes").value;
                const notes = document.getElementById("notes").value;
    
                const session = {
                    words,
                    date,
                    hours,
                    minutes,
                    mood: selectedMood,
                    notes
                };
    
                projects[index].stats.sessions.push(session);
                projects[index].stats.total += words;
    
                localStorage.setItem(localstorage_name, JSON.stringify({projects}));
                setState(false);
            }
        } catch (e) {
            console.error(e);
        }

    };

    return (
        <Alert
            title={`Mettre à jour le projet`}
            message={`Mettre à jour ${project.name}`}
            className=""
            buttons={[
                {
                    text: "Mettre à jour",
                    onClick: () => {
                        update()
                    },
                    className: "primary"
                },
                cancel(setState, null)
            ]}
            additional_content={[
                <div key={1} className="field">
                    <label htmlFor="project_name">Nombre de mots écrits</label>
                    <Input
                        type="number"
                        placeholder="Nombre de mots"
                        parameters={{
                            id : "words",
                            min: 0
                        }}
                        value='0'
                        onChange={() => setWordsAlert(false)}
                    />
                    {wordsAlert && <div className="message-alert">Veuillez entrer un nombre valide</div>}
                </div>,
                <div key={2} className="field">
                    <label htmlFor="project_name">Durée de la session</label>
                    <div className="hour-input">
                        <Input
                            type="date"
                            value={new Date().toISOString().split('T')[0]}
                            parameters={{
                                id : "date"
                            }}
                        />
                        <Input
                            type="number"
                            parameters={{
                                min: 0,
                                max: 23,
                                id : "hours"
                            }}
                            placeholder="1"
                            value={1}
                        />
                        <Input
                            type="number"
                            parameters={{
                                min: 0,
                                max: 59,
                                id : "minutes"
                            }}
                            placeholder="30"
                            value={"00"}
                        />
                    </div>
                </div>,
                <div key={3} className="field">
                    <label htmlFor="project_name">Votre état</label>
                    <div className="moods">
                            {Object.keys(moods).map((mood, index) => {
                                
                                return (
                                    <div key={index} style={{
                                        borderRadius: "10px"
                                    }} className={`mood ${selectedMood == mood ? "selected" : ""}`} onClick={() => setSelectedMood(mood)}>
                                        <div className="emoji">
                                            {moods[mood]}
                                        </div>
                                        <div className="name">
                                            {mood}
                                        </div>
                                    </div>
                                )
                            })}
                    </div>
                </div>,
                <div className="field" key={4}>
                    <label htmlFor="project_name">Notes</label>
                    <Input
                        type="textarea"
                        placeholder="Entrez vos pensées relatives à cette session"
                        className='textarea'
                        parameters={{
                            id : "notes"
                        }}
                    />
                </div>,
            ]}
        />
    )
};

UpdateProject.propTypes = {
    setState: PropTypes.func,
    project: PropTypes.object
};

export default UpdateProject;