import PropTypes from "prop-types";
import Input from "../../../../../../components/modules/input";

const NewProjectLength = ({ 
    update, 
    project, 
    updateWordsPerDay
}) => {
    return (
        <div className="field">
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
        </div>
    )
}

NewProjectLength.propTypes = {
    update: PropTypes.bool.isRequired,
    project: PropTypes.object.isRequired,
    updateWordsPerDay: PropTypes.func.isRequired
}

export default NewProjectLength;