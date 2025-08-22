import fs from "fs"
// Charger les données des fichiers
const routesData = JSON.parse(fs.readFileSync('C:/Users/Utilisateur/OneDrive/Bureau/projects/albi-bus/reseau-bus-albi/routes.json', 'utf-8'));
const stopsData = JSON.parse(fs.readFileSync('C:/Users/Utilisateur/OneDrive/Bureau/projects/albi-bus/reseau-bus-albi/stops.json', 'utf-8'));

// Créer un dictionnaire pour stocker les correspondances entre les arrêts et les bus
const arretsParBus = {};

// Parcourir les arrêts pour construire le dictionnaire
stopsData.forEach(stop => {
    const parentStation = stop.parent_station;

    // Vérifier si l'arrêt est associé à un itinéraire
    routesData.forEach(route => {
        const routeId = route.route_id;
        if (parentStation === routeId) {
            // Ajouter l'arrêt à la liste des arrêts associés à cet itinéraire
            if (!arretsParBus[routeId]) {
                arretsParBus[routeId] = [];
            }
            arretsParBus[routeId].push(stop);
        }
    });
});

// Afficher le résultat
for (const [routeId, arrets] of Object.entries(arretsParBus)) {
    console.log(`Bus ${routeId}:`);
    arrets.forEach(arret => {
        console.log(`  - Arrêt ${arret.stop_name} (ID: ${arret.stop_id})`);
    });
}

