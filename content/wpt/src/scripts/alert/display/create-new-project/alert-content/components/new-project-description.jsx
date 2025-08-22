import PropTypes from "prop-types";
import Input from "../../../../../../components/modules/input";

const NewProjectDescription = ({ 
    update,
    project
}) => {
    return (
        <div className="field">
            <label htmlFor="project_description">Description du projet</label>
            <Input type="text" placeholder="Description du projet" value={
                update ? project.description : ""
            } onChange={() => {}} className="textarea" parameters={{id: "project_description"}} />
        </div>
    )
}

NewProjectDescription.propTypes = {
    update: PropTypes.bool.isRequired,
    project: PropTypes.object.isRequired,
    imageSrc: PropTypes.string,
    setImageSrc: PropTypes.func
}

export default NewProjectDescription;