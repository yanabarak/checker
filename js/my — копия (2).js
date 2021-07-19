jQuery(document).ready(function ($) {
	let short = $('.sidebar .user-panel h6.long').text().match(/\b\w/g).join('');
    if ($(window).width()<576) {
      $('.sidebar').toggleClass('collapse'); 
      $('.sidebar').attr('id', 'navigation');; 
      $('.animated-hamburger').toggleClass('open'); 
    }
    $('.navbar-toggler-button').on('click', function () {
    if ($(window).width()>576) {
      // $('.sidebar').toggleClass('mobile');
      // $('aside').toggleClass('w-100');  
      // $('#content').toggleClass('d-none');
      // $('.sidebar').toggleClass('fliph');  
      // $('.animated-hamburger').toggleClass('open');


      $('.sidebar').toggleClass('fliph');  
      $('.animated-hamburger').toggleClass('open');
      $('.sidebar .user-panel h6.short').html(short);
    }
    });
});