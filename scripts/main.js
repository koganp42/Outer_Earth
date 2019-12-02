$(document).ready(function () {


    //front end styles//
    $(".comet-card").css("display", "none");
    $("#neoCard").on("click", function () {
        $("#neoCard").css("display", "none");

        $(".comet-card").css("display", "block").fadeIn();

        $('.close-icon').on('click', function () {
            $(this).closest('.card').fadeOut();
            $("#neoCard").css("display", "block");

        })

        //front end styles//















    });


   

    function accessNeO(){
        //call the near earth object api and attain data from it
        let appID = "8phoKd5HeuFQGjXL2rQjtHLqkeY9a3xlESjPpoGL";

        //get current week from moment.js
        // let start_date = moment().year() + "-" +  moment().month() + "-" + moment().date();
        let start_date = "2019-11-30";
        console.log(start_date);
        let end_date="";
        let queryURL = "https://api.nasa.gov/neo/rest/v1/feed?start_date="+ start_date +"&api_key=" + appID;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response);
        });
        
    }
    accessNeO();
    console.log(moment().date());
    console.log(moment().year());
    console.log(moment().month());
    console.log(moment().year() + "-" +  moment().month() + "-" + moment().date());
















});