var brewery = []

$("#runSearch").on("click", function (event) {
    event.preventDefault();

    var zip = $("#zip-code-input").val();
    var city = $("#city-input").val();
    var state = $("#state-input").val();
    var numRecords = $("#numRecordsSelect").val();

    console.log(zip);
    console.log(city);
    console.log(state);



    // var movie = $(this).attr("data-name");

    var queryURL = "https://api.openbrewerydb.org/breweries?by_city=" + city + "&by_state=" + state + "&per_page=" +
        numRecords + "";
    // var queryURL = "https://api.openbrewerydb.org/breweries?by_postal_code=" + zip + "&per_page=30";
    // Creates AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        for (var i = 0; i <= response.length; i++) {
            console.log(response[i]);
            brewery.push(response[i]);


        }
        console.log(brewery)
        map(brewery);

    });

    $("#zip-code-input").val("");
    $("#city-input").val("");
    $("#state-input").val("");
    $("#numRecordsSelect").val(5);
});

console.log(brewery);

//MAP!!
var planes = [
    ["Kokopelli", 39.8590102032, -105.064038586],
    ["Kokopelli", 39.8590102032, 105.064038586],
];
// var map = L.map('map').setView([39.8590102032, -105.064038586], 10);
// mapLink =
//     '<a href="http://openstreetmap.org">OpenStreetMap</a>';
// L.tileLayer(
//     'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '&copy; ' + mapLink + ' Contributors',
//         maxZoom: 18,
//     }).addTo(map);
// for (var i = 0; i < planes.length; i++) {
//     marker = new L.marker([planes[i][1], planes[i][2]])
//         .bindPopup(planes[i][0])
//         .addTo(map);
// }



function map(cords) {
    var map = L.map('map').setView([39.8590102032, -105.064038586], 10);
    mapLink =
        '<a href="http://openstreetmap.org">OpenStreetMap</a>';
    L.tileLayer(
        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; ' + mapLink + ' Contributors',
            maxZoom: 18,
        }).addTo(map);
    console.log(cords);
    for (var i = 0; i <= cords.length; i++) {
        if (!cords[i].longitude || !cords[i].latitude) {
            i++;
        } else {
            console.log(cords[i].latitude);
            console.log(cords[i].longitude);
            marker = new L.marker([cords[i].latitude, cords[i].longitude])
                .bindPopup(cords[i].name)
                .addTo(map)
        }
    }
}

// map(planes)

// (function($) {
//     "use strict"; // Start of use strict

//     // Closes the sidebar menu
//     $(".menu-toggle").click(function(e) {
//       e.preventDefault();
//       $("#sidebar-wrapper").toggleClass("active");
//       $(".menu-toggle > .fa-bars, .menu-toggle > .fa-times").toggleClass("fa-bars fa-times");
//       $(this).toggleClass("active");
//     });

//     // Smooth scrolling using jQuery easing
//     $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
//       if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
//         var target = $(this.hash);
//         target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
//         if (target.length) {
//           $('html, body').animate({
//             scrollTop: target.offset().top
//           }, 1000, "easeInOutExpo");
//           return false;
//         }
//       }
//     });

//     // Closes responsive menu when a scroll trigger link is clicked
//     $('#sidebar-wrapper .js-scroll-trigger').click(function() {
//       $("#sidebar-wrapper").removeClass("active");
//       $(".menu-toggle").removeClass("active");
//       $(".menu-toggle > .fa-bars, .menu-toggle > .fa-times").toggleClass("fa-bars fa-times");
//     });

//     // Scroll to top button appear
//     $(document).scroll(function() {
//       var scrollDistance = $(this).scrollTop();
//       if (scrollDistance > 100) {
//         $('.scroll-to-top').fadeIn();
//       } else {
//         $('.scroll-to-top').fadeOut();
//       }
//     });

//   })(jQuery); // End of use strict

//   // Disable Google Maps scrolling
//   // See http://stackoverflow.com/a/25904582/1607849
//   // Disable scroll zooming and bind back the click event
//   var onMapMouseleaveHandler = function(event) {
//     var that = $(this);
//     that.on('click', onMapClickHandler);
//     that.off('mouseleave', onMapMouseleaveHandler);
//     that.find('iframe').css("pointer-events", "none");
//   }
//   var onMapClickHandler = function(event) {
//     var that = $(this);
//     // Disable the click handler until the user leaves the map area
//     that.off('click', onMapClickHandler);
//     // Enable scrolling zoom
//     that.find('iframe').css("pointer-events", "auto");
//     // Handle the mouse leave event
//     that.on('mouseleave', onMapMouseleaveHandler);
//   }
//   // Enable map zooming with mouse scroll when the user clicks the map
//   $('.map').on('click', onMapClickHandler);



