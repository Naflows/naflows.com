import localstorage_name from "../../../../main";

const SaveByButton = (
    selectedProject,
    setProjects,
    projects,
    selectedChapter
) => {
    let storage = JSON.parse(localStorage.getItem(localstorage_name));
    console.log("Selected chapter is", selectedChapter)
    storage.projects.forEach((project,index) => {
        if (project.id == selectedProject.id) {
            storage.projects[index] = selectedProject
        }
    });
    localStorage.setItem(localstorage_name, JSON.stringify(storage));
    setProjects(projects);
}

export default SaveByButton;