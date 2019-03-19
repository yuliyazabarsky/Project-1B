var brewery = []

$("#runSearch").on("click", function (event) {
    event.preventDefault();

    var city = $("#city-input").val();
    var state = $("#state-input").val();

    // validateForm
    var x = $("#state-input").val();
    if (x == "") {
        alert("State must be selected");
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
                if (!response[i].latitude || !response[i].longitude) {
                    i++;
                } else {
                    brewery.push(response[i]);
                }
            }
            map(brewery);

        });

        $("#zip-code-input").val("");
        $("#city-input").val("");
        $("#state-input").val("");
        $("#numRecordsSelect").val(5);


    


});

console.log(brewery);

function map(cords) {
    console.log(cords[1].latitude);
    console.log(cords[1].longitude);
    var map = L.map('map').setView([cords[1].latitude, cords[1].longitude], 10);
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
                .bindPopup(cords[i].name)
                .addTo(map)
        }
    }
}
