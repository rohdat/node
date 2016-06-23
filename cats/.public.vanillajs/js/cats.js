'use strict'
window.onload = (function () {
var model = {
  cats : [
        {name: 'Abby', url:'https://placekitten.com/g/220/300', cnt: 0},
        {name: 'Betty', url:'https://placekitten.com/g/210/301', cnt: 0},
        {name: 'Cathy', url: 'https://placekitten.com/g/240/302', cnt: 0},
        {name: 'Donna', url: 'https://placekitten.com/g/260/303', cnt: 0},
        {name: 'Eliza', url: 'https://placekitten.com/g/250/304', cnt:0},
        ],
  currentCat: null

};


var octopus = {
  getCats: function () {
    return model.cats;
  },
  chooseCat: function (cat) {
  },
  init: function () {
    console.log("init octopus");
    catView.init();
    listView.init();

  },
  setCurrentCat: function (cat) {
    model.currentCat = cat;
  },
  getCurrentCat: function () {
    return model.currentCat;
  },
  incrementCounter: function () {
    model.currentCat.cnt++;
  }
};

var catView = {
  init: function () {
    // init the cat view
    // init 
    // set current cat
    // display img of cat
    // add event listener
    //ability to update img src and click count src
    //add view for clickcount
    this.img = document.createElement("img");
    this.img.addEventListener('click', function() {
      octopus.incrementCounter();
      catView.render();
    });
    this.cnt = document.createElement('p');
    this.name = document.createElement('p');
    this.imgdiv = document.createElement('div');
    this.imgdiv.appendChild(this.name);
    this.imgdiv.appendChild(this.cnt);
    this.imgdiv.appendChild(this.img);
    // this.imgdiv.style.position = 'relative';
    // this.imgdiv.style.left = '500px';
    // this.imgdiv.style.float = 'right';

    document.getElementById('cat-view').style.float = "left";
    document.getElementById('cat-view').appendChild(this.imgdiv);
    // document.getElementById('cat-view').appendChild(this.cnt);

    console.log(typeof this.img != undefined);
  },
  render: function () {
    var cat = octopus.getCurrentCat();
    this.img.src = cat.url;
    this.cnt.innerHTML = cat.cnt;
    this.name.innerHTML = cat.name;
  }
}
var listView = {
  init: function () {
    //init the list
    //create and add buttons for each cat
    //add event listeners for each button
    this.catDiv = document.getElementById('cat-list');
    this.catDiv.style.float='left';
    this.render();

  },
  render: function () {
    var div = this.catDiv;
    octopus.getCats().forEach(function(cat) {
      var btn = document.createElement('button');
      btn.innerHTML = cat.name;
      btn.onclick = function () {
                      octopus.setCurrentCat(cat);
                      catView.render();
                    }
      
      div.appendChild(btn);
    })
  }
   
}

var adminView = {
  init: function () {
    this.adminDiv = document.getElementById('admin-view');

  }
}
octopus.init();

})

// var last_cat = null;
// function catChosen (cat) {
//   console.log('Cat chosen'+cat);
//   var e = document.getElementById('cat-area');
//   while (e.firstChild) {
//     e.removeChild(e.firstChild);
//   }
//   var img = document.createElement('img');
//   var c = document.createElement('p');
//   var click_count = 0;
//   img.src = cat.url;
//   e.appendChild(img);
//   c.innerHTML = click_count;
//   e.appendChild(c);
//   function update(){
//     if(cat.count) {
//       click_count = cat.count;
//     }
//     c.innerHTML = click_count;
//     cat.count = click_count;
//   }
//   update();
//   img.addEventListener('click', function () {
//     click_count ++;
//     console.log(click_count);
//     cat.count = click_count;
//     update();
//   })
// }
