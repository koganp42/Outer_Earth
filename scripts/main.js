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
    });
        //front end styles//

    //NASA Pic of the Day API Call
    let nasaApiKey = "8phoKd5HeuFQGjXL2rQjtHLqkeY9a3xlESjPpoGL";
    let queryURL = "https://api.nasa.gov/planetary/apod?api_key=" + nasaApiKey;
    
    $.ajax({
        url: queryURL,
        method: "GET",
        }).then(function(response) {
            console.log(response);
            if(response.hdurl !== undefined){
                $(".picOfDay").attr("src", response.hdurl)
            } else {
                $(".picOfDay").attr("src", response.url)
            }; 
            //$("#picOfDayContainer").children
        });
    //End of NASA Pic of Day API Call Section


   



















})