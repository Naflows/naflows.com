import fs from "fs";

const project = {
    "name" : "Projet 1",
    "image" : "https://via.placeholder.com/150",
    "stats" : {
        "total" : 0,
        "sessions" : []
    },
    "length" : 10000
}

for (let i = 0; i < 100; i++) {
    const words = Math.floor(Math.random() * 1000);
    const date = `2021-01-${i+1}`;
    const hours = Math.floor(Math.random() * 24);
    const minutes = Math.floor(Math.random() * 60);
    const mood = Math.floor(Math.random() * 5);
    const notes = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac nisi nec odio";
    const session = {
        words,
        date,
        hours,
        minutes,
        mood,
        notes
    };
    project.stats.sessions.push(session);
    project.stats.total += words;
}

const projectJSON = JSON.stringify(project); 
fs.writeFile('C:\\Users\\Utilisateur\\Desktop\\Naflouille Creations\\NFCTools\\wpt\\public\\styles/res.json', projectJSON, (err) => { 
    if (err) { 
        console.error('Error saving project:', err); 
    } else { 
        console.log('Project saved successfully!'); 
    } 
});
