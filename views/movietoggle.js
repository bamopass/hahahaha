$(function () {
    // Toggle Activities Navbar links
    $('.movies .nav-link:not(.dropdown-toggle)').on('click', function (e) {
        // prevent default event behavior
        e.preventDefault();

        // Check whether element has class 'active'
        if (!$(this).hasClass('active')) {
            // remove class 'active from it's siblings
            $(this).parent().siblings('li').find('.nav-link').removeClass('active');
            // add 'active' class to triggered element
            $(this).addClass('active');

            // Hide Other Content
            $('.movies-list > article').removeClass('active');
            // Show Content Related
            $($(this).data('target')).addClass('active');
        }
    });
});
