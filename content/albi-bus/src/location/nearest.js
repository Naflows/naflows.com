import getUserLocation from "./location";

function haversineDistance(lat1, lon1, lat2, lon2) {
    var R = 6371e3; // metres
    var φ1 = lat1 * Math.PI/180; // φ, λ in radians
    var φ2 = lat2 * Math.PI/180;
    var Δφ = (lat2-lat1) * Math.PI/180;
    var Δλ = (lon2-lon1) * Math.PI/180;

    var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    var d = R * c; // in metres
    return d;
}


async function FindNearest(locations,s) {
    getUserLocation()
        .then(location => {
            console.log(location + " is location");
            const latitude = parseFloat(location[0]);
            const longitude = parseFloat(location[1]);

            let nearPoint;
            let minDistance = Infinity;

            for (const l in locations) {
                const location = locations[l];
                const locationLatitude = parseFloat(location.stop_lat);
                const locationLongitude = parseFloat(location.stop_lon);
                const distance = haversineDistance(latitude, longitude, locationLatitude, locationLongitude);
                if (distance < minDistance) {
                    minDistance = distance;
                    nearPoint = location;
                }
            }
            if (s) {
                s(nearPoint);
            } else return s;
        })
        .catch(error => {
            console.error("Error getting user location:", error);
        });
}


export default FindNearest;
