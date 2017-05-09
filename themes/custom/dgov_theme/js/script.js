(function($, Drupal) {
  Drupal.behaviors.stickyMenu = {
    attach: function(context, settings) {
      $('header.navbar').affix({
        offset: {
          top: $('header').height()
        }
      });
    }
  };
})(jQuery, Drupal);
