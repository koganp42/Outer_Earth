$(document).ready(function () {


    //front end styles//

    //PreLoad Function//
    window.addEventListener('load',function(){
        let preload = document.querySelector('.preload');
        preload.classList.add("preload-finish");
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
        $("#venusModal").modal("show");
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
            });    }
    //End of NASA Pic of Day API Call Section
    getPicOfDay();


















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
    console.log(moment().date());
    console.log(moment().year());
    console.log(moment().month());
    console.log(moment().year() + "-" + moment().month() + "-" + moment().date());















});