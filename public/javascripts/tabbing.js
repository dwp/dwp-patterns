// Tab Panes
  $(document).ready(function() {
    $('.tab-panes').each(function() {
      $(this).children('div').hide();
      $(this).children('.tab-pane:first').show();
      $(this).parent().find('.tab-link:first').addClass('tab-link-active');
    });
  });
  
  $(document).on('click', '.tab-link', function(e) {
    e.preventDefault();

    var nth = $(this).index() + 1;
    var target = $(this).parents('.tab-panel').find('.tab-pane:nth-child(' + nth + ')');

    $(this).parents('.tab-panel').find('.tab-link').removeClass('tab-link-active');
    $(this).addClass('tab-link-active');

    $(this).parents('.tab-panel').find('.tab-panes').children().hide();
    target.show();
  });
