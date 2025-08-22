import appStorage from "../storage-management/directory";

const deleteProject = (
    project,
    localstorage_name 
) => {
    const staticLocalStorage = appStorage.get();
    const index = staticLocalStorage.projects.findIndex((p) => p.id === project.id);
    staticLocalStorage.projects.splice(index, 1);
    localStorage.setItem(localstorage_name, JSON.stringify(staticLocalStorage));
}

export default deleteProject;