var numClicked = 0;
$("#catpic").click(function(){
    numClicked = numClicked + 1;
    $('#message').text("Chico has been clicked " +numClicked);
});