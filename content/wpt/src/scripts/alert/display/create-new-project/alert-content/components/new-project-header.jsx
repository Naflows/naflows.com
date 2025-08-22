import PropTypes from "prop-types";
import Input from "../../../../../../components/modules/input";
import handleImageUpload from "../../../../../modules/main/general-modules/project-edition-image-handler";

const NewProjectHeader = ({ 
    update,
    project,
    imageSrc,
    setImageSrc
}) => {
    return (
        <div className="field header-special">
        <div className="input">
            <label htmlFor="project_name">Nom du projet</label>
            <div className="display-column">
                <Input type="text" placeholder="Nom du projet" value={
                    update ? project.name : ""
                } onChange={() => {}} className="" parameters={{id: "project_name"}} />
                <span className="message-alert" style={{display:"none"}}>
                    Un nom de projet est requis
                </span>
            </div>
        </div>
        <div className="new-image">
            <div className="image" onClick={() => {
                document.querySelector(".fileAddition").click();
            }}>
                <img src={imageSrc} alt="project" />
                <div className="icon-alone-display">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M720-600q-17 0-28.5-11.5T680-640v-40h-40q-17 0-28.5-11.5T600-720q0-17 11.5-28.5T640-760h40v-40q0-17 11.5-28.5T720-840q17 0 28.5 11.5T760-800v40h40q17 0 28.5 11.5T840-720q0 17-11.5 28.5T800-680h-40v40q0 17-11.5 28.5T720-600ZM280-280h400q12 0 18-11t-2-21L586-459q-6-8-16-8t-16 8L450-320l-74-99q-6-8-16-8t-16 8l-80 107q-8 10-2 21t18 11Zm-80 160q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h320q17 0 28.5 11.5T560-800v120q0 17 11.5 28.5T600-640h40v40q0 17 11.5 28.5T680-560h120q17 0 28.5 11.5T840-520v320q0 33-23.5 56.5T760-120H200Z"/></svg>
                </div>
            </div>
            <Input 
                type="file" 
                placeholder="Upload"
                onChange={() => {
                    handleImageUpload(
                        document.querySelector("#project_image").files,
                        setImageSrc
                    );
                }} 
                className="fileAddition" 
                style={{}}
                parameters={{
                    accept: "image/*",
                    id : "project_image"
                }}
            />
        </div>
    </div>
    )
}

NewProjectHeader.propTypes = {
    update: PropTypes.bool.isRequired,
    project: PropTypes.object.isRequired,
    imageSrc: PropTypes.string.isRequired,
    setImageSrc: PropTypes.func.isRequired
}

export default NewProjectHeader;