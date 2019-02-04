$(document).ready(function(e) {
  $("nav li a[href^='#']").on('click', function(event) {
    var target = this.hash;
    event.preventDefault();
    var navOffset = $('#nav-bar').height();
    return $('html, body').animate({
      scrollTop: $(this.hash).offset().top - navOffset
    }, 300, function() {
      return window.history.pushState(null, null, target);
    });
  });
});