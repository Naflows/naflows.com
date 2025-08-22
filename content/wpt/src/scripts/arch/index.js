import createEditor from "./editor";

export default function arch(
    setNewCharacterCount,
    setEditor,
    selectedProject,
    selectedChapter,
    dailyObjective
) {

    /*

        Résumons ensemble le problème initial: 
        La mise à jour des mots fonctionne correctement MAIS 
        à chaque nouvelle ouverture d'un chapitre, le contenu déjà
        écrit est ajouté à nouveau au total des mots écrits. 
        De ce fait, le total des mots écrits est faussé et augmente
        exponentiellement. 

    */

    let w = 0;
    selectedProject.stats.sessions.forEach((session) => {
        const dateParts = session.date.includes("/") ? session.date.split("/") : session.date.split("-");
        const date = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
        console.log("Date is", date)
        const today = new Date();
        if (date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) {
            w+=session.words;
        }
    })
    console.log("Initialzied new character count", w)
    setNewCharacterCount(w);

    createEditor(
        selectedChapter,
        setEditor,
        selectedProject,
        setNewCharacterCount
    )
}
