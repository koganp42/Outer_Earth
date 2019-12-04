$(document).ready(function () {


    //front end styles//
    //gsap/scroll magic//
    let controller = new ScrollMagic.Controller();

    new ScrollMagic.Scene({
        triggerElement: '#picOfDayContainer',offset: -150    
    })
    .setClassToggle('#picOfDayContainer','fade-in')
    .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: '#neoCard',offset: -150     
    })
    .setClassToggle('#neoCard','fade-in')
    .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: '#issCard',offset: -150     
    })
    .setClassToggle('#issCard','fade-in')
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
                //POTD Modal
        $(".info").on("click",function(){
            $("#myModal").modal("show");
        });

              //ISS Modal
        $(".issImg").on("click",function(){
            $("#issModal").modal("show");
        });
        //front end styles//
















    //NASA Pic of the Day API Call
    function getPicOfDay(){

        let nasaApiKey = "8phoKd5HeuFQGjXL2rQjtHLqkeY9a3xlESjPpoGL";
        let queryURL = "https://api.nasa.gov/planetary/apod?date=2019-12-02&api_key=" + nasaApiKey;
        
        
        $.ajax({
            url: queryURL,
            method: "GET",
            }).then(function(response) {
                console.log(response);
                let imageEl = $("#npodImg");
                let videoEl = `<iframe src=${response.url}></iframe>`
                if(response.media_type == "video"){
                    imageEl.parentNode.replaceChild(videoEl, imageEl);
                } else if(response.hdurl !== undefined){
                    $(".picOfDay").attr("src", response.hdurl)
                } else {
                    $(".picOfDay").attr("src", response.url)
                }; 
                //$("#picOfDayContainer").children
            });
    }
    //End of NASA Pic of Day API Call Section
    getPicOfDay();













   


   

    function accessNeO(){
        //call the near earth object api and attain data from it
        let appID = "8phoKd5HeuFQGjXL2rQjtHLqkeY9a3xlESjPpoGL";

        //get current week from moment.js
        // let start_date = moment().year() + "-" +  moment().month() + "-" + moment().date();
        let start_date = "2019-12-01";
        console.log(start_date);
        let end_date="";
        let queryURL = "https://api.nasa.gov/neo/rest/v1/feed?start_date="+ start_date +"&api_key=" + appID;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response);

            let date_p = $("<p>");
            let diameter_p = $("<p>");
            let velocity_p = $("<p>");
            let potentially_hazardous_p = $("<p>");
            let name_p = $("<p>");

            

            date_p.text("Close approach date: " + response.near_earth_objects["2019-12-01"][0].close_approach_data[0].close_approach_date_full);
            diameter_p.text("Maximum diameter: " + response.near_earth_objects["2019-12-01"][0].estimated_diameter.meters.estimated_diameter_max);
            velocity_p.text("Relative velocity: " + response.near_earth_objects["2019-12-01"][0].close_approach_data[0].relative_velocity.miles_per_hour + " mph");
            potentially_hazardous_p.text("Potentially hazardous: " + response.near_earth_objects["2019-12-01"][0].is_potentially_hazardous_asteroid);
            name_p.text("Name: " + response.near_earth_objects["2019-12-01"][0].name);

            $(".card2-text").append(date_p, diameter_p, velocity_p, potentially_hazardous_p, name_p);
        });
        
    }
    accessNeO();
    console.log(moment().date());
    console.log(moment().year());
    console.log(moment().month());
    console.log(moment().year() + "-" +  moment().month() + "-" + moment().date());















});