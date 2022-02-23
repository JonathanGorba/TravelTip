
const API_KEY = 'AIzaSyAzxIVlWTx09OaPGH3sYnz-brtN8-x7-84'; //TODO: Enter your API Key
// const API_KEY = ''; //TODO: Enter your API Key

export const mapService = {
    initMap,
    addMarker,
    panTo,
    geocoding
}

var gMap;

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap');
    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
                
            })
            gMap.addListener("click", (mapsMouseEvent) => {
                console.log(mapsMouseEvent.latLng.toJSON());
                const geocode= mapsMouseEvent.latLng.toJSON();
                geocoding(geocode,'reverse').then(res=>{
                    console.log(res);
                });
            });
            
            console.log('Map!', gMap);
        })
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    });
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
}

function geocoding(location, type) {
    if (type === 'normal') {
        var url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${API_KEY}`
        console.log('normal');
    } else {
        var url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${API_KEY}`
        console.log('reverse');
    }

    return fetch(url).then(res => res.json())
}


function _connectGoogleApi() {
    if (window.google) return Promise.resolve()

    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);
    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}