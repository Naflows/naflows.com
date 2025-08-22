import PropTypes from "prop-types";
import Input from "../../../../../../components/modules/input";
import Button from "../../../../../../components/modules/button";

const NewProjectEnd = ({ 
    update, 
    project, 
    updateWordsPerDay,
    idleState,
    end,
    setEnd
}) => {
    return (
        <div className={`field`}>
            <label htmlFor="project_end">{
            idleState ? "Date de fin" : "Date de fin (optionnel)"
            }</label>
            <div className="input-container">
                <Button
                    icon={
                        (idleState) ?
                        `
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m480-424 116 116q11 11 28 11t28-11q11-11 11-28t-11-28L536-480l116-116q11-11 11-28t-11-28q-11-11-28-11t-28 11L480-536 364-652q-11-11-28-11t-28 11q-11 11-11 28t11 28l116 116-116 116q-11 11-11 28t11 28q11 11 28 11t28-11l116-116Zm0 344q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg>
                        ` : `
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M440-440v120q0 17 11.5 28.5T480-280q17 0 28.5-11.5T520-320v-120h120q17 0 28.5-11.5T680-480q0-17-11.5-28.5T640-520H520v-120q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640v120H320q-17 0-28.5 11.5T280-480q0 17 11.5 28.5T320-440h120Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg>
                        `
                    }
                    onClick={() => setEnd(!end)}
                    className="primary"
                />
                <Input 
                    type="date" 
                    value={
                        update ? project.end : (new Date().toISOString().split("T")[0])
                    } 
                    onChange={() => updateWordsPerDay()} 
                    className={`${idleState  ? "" : "idle"}`}
                    parameters={{
                        id : "project_end"
                    }}
                />
                <div id="date_informations" className={
                    `input-result-displayer ${idleState  ? "" : "idle"}`
                }>
                    
                </div>
            </div>
        </div>
    )
}

NewProjectEnd.propTypes = {
    update: PropTypes.bool.isRequired,
    project: PropTypes.object.isRequired,
    updateWordsPerDay: PropTypes.func.isRequired,
    idleState: PropTypes.bool.isRequired,
    end: PropTypes.bool.isRequired,
    setEnd: PropTypes.func.isRequired
}

export default NewProjectEnd;