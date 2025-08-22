import appStorage from "../storage-management/directory";


const findProject = (id) => {
    const staticLocalStorage = appStorage.projectsLib.get();
    return staticLocalStorage.find((p) => p.id === id);
};

export default findProject;