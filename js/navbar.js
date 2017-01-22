$(document).ready(function () {
    $('.topnav li a').click(function(e) {

        $('.topnav li').removeClass('active');

        var $parent = $(this).parent();
        if (!$parent.hasClass('active')) {
            $parent.addClass('active');
        }
        e.preventDefault();
    });
});
