
var animals = {
    "cats": [
    {
        "name":"Chico",
        "img":"images/cat1.jpg",
        "clicks": 0,
        "number":1
    },
    {
        "name":"Chewie",
        "img":"images/cat2.jpg",
        "clicks":0,
        "number":2
    },
    {
        "name":"Jenssen",
        "img":"images/cat1.jpg",
        "clicks":0,
        "number":3
    },
    {
        "name":"Alex",
        "img":"images/cat2.jpg",
        "clicks":0,
        "number":4
    },
    {
        "name":"Peter",
        "img":"images/cat1.jpg",
        "clicks":0,
        "number":5
    }]
}

for (var i = 0; i <animals.cats.length; i++){
    var cat = animals.cats[i];
    var elem = document.createElement('div');
    elem.textContent = cat;

    $('#cat').prepend(
            '<img src="'+cat.img+'" id =catpic'+(cat.number) +' style="width:750px;height:500px;">'+
            '<p id="message'+cat.number+'"> '+ cat.name+' has been clicked 0 times</p>');
    document.body.appendChild(elem);

    elem.addEventListener('click', (function(catCopy) {
        return function() {
            catCopy.clicks = catCopy.clicks + 1;
            $('#message'+catCopy.number).text(catCopy.name+" has been clicked " + catCopy.clicks);
            console.log(catCopy);
        };
    })(cat));
    
}

/*
var index = 1;
function displayCats() {
    for (cat in animals.cats){
        catcopy = animals.cats[cat];
        //clicker(catcopy);
        $('#cat').prepend(
            '<img src="'+animals.cats[cat].img+'" id =catpic'+(index) +' style="width:750px;height:500px;">'+
            '<p id="message'+index+'"> '+ animals.cats[cat].name+' has been clicked 0 times</p>');
            index = index +1;
    }
}
displayCats();

function clicker(cat){
    console.log("#catpic"+cat.number);
    ("#catpic"+cat.number).addEventListener('click', function(cat){
        return function() {
            console.log(cat.name);
        };
    })(cat);
    
    $("#catpic"+cat.number).click(function(){
        cat.clicks = cat.clicks+1;
        $('#message'+cat.number).text(cat.name+" has been clicked " + cat.clicks);
    });
}
*/
