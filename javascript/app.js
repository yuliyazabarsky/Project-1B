// Initialize Firebase
var config = {
    apiKey: "AIzaSyAPBwhM5XUGWLitLBCWC-E6PxuK8EnsOkU",
    authDomain: "project-1-e4560.firebaseapp.com",
    databaseURL: "https://project-1-e4560.firebaseio.com",
    projectId: "project-1-e4560",
    storageBucket: "project-1-e4560.appspot.com",
    messagingSenderId: "687959041368"
  }; 

  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  var city = "";
  var state = "";



var database = firebase.database();

var searchRef = database.ref("/searches");


var brewery = [];

$("#runSearch").on("click", function (event) {
    event.preventDefault();


    city = $("#city-input").val().trim();
    state = $("#state-input").val().trim();

    var modal = 0;

    database.ref().push({
        city: city,
        state: state,
        timeAdded: firebase.database.ServerValue.TIMESTAMP
    })

    // validateForm
    var y = $("#city-input").val();
    if (y == "") {
        modal = document.getElementById('myCityModal');
        modal.style.display = "block";
        // alert("Please enter city name");
        // var modal = document.getElementById('myModal');

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        // When the user clicks the button, open the modal 
        // btn.onclick = function () {
        //     modal.style.display = "block";
        // }

        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
        return false;
    }

    var x = $("#state-input").val();

    if (x == "") {
        modal = document.getElementById('myStateModal');
        modal.style.display = "block";
        var span = document.getElementsByClassName("close")[1];

        // When the user clicks the button, open the modal 
        // btn.onclick = function () {
        //     modal.style.display = "block";
        // }

        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

        return false;
    }

    var queryURL = "https://api.openbrewerydb.org/breweries?by_city=" + city + "&by_state=" + state + "&per_page=50";
    // var queryURL = "https://api.openbrewerydb.org/breweries?by_postal_code=" + zip + "&per_page=30";
    // Creates AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        for (var i = 0; i < response.length; i++) {

            if (response[i].latitude && response[i].longitude) {
                brewery.push(response[i]);
            }
        }
        runMap(brewery);
        // removeMarkers()
        outputRows(brewery);
        brewery = [];
        console.log(brewery);

    });

    // alert("alert");
    // $("#city-input").val("");
    // $("#state-input").val("");

});

$("#clearAll").on("click", function () {
    $("#city-input").val("");
    $("#state-input").val("");
});


function outputRows(breweries) {
    $("#cards").empty();
    for (var i = 0; i < breweries.length; i++) {


        var name = breweries[i].name;
        var address = breweries[i].street;
        var website = breweries[i].website_url;
        var phoneNumber = breweries[i].phone;

        $('#cards').append(
            $('<div class="col-sm-4">').append(
                $('<div class="card">').append(
                    $('<div class="card-body text-center">').append(

                        $('<h4 class="card-title">').text(name),
                        $('<h5 class="card-text">').text(address),
                        $('<h5 class="card-text">').text(phoneNumber),
                        $('<a class="btn btn-primary">').text("Go to website").attr('href', website ).attr("target",'_blank')
                    )
                )
            )
        )
    }
}



var map = new L.Map("map", {
    center: [39.7392, -104.9903],
    zoom: 11
});
// map.setView(, 11);

mapLink =
    '<a href="http://openstreetmap.org">OpenStreetMap</a>';
L.tileLayer(
    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; ' + mapLink + ' Contributors',
        maxZoom: 18,
    }).addTo(map);
var markers;

function runMap(cords) {

    // map.removeLayer(markers);
    map = map.setView([cords[1].latitude, cords[1].longitude], 11);
    mapLink =
        '<a href="http://openstreetmap.org">OpenStreetMap</a>';
    L.tileLayer(
        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; ' + mapLink + ' Contributors',
            maxZoom: 18,
        }).addTo(map);
    for (var i = 0; i < cords.length; i++) {
        if (!cords[i].longitude || !cords[i].latitude) {
            i++;
        } else {
            marker = new L.Marker([cords[i].latitude, cords[i].longitude])
                .bindPopup(cords[i].name + "<br>" + cords[i].street)
            // .addTo(map)
            markers = L.layerGroup([marker]).addTo(map)
        }
    }

}


function removeMarkers() {
    markers.clearLayers();
  
  // Firebase watcher + initial loader 
  database.ref().on("child_added", function(childSnapshot) {

  });

    database.ref().orderByChild("timeAdded").limitToLast(3).on("child_added", function(snapshot) {

        // Change the card 
        $('#firebasecard').prepend(
            $('<div class="col-sm-4">').append(
                $('<div class="card">').append(
                    $('<div class="card-body text-center">').append(
                        $('<h4 class="card-text">').text(city),
                        $('<h4 class="card-text">').text(state),
                       
                    )
                )
            )
        )    
    
});


