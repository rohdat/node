window.onload = function () {
var cats = [
{name: 'Abby', url:'https://placekitten.com/g/220/300'},
{name: 'Betty', url:'https://placekitten.com/g/210/301'},
{name: 'Cathy', url: 'https://placekitten.com/g/240/302'},
{name: 'Donna', url: 'https://placekitten.com/g/260/303'},
{name: 'Eliza', url: 'https://placekitten.com/g/250/304'},
];

var cat_list = document.getElementById('cat-list');
var ul = document.createElement('ul');
cat_list.appendChild(ul);

cats.forEach(function (c) {
  var li = document.createElement('button')
  li.innerHTML = c.name;
  ul.appendChild(li);
  li.onclick =  function(){catChosen(c);};
});
var last_cat = null;
function catChosen (cat) {
  console.log('Cat chosen'+cat);
  var e = document.getElementById('cat-area');
  while (e.firstChild) {
    e.removeChild(e.firstChild);
  }
  var img = document.createElement('img');
  var c = document.createElement('p');
  var click_count = 0;
  img.src = cat.url;
  e.appendChild(img);
  c.innerHTML = click_count;
  e.appendChild(c);
  function update(){
    if(cat.count) {
      click_count = cat.count;
    }
    c.innerHTML = click_count;
    cat.count = click_count;
  }
  update();
  img.addEventListener('click', function () {
    click_count ++;
    console.log(click_count);
    cat.count = click_count;
    update();
  })
}
};
