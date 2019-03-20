var brewery = []

$("#runSearch").on("click", function (event) {
    event.preventDefault();


    var city = $("#city-input").val();
    var state = $("#state-input").val();
    var modal = 0;

    // validateForm
    var y = $("#city-input").val();
    if (y == "") {
        modal = document.getElementById('myCityModal');
        modal.style.display = "block";
        // alert("Please enter city name");
        // var modal = document.getElementById('myModal');

        // // Get the button that opens the modal
        // var btn = document.getElementById("myBtn");

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
            if (!response[i].latitude || !response[i].longitude) {
                i++;
            } else {
                brewery.push(response[i]);
            }
        }
        map(brewery);
    });


    $("#city-input").val("");
    $("#state-input").val("");







});

console.log(brewery);

function map(cords) {

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

// function updateResultsCards() {
//     // no limit on results
//     var numBreweries = $("#").val();

//     console.log();
//     console.log("------------------------------------");

//     // Loop through and build elements for the defined number of articles
//     for (var i = 0; i < numArticles; i++) {
//       // Get specific article info for current index
//       var article = NYTData.response.docs[i];

//       // Increase the articleCount (track article # - starting at 1)
//       var articleCount = i + 1;

//       // Create the  list group to contain the articles and add the article content for each
//       var $articleList = $("<ul>");
//       $articleList.addClass("list-group");

//       // Add the newly created element to the DOM
//       $("#article-section").append($articleList);

//       // If the article has a headline, log and append to $articleList
//       var headline = article.headline;
//       var $articleListItem = $("<li class='list-group-item articleHeadline'>");

//       if (headline && headline.main) {
//         console.log(headline.main);
//         $articleListItem.append(
//           "<span class='label label-primary'>" +
//             articleCount +
//             "</span>" +
//             "<strong> " +
//             headline.main +
//             "</strong>"
//         );
//       }