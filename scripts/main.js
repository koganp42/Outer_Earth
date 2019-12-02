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
    })
                //POTD Modal
        $(".info").on("click",function(){
            $("#myModal").modal("show");
        })

        //front end styles//















   


   



















})