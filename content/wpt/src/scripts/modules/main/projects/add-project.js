import { v4 } from "uuid";
import appStorage from "../storage-management/directory";

const addProject = (
    update = false,
    project = null,
    end = false,
    imageSrc,
    localstorage_name = "projects"
) => {
    const staticLocalStorage = appStorage.get();

    const template = {
        name: document.querySelector("#project_name").value,
        description: document.querySelector("#project_description").value,
        length: document.querySelector("#project_length").value,
        end: end ? document.querySelector("#project_end").value : null,
        image: (
            imageSrc ==  "/public/resources/placeholders/cover_placeholder_white_theme.png" ||
            imageSrc == "/public/resources/placeholders/cover_placeholder_black_theme.png"
        ) ? "placeholder" : imageSrc,
        id : (update ? project.id : v4()),
        chapters : update ? project.chapters : [],

        stats : update ? project.stats : {
            total : 0,
            sessions : []
        }
    };

    if (update) {
        const index = staticLocalStorage.projects.findIndex((p) => p.id === project.id);
        staticLocalStorage.projects[index] = template;
    } else {
        staticLocalStorage.projects.push(template);
    }

    localStorage.setItem(localstorage_name, JSON.stringify(staticLocalStorage));
}

export default addProject;