
function getUserLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => resolve(showPosition(position)),
                error => reject(error)
            );
        } else {
            reject("Geolocation is not supported by this browser.");
        }
    });
}




function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    return [latitude, longitude];
}

export default getUserLocation;

