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
            if (!response[i].latitude || !response[i].longitude) {
                i++;
            } else {
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
        
        var resultDiv = $("<div class='brewery-spot'></div>");
        var h4 = $("<h4>").text(name);
        var p = $("<p>").text(address);
        var pPhone = $("<p>").text(phoneNumber);
        var url = $("<a href='" + website + "' ></a>").text(website);
        resultDiv.append(h4, p, pPhone, url);
        $("#wellSection").append(resultDiv);

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

