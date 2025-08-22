import localstorage_name from "../../../../main";

const DeleteChapter = (
    selectedProject,
    setSelectedProject,
    setProjects,
    chapter
) => {
    let storage = JSON.parse(localStorage.getItem(localstorage_name));
    storage.projects.forEach((project, index) => {
        if (project.id === selectedProject.id) {
            let wordsWrittenInChapter = 0;
            console.log("Selected chapter is", chapter,"for deletion")
            chapter.content.blocks.forEach((block) => {
                wordsWrittenInChapter += block.data.text.length;
            });
            selectedProject.stats.sessions = selectedProject.stats.sessions.filter((session) => session.chapter !== chapter.id);
            
            selectedProject.stats.sessions.forEach((session,index) => {
                selectedProject.stats.sessions[index].index = index + 1;
            })
            
            selectedProject.stats.total = parseInt(selectedProject.stats.total) - wordsWrittenInChapter;
            console.log(
                wordsWrittenInChapter,
                selectedProject.stats.total,
            )
            selectedProject.chapters = project.chapters.filter((c) => c.id !== chapter.id);
            storage.projects[index] = selectedProject;
        }
    });

    localStorage.setItem(localstorage_name, JSON.stringify(storage));
    setProjects(storage.projects);
    setSelectedProject(selectedProject);
}


export default DeleteChapter;