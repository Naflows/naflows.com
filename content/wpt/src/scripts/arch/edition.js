

export default function edition(
    e,
    selectedChapter,
    selectedProject,
    setNewCharacterCount
) {
    e.save().then((outputData) => {

        const contentLength = outputData.blocks.reduce((total, block) => total + block.data.text.length, 0);
        const previousContentLength = selectedChapter.content.blocks.reduce((total, block) => total + block.data.text.length, 0);
        const t = contentLength - previousContentLength;
        console.log("New character count", t);
        selectedProject.stats.total += t;
        // Ajouter ici la nouvelle architecture qui modifie à la source la
        // quantité de mots écrits aujourd'hui, pour pouvoir compter les 
        // chiffres négatifs.
        setNewCharacterCount(t);
    });
}