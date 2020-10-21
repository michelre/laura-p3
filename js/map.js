function displayTimer(timer){
    const $timer = document.querySelector('#timer')
    let minutes = Math.floor(timer / 60);
    let seconds = timer - minutes * 60;

    if(minutes < 10){
        minutes =  `0${minutes}`;
    }

    if(seconds < 10) {
        seconds = `0${seconds}`;
    }

    $timer.innerHTML = `${minutes} minutes et ${seconds} secondes`;
}

function submitForm(e, markerInfo){
    e.preventDefault();
    const firstName = e.target.firstname.value;
    const lastName = e.target.lastname.value;
    localStorage.setItem('firstname', firstName);
    localStorage.setItem('lastname', lastName);

    const reservationInfo = document.querySelector('#reservation-info');
    reservationInfo.innerHTML = `
        <p>Vous avez réservé la station: <b>${markerInfo.name}</b></p>
        <p>Il vous reste <b id="timer"></b> de réservation</p>
    `;

    sessionStorage.setItem('timer', 1200);
    sessionStorage.setItem('station', markerInfo.name);
    startTimer();

}

function startTimer(){
    console.log(intervalID)
    clearInterval(intervalID);
    intervalID = setInterval(function(){
        let timer = sessionStorage.getItem('timer');
        timer = timer - 1
        sessionStorage.setItem('timer', timer);
        
        displayTimer(timer)
    }, 1000);
}

function recapReservation(){
    const timer = sessionStorage.getItem('timer');
    const station = sessionStorage.getItem('station')
    if(timer > 0){
        const reservationInfo = document.querySelector('#reservation-info');
        reservationInfo.innerHTML = `
            <p>Vous avez réservé la station: <b>${station}</b></p>
            <p>Il vous reste <b id="timer"></b> de réservation</p>
        `;
        startTimer();
    }
}


function onClickMarker(markerInfo) {
    const infoStationHtml = `
        <ul>
            <li>
                <b class="info-title">Nom de la station:</b> <span>${markerInfo.name}</span></li>
            <li>
                <b class="info-title">Statut:</b> ${markerInfo.status}</li>
            <li>
                <b class="info-title">Nombre de vélos disponibles:</b> ${markerInfo.available_bikes}</li>
        </ul>    
    `
    const reservationForm = document.querySelector('#reservation-form');
    const stationInfo = document.querySelector('#station-info');
    reservationForm.style.display = 'block';
    stationInfo.innerHTML = infoStationHtml;

    const form = document.querySelector('#form-reservation');
    const firstName = document.querySelector('#firstname');
    firstName.value = localStorage.getItem('firstname');
    const lastName = document.querySelector('#lastname');
    lastName.value = localStorage.getItem('lastname');
    form.addEventListener('submit', function(e){
        submitForm(e, markerInfo);
    });
    new Canvas();
}

/*** map ***/
var lyon = [45.757284, 4.841696];
var map = L.map('map').setView(lyon, 6); /***latitude, longitude, zoom de la map ***/
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', /***affichage calque map***/ {
    maxZoom: 20
}).addTo(map);


var request = new XMLHttpRequest();
var markers = L.markerClusterGroup();
request.onreadystatechange = function () {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);

        response.forEach(element => {
            const marker = L.marker([element.position.lat, element.position.lng]);
            marker.on('click', function () {
                onClickMarker(element)
            })
            markers.addLayer(marker);
        });
    }
};
request.open("GET", "https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=c8523e3b66e877900322ed01fb74e1f4211b80b2");
request.send();

/***  Ajout d'un marqueur ***/
//var marker = L.marker(lyon).addTo(map);
/*** PopUp ***/
//marker.bindPopup('<h3> Lyon, Fr. </h3>');
map.addLayer(markers);
intervalID = null;
recapReservation(); //Au démarrage de la page