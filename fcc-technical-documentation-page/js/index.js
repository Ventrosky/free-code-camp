$(document).ready(function (e) {
  $("nav a[href^='#']").on('click', function (event) {
    var target = this.hash;
    event.preventDefault();
    return $('#main-doc').animate({
      scrollTop: $(target).offset().top },
    300, function () {
      return window.history.pushState(null, null, target);
    });
  });

});

function myFunction() {
  var x = document.getElementById("navbar");
  if (x.className === "sidebar") {
    x.className += " responsive";
  } else {
    x.className = "sidebar";
  }
}