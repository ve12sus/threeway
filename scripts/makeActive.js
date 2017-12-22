$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return decodeURI(results[1]) || 0;
    }
}

function makeActive(param) {
  if (param == "Local") {
    $(".Local-nav-link").addClass("active")
  } else if (param == 'National') {
    $(".National-nav-link").addClass("active")
  } else {
    $(".news-nav-link").addClass("active");
    $(".people-nav-link").addClass("active");
    $(".events-nav-link").addClass("active");
    $(".food-nav-link").addClass("active");
  }
}

var whatisit = $.urlParam('category');

makeActive(whatisit);

$('#featured-news').click(function() {
  window.location.href = '/news';
});

$('#featured-food').click(function() {
  window.location.href = '/food';
});

$('#featured-people').click(function() {
  window.location.href = '/people';
});

$('#featured-events').click(function() {
  window.location.href = '/events';
});
