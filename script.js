// EmailJS Configuration
const EMAILJS_CONFIG = {
  publicKey: 'tQrf5kDN2167TgvY-',
  serviceId: 'service_b3wheld',
  contactTemplateId: 'template_9e7vhot',
  visitorTemplateId: 'template_x86m9hr'
};

// Initialize EmailJS
emailjs.init(EMAILJS_CONFIG.publicKey);

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
        // Send visitor notification via EmailJS
        emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.visitorTemplateId, {
          name: name,
          timestamp: new Date().toLocaleString()
        }).catch(error => console.log('Email notification failed:', error));

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
        strings: ["Student", " cyber forensics leaner", "Explorer", "debugger"],
        typeSpeed: 150,
        backSpeed: 100,
        backDelay: 1000,
        loop: true,
        smartBackspace: true,
        showCursor: true, 
        cursorChar: '/',
        autoInsertCss: true
    });

    var typed2 = new Typed(".typing-2", {
        strings: ["Student", " cyber forensics leaner", "Explorer", "debugger"],
        typeSpeed: 150,
        backSpeed: 100,
        backDelay: 1000,
        loop: true,
        smartBackspace: true,
        showCursor: true,
        cursorChar: '/',
        autoInsertCss: true
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

    // Interactive Skills Section
    $('.primary-skill').on('click keypress', function(e) {
        if(e.type === 'click' || e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const $subSkills = $(this).find('.sub-skills');
            if($subSkills.hasClass('show')) {
                $subSkills.removeClass('show');
                $(this).attr('aria-expanded', 'false');
            } else {
                // Close other open sub-skills
                $('.sub-skills.show').removeClass('show');
                $('.primary-skill').attr('aria-expanded', 'false');
                // Open this one
                $subSkills.addClass('show');
                $(this).attr('aria-expanded', 'true');
            }
        }
    });

    // Reveal sub-skills on hover (mouseenter) and hide on mouseleave
    $('.primary-skill').on('mouseenter', function() {
        // Close other open sub-skills
        $('.sub-skills.show').removeClass('show');
        $('.primary-skill').attr('aria-expanded', 'false');

        const $subSkills = $(this).find('.sub-skills');
        $subSkills.addClass('show');
        $(this).attr('aria-expanded', 'true');
    });

    $('.primary-skill').on('mouseleave', function() {
        const $subSkills = $(this).find('.sub-skills');
        $subSkills.removeClass('show');
        $(this).attr('aria-expanded', 'false');
    });

    // Add subtle 3D hover effect using CSS transform on mousemove
    $('.primary-skill').on('mousemove', function(e) {
        const $this = $(this);
        const offset = $this.offset();
        const width = $this.outerWidth();
        const height = $this.outerHeight();
        const centerX = offset.left + width / 2;
        const centerY = offset.top + height / 2;
        const mouseX = e.pageX;
        const mouseY = e.pageY;
        const rotateX = ((mouseY - centerY) / height) * 10; // max 10 deg rotation
        const rotateY = ((mouseX - centerX) / width) * -10;
        $this.css('transform', `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`);
    });

    $('.primary-skill').on('mouseleave', function() {
        $(this).css('transform', 'perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)');
    });

    // Enhanced Contact Form Functionality
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        
        const name = $('#name').val();
        const email = $('#email').val();
        const subject = $('#subject').val();
        const message = $('#message').val();
        
        const btn = $('.send-btn');
        const originalText = btn.html();
        
        // Show sending state
        btn.html('<i class="fas fa-spinner fa-spin"></i> Sending...');
        btn.prop('disabled', true);
        
        // Send via EmailJS
        emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.contactTemplateId, {
          name: name,
          email: email,
          subject: subject,
          message: message
        })
        .then(() => {
          btn.html('<i class="fas fa-check"></i> Message Sent!');
          btn.css('background', 'linear-gradient(135deg, #28a745, #20c997)');
          $('#contactForm')[0].reset();
        })
        .catch(error => {
          console.error('Error:', error);
          btn.html('<i class="fas fa-times"></i> Failed to Send');
          btn.css('background', 'linear-gradient(135deg, #dc3545, #c82333)');
        })
        .finally(() => {
          btn.prop('disabled', false);
          setTimeout(() => {
            btn.html(originalText);
            btn.css('background', 'linear-gradient(135deg, crimson, #ff6b6b)');
          }, 3000);
        });
    });

    // Copy to clipboard functionality
    $('.row[data-tooltip="Click to copy"]').on('click', function() {
        const text = $(this).find('.sub-title').text();
        navigator.clipboard.writeText(text).then(() => {
            const tooltip = $(this).attr('data-tooltip');
            $(this).attr('data-tooltip', 'Copied!');
            setTimeout(() => {
                $(this).attr('data-tooltip', tooltip);
            }, 2000);
        });
    });

    // Animate contact cards on scroll
    $(window).scroll(function() {
        const contactSection = $('#contact');
        const contactTop = contactSection.offset().top;
        const windowBottom = $(window).scrollTop() + $(window).height();
        
        if (windowBottom > contactTop + 100) {
            $('.contact .row').each(function(index) {
                $(this).delay(index * 100).queue(function() {
                    $(this).addClass('animate-in').dequeue();
                });
            });
        }
    });
});