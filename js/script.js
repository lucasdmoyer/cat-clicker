
var animals = {
    "cats": [
    {
        "name":"Chico",
        "img":"images/cat1.jpg"
    },
    {
        "name":"Chewie",
        "img":"images/cat2.jpg"
    }]
}

var index = 1;
function displayCats() {
    for (cat in animals.cats){
        console.log("the cats id is" + (index));
        $('#cat').prepend(
            '<img src="'+animals.cats[cat].img+'" id =catpic'+(index) +' style="width:750px;height:500px;">'+
            '<p id="message'+index+'"> '+ animals.cats[cat].name+' has been clicked 0 times</p>');
            index = index +1;
    }
}
displayCats();


var numClicked1 = 0;
$("#catpic1").click(function(){
    numClicked1 = numClicked1 + 1;
    $('#message1').text("Chico has been clicked " +numClicked1);
});

var numClicked2 = 0;
$("#catpic2").click(function(){
    numClicked2 = numClicked2 + 1;
    $('#message2').text("Chewie has been clicked " +numClicked2);
});

var numberOfCats = 1;