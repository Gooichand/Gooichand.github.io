// 3D Splash Screen Functionality
$(document).ready(function() {
  const visited = sessionStorage.getItem('visited');
  const visitorName = sessionStorage.getItem('visitorName');

  if(visited && visitorName) {
    // If user already visited, hide splash screen and show main content
    $('.splash-screen').hide();
    $('body').css('overflow', 'auto');
    // Personalize greeting with stored visitorName
    $('.home-content .text-1').text(`Hello ${visitorName}, My Name is`);
  } else {
    // If not visited, show splash screen and disable scroll
    $('body').css('overflow', 'hidden');

    $('#enterSite').click(function() {
      const name = $('#visitorName').val().trim();
      if(name) {
        sessionStorage.setItem('visited', 'true');
        sessionStorage.setItem('visitorName', name);
        $('.splash-screen').fadeOut(500, function() {
          $('body').css('overflow', 'auto');

          // Personalize greeting
          $('.home-content .text-1').text(`Hello ${name}, My Name is`);
        });
      }
    });

    // Allow Enter key to submit
    $('#visitorName').keypress(function(e) {
      if(e.which == 13) {
        $('#enterSite').click();
      }
    });
  }
});

$(document).ready(function(){
    $(window).scroll(function(){
        // sticky navbar on scroll script
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }
        
        // scroll-up button show/hide script
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // slide-up script
    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
        // removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function(){
        // applying again smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
    });

    // toggle menu/navbar script
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // typing text animation script
    var typed = new Typed(".typing", {
        strings: ["Student", " Web Developer", "Gamer(CODM)", "Data Analyser", "Explorer", "debuger"],
        typeSpeed: 105,
        backSpeed: 90,
        loop: true
    });

    var typed2 = new Typed(".typing-2", {
        strings: ["Student", " Web Developer", "Gamer(CODM)", "Data Analyser", "Explorer","debuger"],
        typeSpeed: 105,
        backSpeed: 90,
        loop: true
    });

    // owl carousel script
    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
        responsive: {
            0:{
                items: 1,
                nav: false
            },
            600:{
                items: 2,
                nav: false
            },
            1000:{
                items: 3,
                nav: false
            }
        }
    });
});



$(document).ready(function(){
    $(window).scroll(function(){
        // sticky navbar on scroll script
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }
        
        // scroll-up button show/hide script
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // slide-up script
    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
        // removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function(){
        // applying again smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
    });

    // toggle menu/navbar script
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // typing text animation script
    var typed = new Typed(".typing", {
        strings: ["Student", " Web Developer", "Gamer(CODM)", "Data Analyser", "Explorer", "debuger"],
        typeSpeed: 105,
        backSpeed: 90,
        loop: true
    });

    var typed = new Typed(".typing-2", {
        strings: ["Student", " Web Developer", "Gamer(CODM)", "Data Analyser", "Explorer","debuger"],
        typeSpeed: 105,
        backSpeed: 90,
        loop: true
    });

    // owl carousel script
    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplay: true,
        autoplayTimeOut: 2000,
        autoplayHoverPause: true,
        responsive: {
            0:{
                items: 1,
                nav: false
            },
            600:{
                items: 2,
                nav: false
            },
            1000:{
                items: 3,
                nav: false
            }
        }
    });
});

