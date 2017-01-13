/* ======= Model ======= */

var model = {
    adminMode: false,
    currentCat: null,
    cats: [
        {
            clickCount : 0,
            name : 'Tabby',
            imgSrc : 'images/cat1.jpg',
            imgAttribution : 'https://www.flickr.com/photos/bigtallguy/434164568'
        },
        {
            clickCount : 0,
            name : 'Tiger',
            imgSrc : 'images/cat2.jpg',
            imgAttribution : 'https://www.flickr.com/photos/xshamx/4154543904'
        },
        {
            clickCount : 0,
            name : 'Scaredy',
            imgSrc : 'images/cat1.jpg',
            imgAttribution : 'https://www.flickr.com/photos/kpjas/22252709'
        },
        {
            clickCount : 0,
            name : 'Shadow',
            imgSrc : 'images/cat1.jpg',
            imgAttribution : 'https://www.flickr.com/photos/malfet/1413379559'
        },
        {
            clickCount : 0,
            name : 'Sleepy',
            imgSrc : 'images/cat1.jpg',
            imgAttribution : 'https://www.flickr.com/photos/onesharp/9648464288'
        }
    ]
};


/* ======= Octopus ======= */

var octopus = {

    init: function() {
        // set our current cat to the first one in the list
        model.currentCat = model.cats[0];

        // tell our views to initialize
        catListView.init();
        catView.init();
        adminView.init();
    },

    changeAdmin: function() {
        if (model.adminMode) {
            model.adminMode = false;
        } else {
            model.adminMode = true;
        }
    },

    getAdmin: function() {
        return model.adminMode;
    },

    getCurrentCat: function() {
        return model.currentCat;
    },

    getCats: function() {
        return model.cats;
    },

    // set the currently-selected cat to the object passed in
    setCurrentCat: function(cat) {
        model.currentCat = cat;
    },

    // increments the counter for the currently-selected cat
    incrementCounter: function() {
        model.currentCat.clickCount++;
        catView.render();
    }
};


/* ======= View ======= */
/*
var adminView = {
    init: function() {
        // store points to DOM elements
        this.adminMode = document.getElementById('admin-button');
        this.nameInput = document.getElementById('nameinput');
        this.urlInput = document.getElementById('urlInput');
        this.clicksInput = document.getElementById('clicksInput');

        this.adminMode.addEventListener('click', function(){
            octopus.changeAdmin();
        });

        if (octopus.getAdmin()) {
            this.render();
        }
    },

    render: function() {
        ($'.admin-button').hide();
    }
}
*/

var adminView = {
    init: function(){
        var selectedCat = octopus.getCurrentCat();
        
        this.adminform = document.querySelector('#admin-form');
        this.adminButton = document.querySelector('#admin-button');
        
        this.nameinput = document.querySelector('#nameInput');
        this.urlinput = document.querySelector('#urlInput');
        this.clicksinput = document.querySelector('#clicksInput');
        
        this.save = document.querySelector('#save');
        this.cancel = document.querySelector('#cancel');
        
        this.save.addEventListener('click', function(event){
            event.preventDefault();
            
            /*
            octopus.getCurrentCat() = {
                name : adminView.nameinput.value,
                imgAttribution :adminView.urlinput.value,
                clickCount: adminView.clicksinput.value
            }; */
            octopus.getCurrentCat().name = adminView.nameinput.value;
            octopus.getCurrentCat().imgAttribution = adminView.urlinput.value;
            octopus.getCurrentCat().clickCount = adminView.clicksinput.value;

            catListView.render();
            catView.render();
            adminView.render();
        });
        
        this.cancel.addEventListener('click', function(event){
            event.preventDefault();
            
            octopus.changeAdmin();
            adminView.render();
        });
        
        this.adminButton.addEventListener('click', function(event){
            octopus.changeAdmin();
            adminView.render();
        });
        
        this.render();
    },
    render: function(){
        var selectedCat = octopus.getCurrentCat();
        
        this.nameinput = document.querySelector('#nameInput');
        this.urlinput = document.querySelector('#urlInput');
        this.clicksinput = document.querySelector('#clicksInput');
        
        if(octopus.getAdmin()) {
            console.log("its true")
            //this.adminform.style.display = 'block';
            document.querySelector('#admin-form').style.visibility = "visible";
            this.nameinput.value = selectedCat.name;
            this.urlinput.value = selectedCat.imgAttribution;
            this.clicksinput.value = selectedCat.clickCount;
            
        } else{
            console.log('its false')
            //this.adminform.removeAttribute('style');
            document.querySelector('#admin-form').style.visibility = "hidden";
        }
    }
};

var catView = {

    init: function() {

        // store pointers to our DOM elements for easy access later
        this.catElem = document.getElementById('cat');
        this.catNameElem = document.getElementById('cat-name');
        this.catImageElem = document.getElementById('cat-img');
        this.countElem = document.getElementById('cat-count');

        // on click, increment the current cat's counter
        this.catImageElem.addEventListener('click', function(){
            octopus.incrementCounter();
        });

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        // update the DOM elements with values from the current cat
        var currentCat = octopus.getCurrentCat();
        this.countElem.textContent = currentCat.clickCount;
        this.catNameElem.textContent = currentCat.name;
        this.catImageElem.src = currentCat.imgSrc;
    }
};

var catListView = {

    init: function() {
        // store the DOM element for easy access later
        this.catListElem = document.getElementById('cat-list');

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        var cat, elem, i;
        // get the cats we'll be rendering from the octopus
        var cats = octopus.getCats();

        // empty the cat list
        this.catListElem.innerHTML = '';

        // loop over the cats
        for (i = 0; i < cats.length; i++) {
            // this is the cat we're currently looping over
            cat = cats[i];

            // make a new cat list item and set its text
            elem = document.createElement('li');
            elem.textContent = cat.name;

            // on click, setCurrentCat and render the catView
            // (this uses our closure-in-a-loop trick to connect the value
            //  of the cat variable to the click event function)
            elem.addEventListener('click', (function(catCopy) {
                return function() {
                    octopus.setCurrentCat(catCopy);
                    catView.render();
                };
            })(cat));

            // finally, add the element to the list
            this.catListElem.appendChild(elem);
        }
    }
};

// make it go!
octopus.init();