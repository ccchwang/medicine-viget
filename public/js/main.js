jQuery(document).ready(function($) {
  $(window).scroll(function() {
    var scrollPos = $(window).scrollTop(),
        navbar = $('.navbar-default');

    if (scrollPos > 20) {
      navbar.addClass('change-color');
    } else {
      navbar.removeClass('change-color');
    }
  });
});
