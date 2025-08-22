import localstorage_name from "../../../../main";

const Save = (
    editor,
    selectedChapter,
    setSelectedChapter,
    selectedProject,
    newCharacterCount,
    startingDate,
    startedAt,
    countInChanges = true
) => {
    if (selectedChapter) {
        editor.save().then((savedContent) => {
            selectedChapter.content = savedContent;
            let storage = JSON.parse(localStorage.getItem(localstorage_name));


            storage.projects.forEach((project, index) => {
                if (project.id === selectedProject.id) {
                    const words = newCharacterCount;
                    const date = startingDate;
                    const hours = Math.floor((new Date().getTime() - startedAt) / 3600000);
                    const minutes = Math.floor(((new Date().getTime() - startedAt) % 3600000) / 60000);


                    const session = {
                        words,
                        date,
                        hours,
                        minutes,
                        chapter : selectedChapter.id,
                        countInChanges : countInChanges
                    };
                    selectedProject.stats.sessions.push(session);

                    storage.projects[index] = selectedProject;


                }
            });
            localStorage.setItem(localstorage_name, JSON.stringify(storage));
            if (countInChanges) setSelectedChapter(null);
            console.log("Saved chapter", selectedChapter);
        });
    }
}


export default Save;