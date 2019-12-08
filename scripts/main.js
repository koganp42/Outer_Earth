
$(document).ready(function () {

    //front end styles//

    // PreLoad Function//
    $(window).on("load", function(){
        setTimeout(function(){
        $('.preload').slideUp("slow", function() {
          $(this).remove();
        });
    },3500);
      });
    
    
    //gsap/scroll magic//

    let controller = new ScrollMagic.Controller();

    new ScrollMagic.Scene({
        triggerElement: '#picOfDayContainer', offset: -150
    })
        .setClassToggle('#picOfDayContainer', 'fade-in')
        .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: '#neoCard', offset: -150
    })
        .setClassToggle('#neoCard', 'fade-in')
        .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: '#issCard', offset: -150
    })
        .setClassToggle('#issCard', 'fade-in')
        .addTo(controller);

        new ScrollMagic.Scene({
            triggerElement: '#solar-main',offset: -150
        })
        .setClassToggle('#solar-main', 'fade-in')
        .addTo(controller);
    //gsap/scroll magic//

    $(".comet-card").css("display", "none");
    $("#neoCard").on("click", function () {
       
        $("#neoCard").css("display", "none");
        $(".comet-card").css("display", "block").fadeIn();

        $('.close-icon').on('click', function () {
           
           
            $(this).closest('.card').fadeOut();
            $("#neoCard").css("display", "block");
        });
    });
   
    //POTD Modal//
    $(".info").on("click", function () {
        $("#myModal").modal("show");
    });

    //ISS Modal//
    $(".issImg").on("click", function () {
        $("#issModal").modal("show");
    });

    //SOLAR MODAL//
    $(".col-").on("click",function(){
        $("#solarModal").modal("show");
    });
    
    //front end styles//


    //NASA Pic of the Day API Call
    function getPicOfDay() {

        let nasaApiKey = "8phoKd5HeuFQGjXL2rQjtHLqkeY9a3xlESjPpoGL";
        let queryURL = "https://api.nasa.gov/planetary/apod?api_key=" + nasaApiKey;
    
        $.ajax({
            url: queryURL,
            method: "GET",
            }).then(function(response) {
                console.log(response);
                let imageEl = $("#npodImg");
                let videoEl = $(`<iframe class="picOfDay" id="videoOfDay" src=${response.url}></iframe>`)
                if(response.media_type == "video"){
                    imageEl.replaceWith(videoEl);
                } else if(response.hdurl !== undefined){
                    $(".picOfDay").attr("src", response.hdurl)
                } else {
                    $(".picOfDay").attr("src", response.url)
                }; 
            $("#PotdTitle").text(response.title);
            $("#PotdInfo").text(response.explanation);
            });    
        }
    getPicOfDay();
    //End of NASA Pic of Day API Call Section

//accessing possible mission targets
    function callTargetApis(id){
        $.ajax({
            url: "https://ssd-api.jpl.nasa.gov/nhats.api?des=" + id,
            method: "GET"
        }).then(function(response){
            console.log(response);
            //write the information into the html
            let name_h = $("<h4>");
            let delta_v_p = $("<p>");
            let max_size_p = $("<p>");
            let trip_there_p = $("<p>");
            let stay_p = $("<p>");
            let trip_back_p = $("<p>");

            name_h.addClass("neo-name");
            name_h.text(response.fullname);
            max_size_p.text("Max size: " + response.max_size + " meters");
            delta_v_p.text("Speed required after departing Earth: " + response.min_dur_traj.dv_dep_park + " km/s");
            trip_there_p.text("How long to get there: " + response.min_dur_traj.dur_out + " days");
            stay_p.text("How long at the object: " + response.min_dur_traj.dur_at + " days");
            trip_back_p.text("How many days to get home: " + response.min_dur_traj.dur_ret + " days");

            $(".card3-text").append(name_h, delta_v_p, max_size_p, trip_there_p, stay_p, trip_back_p);
        });
    }
    
    function accessMissionTargets(){
        //ajax call to get possible mission targets unconstrained
    
           //ajax call to get data on specific objects
        callTargetApis("4660");
        callTargetApis("10302");
        callTargetApis("3361");
    }
accessMissionTargets();
//accessing possible mission targets


//accessing neo api call
    function accessNeO() {
        //call the near earth object api and attain data from it
        let appID = "8phoKd5HeuFQGjXL2rQjtHLqkeY9a3xlESjPpoGL";

        //get current week from moment.js
        let year = moment().year();
        let month = moment().month() + 1;
        let day = moment().date();
        day = moment().format("DD");

        // let start_date = moment().year() + "-" +  moment().month() + "-" + moment().date();
        let start_date = year + "-" + month + "-" + day;
        console.log(start_date);

        let queryURL = "https://api.nasa.gov/neo/rest/v1/feed?start_date=" + start_date + "&api_key=" + appID;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            for (let i = 0; i < 3; i++) {


                let date_p = $("<p>");
                let diameter_p = $("<p>");
                let velocity_p = $("<p>");
                let potentially_hazardous_p = $("<p>");
                let name_h = $("<h4>");
                let velocity = parseInt(response.near_earth_objects[start_date][i].close_approach_data[0].relative_velocity.miles_per_hour);

                name_h.addClass("neo-name");

                date_p.text("Close approach date: " + response.near_earth_objects[start_date][i].close_approach_data[0].close_approach_date_full);
                diameter_p.text("Maximum diameter: " + (response.near_earth_objects[start_date][i].estimated_diameter.meters.estimated_diameter_max).toFixed(2) + " meters");
                velocity_p.text("Relative velocity: " + velocity.toFixed(2)
                 + " mph");
                potentially_hazardous_p.text("Potentially hazardous: " + response.near_earth_objects[start_date][i].is_potentially_hazardous_asteroid);
                name_h.text("NeO name: " + response.near_earth_objects[start_date][i].name);

                $(".card2-text").append(name_h, date_p, diameter_p, velocity_p, potentially_hazardous_p);

            }
        });

    }
    accessNeO();
    //accessing neo api call


    //Start of ISS Functionality Section

    //This function finds the location of the ISS based on the coordinates passed from the geoLocationISS function it's called in.
    function findIssCountry(issLat, issLong) {
        let googleMapsApiKey = "AIzaSyC7CPQ1X9wc7M8DGKJf2r1ykN2thMRttiQ";
        let queryURL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + issLat + "," + issLong + "&result_type=country|natural_feature&key=" + googleMapsApiKey;
        $.ajax({
            url: queryURL,
            method: "GET",
            }).then(function(response) {
                console.log(response);
                let issCountry = response.results[0].formatted_address;
                $("#current-country").text(issCountry);
                $("issMarker").bindPopup(`"${issCountry}"`)
            });
    }
    //Declaring global-scope variables for the map functions below. 
    let mymap;
    let issMarker;
    let issIcon = L.icon({
        iconUrl: "https://img.pngio.com/spacecraft-icons-science-mission-directorate-iss-png-300_230.png",
        iconSize:     [38, 95],
        iconAnchor:   [22, 94],
        popupAnchor:  [-3, -76]
    });
    //This function gets the coordinates of the ISS, creates and/or recreates the ISS map icon based off them, and also passes those coordinates into the findIssCountry function.
    function geoLocationISS () {
        let queryURL = "http://api.open-notify.org/iss-now.json";
        $.ajax({
            url: queryURL,
            method: "GET",
            }).then(function(response) {
                console.log(response);
                let issLat = parseFloat(response.iss_position.latitude);
                let issLong = parseFloat(response.iss_position.longitude);
                console.log(`The ISS's current coordinates: ${issLat}, ${issLong}`);
                if(issMarker) {
                    issMarker.remove();
                }
                issMarker = L.marker([issLat, issLong], {icon: issIcon});
                issMarker.addTo(mymap).bindPopup("ISS Popup");
                mymap.setView([issLat, issLong], 2.3,);
                findIssCountry(issLat, issLong);
            });    
    }
    //This function inits the map and adds a worldmap tile layer.
    function initMap(){
        mymap = L.map('issMap', {
            zoomControl: false,
            scrollWheelZoom: false,
            doubleClickZoom: false
        });
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'mapbox/satellite-v9',
            accessToken: 'pk.eyJ1Ijoia29nYW5wNDIiLCJhIjoiY2szdzFtcmI0MHMyejNqcGRqcmI2dnZuOSJ9.7YUzCLkvXsTXW0s2L8Nj-Q'
        }).addTo(mymap);
    };
    //Invoking the map creator and first call of the ISS icon location, then updating the ISS map location every 15 seconds. 
    initMap();
    geoLocationISS();
    let issInterval = setInterval(geoLocationISS, 15000);

    //The function below will find the next time the ISS will pass by a user's location, then count down to that time.

    function findUserCoordinates(){
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log(`The user's current coordinates are: ${position.coords.latitude}, ${position.coords.longitude}`);
            let userLat = position.coords.latitude;
            let userLong = position.coords.latitude;
            findPassTime(userLat, userLong);        
          });
    };
    findUserCoordinates();
    function findPassTime(userLat, userLong){
        let queryURL = `http://api.open-notify.org/iss-pass.json?lat=${userLat}&lon=${userLong}`;
        $.ajax({
            url: queryURL,
            method: "GET",
            dataType: "JSONP",
            }).then(function(response) {
                console.log(response);
                let unixTimeStamp = response.response[0].risetime;
                let passDate = new Date(unixTimeStamp*1000);
                let hours = passDate.getHours();
                let ampm = hours >= 12 ? "pm" : "am";
                    hours = hours % 12;
                    hours = hours ? hours : 12;
                let minutes = "0" + passDate.getMinutes();
                let seconds = "0" + passDate.getSeconds();
                let formattedPassTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2) + ' ' + ampm;
                let nextPassDisplayFormat = passDate.toDateString();
                $("#ISS-pass-time").text(`The ISS will next be over your location at: ${formattedPassTime} on ${nextPassDisplayFormat}.`);
            });
    };   

    //End of ISS Functionality

    function setSurfaceGravity(){
        $("#weight-on-planet").empty();
        $("#userWeight").val("");
        
        console.log($(this).attr("id"));
        $("#solarModalHeader").text($(this).attr("id"));
        
       $("#userWeight").attr("data-sg", $(this).attr("data-sg"));
        console.log($("#userWeight").attr("data-sg"));
    }

    function planetaryWeight(){
        $("#weight-on-planet").empty();
        let weight = $("#userWeight").val();
        let surface_gravity = $("#userWeight").attr("data-sg");
        let weight_on_planet = weight * surface_gravity;
             
        $("#weight-on-planet").text("On " + $("#solarModalHeader").text() + " you weigh  " + weight_on_planet.toFixed(2) + " lbs");

        console.log(weight_on_planet);
    }

    function setPlanetaryFacts(){
        $("#weight-on-planet").empty();
        $("#userWeight").val("");
        let planets = {
            "mercury" : {
                moons: "0",
                surface_temp: "-200 to 400 °C",
                mass: "0.055",
                year_length: "88 earth days",
                day_length: "176 earth days"
            },
            "venus" : {
                moons: "0",
                surface_temp: "460 °C",
                mass: "0.82",
                year_length: "225 earth days",
                day_length: "117 earth days"
            },
            "moon": {
                moons: "0",
                surface_temp: "-130 to 120 °C",
                mass: "0.055",
                day_length: "29.5 earth days",
                year_length: "27 earth days"
            },
            "mars" : {
                moons: "2",
                surface_temp: "-150 to 20 °C",
                mass: "0.11",
                day_length: "1.03 earth days",
                year_length: "687 earth days"
            },
            "jupiter" :{
                moons: "63",
                surface_temp: "-110 °C",
                mass: "318",
                day_length: "0.41 earth days",
                year_length: "11.9 years"
            },
            "saturn" : {
                moons: "60",
                surface_temp: "-140 °C",
                mass: "95.2",
                day_length: "0.43 earth days",
                year_length: "29.45 years"
            },
            "uranus" : {
                moons: "27",
                surface_temp: "-190 °C",
                mass: "14.5",
                day_length: "0.75 earth days",
                year_length: "84 years"
            },
            "neptune" : {
                moons: "13",
                surface_temp: "-200 °C",
                mass: "17.1",
                day_length: "0.67 earth days",
                year_length: "164.8 years"
            },
            "pluto" : {
                moons: "5",
                surface_temp: "-223 °C",
                mass: "0.002",
                day_length: "6.4 earth days",
                year_length: "248 years"
            },
            "sun" : {
                moons: "0",
                surface_temp: "5600 °C",
                mass: "1.3 million",
                day_length: "unavailable",
                year_length: "unavailable"
            }
        }
 
        
        
        
        let current_planet = $(this).attr("id");
        current_planet = current_planet.toLowerCase();
        
       
        
       
        $("#planet-moons").text(current_planet.replace(/^\w/, c => c.toUpperCase()) + " has " + planets[current_planet].moons + " moons");
        $("#surface-temp").text("The surface temperature of " + current_planet.replace(/^\w/, c => c.toUpperCase()) + " is " + planets[current_planet].surface_temp);
        $("#planet-mass").text(current_planet.replace(/^\w/, c => c.toUpperCase()) + " has a mass of " + planets[current_planet].mass + " (measured in earth masses)");
        $("#day-length").text("A day on " + current_planet.replace(/^\w/, c => c.toUpperCase()) + " is " + planets[current_planet].day_length);
        $("#year-length").text("A year on " + current_planet.replace(/^\w/, c => c.toUpperCase()) + " is " + planets[current_planet].year_length);

    }

    $("#input-btn").click(planetaryWeight);
    $(".planet").click(setSurfaceGravity)
    $(".planet").click(setPlanetaryFacts);
});