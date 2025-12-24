// Portfolio JavaScript - Gopichand Dandimeni © 2025

// EmailJS Configuration
const EMAILJS_CONFIG = {
  publicKey: 'tQrf5kDN2167TgvY-',
  serviceId: 'service_b3wheld',
  contactTemplateId: 'template_9e7vhot'
};

// Initialize EmailJS
emailjs.init(EMAILJS_CONFIG.publicKey);

// Simple name validation
function validateRealName(name) {
  name = name.trim();
  if (name.length < 2) return false;
  if (/^[0-9]+$/.test(name)) return false;
  return true;
}

// Initialize website
$(document).ready(function(){
    // Typing animation
    var typed = new Typed(".typing", {
        strings: ["Security Analyst", "Penetration Tester", "Digital Forensics Expert", "Cybersecurity Specialist"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    var typed2 = new Typed(".typing-2", {
        strings: ["Security Analyst", "Penetration Tester", "Digital Forensics Expert", "Cybersecurity Specialist"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    // Carousel
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

    // Navbar scroll
    $(window).scroll(function(){
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }
        
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // Scroll up button
    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function(){
        $('html').css("scrollBehavior", "smooth");
    });

    // Menu toggle
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // Skills toggle
    $('.primary-skill').click(function(){
        $(this).find('.sub-skills').toggleClass('show');
    });

    // Contact form
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: $('#name').val(),
            email: $('#email').val(),
            subject: $('#subject').val(),
            message: $('#message').val()
        };

        emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.contactTemplateId, formData)
            .then(() => {
                alert('Message sent successfully!');
                $('#contactForm')[0].reset();
            })
            .catch(() => {
                alert('Failed to send message. Please try again.');
            });
    });

    // Splash screen
    $('#enterSite').click(function() {
        const name = $('#visitorName').val();
        if (!validateRealName(name)) {
            $('#nameError').show();
            return;
        }
        
        $('.splash-screen').fadeOut(1000);
    });
});

// Image modal
function openImageModal(src, alt) {
    $('#modalImage').attr('src', src);
    $('#caption').text(alt);
    $('#imageModal').show();
}

function closeImageModal() {
    $('#imageModal').hide();
}