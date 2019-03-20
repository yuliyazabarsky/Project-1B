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
  

var brewery = []

$("#runSearch").on("click", function (event) {
    event.preventDefault();


    city = $("#city-input").val();
    state = $("#state-input").val();
    var modal = 0;

    database.ref().push({
        city: city,
        state: state
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

            // console.log(response[i]);


            if (response[i].latitude && response[i].longitude) {                
                brewery.push(response[i]);
            } 
        }
        map(brewery);
        outputRows(brewery);
    });

    $("#city-input").val("");
    $("#state-input").val("");

});


console.log(brewery);

function outputRows(breweries) {
    for (var i = 0; i < breweries.length; i++) {


        var name = breweries[i].name;
        var address = breweries[i].street;
        var website = breweries[i].website_url;
        var phoneNumber = breweries[i].phone;

        $('#cards').append(
            $('<div class="col-sm-4">').append(
                $('<div class="card">').append(
                    $('<div class="card-body text-center">').append(
                        $('<h5 class="card-title">').text(name),
                        $('<p class="card-text">').text(address),
                        $('<a class="btn btn-primary">').text("Go to website").attr('href', website)
                    )
                )
            )
        )

        // var cardContainer = $("<div>").addClass("col-sm-4");
        // var 
    }
}





function map(cords) {

    var map = L.map('map').setView([cords[1].latitude, cords[1].longitude], 11);


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
            // console.log(cords[i].latitude);
            // console.log(cords[i].longitude);
            marker = new L.marker([cords[i].latitude, cords[i].longitude])
                .bindPopup(cords[i].name + "<br>" + cords[i].street)
                .addTo(map)
        }
    }
}

