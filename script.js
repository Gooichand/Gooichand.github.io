// EmailJS Configuration
const EMAILJS_CONFIG = {
  publicKey: 'tQrf5kDN2167TgvY-',
  serviceId: 'service_b3wheld',
  contactTemplateId: 'template_9e7vhot',
  visitorTemplateId: 'template_x86m9hr'
};

// Initialize EmailJS
emailjs.init(EMAILJS_CONFIG.publicKey);

// Global variables for visitor data
let visitorData = {
  location: null,
  deviceInfo: null
};

// Collect device information
function getDeviceInfo() {
  return {
    browser: navigator.userAgent.split(') ')[0].split('(')[1] || 'Unknown',
    platform: navigator.platform,
    language: navigator.language,
    screenResolution: `${screen.width}x${screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    cookieEnabled: navigator.cookieEnabled,
    onlineStatus: navigator.onLine
  };
}

// Get exact GPS location (requires user permission)
function getGPSLocation() {
  return new Promise((resolve) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          });
        },
        () => resolve({ latitude: 'Permission denied', longitude: 'Permission denied', accuracy: 'N/A' })
      );
    } else {
      resolve({ latitude: 'Not supported', longitude: 'Not supported', accuracy: 'N/A' });
    }
  });
}

// Get location using IP geolocation (free)
function getLocationInfo() {
  return fetch('https://ipapi.co/json/')
    .then(response => response.json())
    .then(data => ({
      country: data.country_name,
      region: data.region,
      city: data.city,
      ip: data.ip,
      isp: data.org
    }))
    .catch(() => ({ country: 'Unknown', region: 'Unknown', city: 'Unknown', ip: 'Unknown', isp: 'Unknown' }));
}

// Welcome Message Functions
function getTimeBasedGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return { greeting: 'Good Morning', icon: 'fas fa-sun', color: '#f39c12' };
  if (hour < 17) return { greeting: 'Good Afternoon', icon: 'fas fa-sun', color: '#e67e22' };
  if (hour < 21) return { greeting: 'Good Evening', icon: 'fas fa-moon', color: '#8e44ad' };
  return { greeting: 'Good Night', icon: 'fas fa-moon', color: '#2c3e50' };
}

function getPersonalizedMessages(name, location) {
  const motivationalMessages = [
    `${name}, every expert was once a beginner! 🚀`,
    `${name}, your curiosity will unlock great things! 🔓`,
    `${name}, cybersecurity needs minds like yours! 🛡️`,
    `${name}, the future is built by people like you! ⚡`,
    `${name}, every line of code makes a difference! 💻`,
    `${name}, your journey in tech starts here! 🌟`,
    `${name}, innovation begins with exploration! 🔍`,
    `${name}, security is everyone's responsibility! 🔐`,
    `${name}, from ${location?.city || 'your city'} to the world! 🌍`,
    `${name}, debugging life one problem at a time! 🐛`,
    `${name}, your potential is limitless! ∞`,
    `${name}, code today, change tomorrow! 🌈`,
    `${name}, every click brings new possibilities! ✨`,
    `${name}, welcome to the digital frontier! 🚀`,
    `${name}, let's build something amazing together! 🏗️`
  ];
  
  // Use timestamp to ensure different message each visit
  const seed = Date.now() + name.length;
  const index = seed % motivationalMessages.length;
  return motivationalMessages[index];
}

function getWeatherData(lat, lon) {
  const apiKey = '895284fb2d2c50a520ea537456963d9c';
  return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .catch(() => ({ 
      main: { temp: '--' }, 
      weather: [{ main: 'Clear', description: 'clear sky' }],
      name: 'Your Location'
    }));
}

function createWeatherEffect(weatherType) {
  const overlay = document.getElementById('weatherOverlay');
  const particles = document.getElementById('weatherParticles');
  const welcomeEffect = document.getElementById('weatherEffect');
  
  // Clear previous effects
  overlay.className = 'weather-overlay';
  particles.innerHTML = '';
  welcomeEffect.innerHTML = '';
  
  switch(weatherType.toLowerCase()) {
    case 'rain':
    case 'drizzle':
    case 'thunderstorm':
      overlay.classList.add('rainy-effect');
      // Create rain in both overlay and welcome popup
      [particles, welcomeEffect].forEach(container => {
        for(let i = 0; i < (container === welcomeEffect ? 20 : 60); i++) {
          const drop = document.createElement('div');
          drop.className = 'rain-drop';
          drop.style.left = Math.random() * 100 + '%';
          drop.style.animationDelay = Math.random() * 2 + 's';
          drop.style.animationDuration = (0.6 + Math.random() * 0.4) + 's';
          container.appendChild(drop);
        }
      });
      if(weatherType.toLowerCase() === 'thunderstorm') {
        overlay.classList.add('thunder-effect');
      }
      break;
      
    case 'snow':
      overlay.classList.add('snow-effect');
      [particles, welcomeEffect].forEach(container => {
        for(let i = 0; i < (container === welcomeEffect ? 15 : 40); i++) {
          const flake = document.createElement('div');
          flake.className = 'snowflake';
          flake.innerHTML = ['❄', '❅', '❆'][Math.floor(Math.random() * 3)];
          flake.style.left = Math.random() * 100 + '%';
          flake.style.animationDelay = Math.random() * 4 + 's';
          flake.style.fontSize = (0.8 + Math.random() * 0.6) + 'em';
          container.appendChild(flake);
        }
      });
      break;
      
    case 'clouds':
    case 'mist':
    case 'fog':
      overlay.classList.add('cloudy-effect');
      // Create moving clouds
      for(let i = 0; i < 3; i++) {
        const cloud = document.createElement('div');
        cloud.className = 'cloud';
        cloud.style.width = (60 + Math.random() * 40) + 'px';
        cloud.style.height = (30 + Math.random() * 20) + 'px';
        cloud.style.top = (10 + Math.random() * 30) + '%';
        cloud.style.animationDelay = Math.random() * 8 + 's';
        cloud.style.animationDuration = (6 + Math.random() * 4) + 's';
        particles.appendChild(cloud);
      }
      break;
      
    case 'clear':
    default:
      overlay.classList.add('sunny-effect');
      // Create sun rays effect in welcome popup
      for(let i = 0; i < 8; i++) {
        const ray = document.createElement('div');
        ray.style.position = 'absolute';
        ray.style.width = '2px';
        ray.style.height = '30px';
        ray.style.background = 'linear-gradient(to bottom, rgba(255,223,0,0.6), transparent)';
        ray.style.top = '20px';
        ray.style.left = '50%';
        ray.style.transformOrigin = '1px 0';
        ray.style.transform = `rotate(${i * 45}deg)`;
        ray.style.animation = 'sunRays 3s ease-in-out infinite';
        ray.style.animationDelay = (i * 0.2) + 's';
        welcomeEffect.appendChild(ray);
      }
      break;
  }
  
  overlay.style.opacity = '1';
  setTimeout(() => {
    overlay.style.opacity = '0';
  }, 10000);
}

// Add sun rays animation
const sunRaysCSS = `
@keyframes sunRays {
  0%, 100% { opacity: 0.3; transform: rotate(var(--rotation)) scale(1); }
  50% { opacity: 0.8; transform: rotate(var(--rotation)) scale(1.2); }
}
`;
if (!document.querySelector('#sunRaysStyle')) {
  const style = document.createElement('style');
  style.id = 'sunRaysStyle';
  style.textContent = sunRaysCSS;
  document.head.appendChild(style);
}

function showWelcomeMessage(name, location) {
  const timeGreeting = getTimeBasedGreeting();
  const personalMessage = getPersonalizedMessages(name, location);
  
  $('#welcomeIcon i').removeClass().addClass(timeGreeting.icon).css('color', timeGreeting.color);
  $('#welcomeTitle').text(`${timeGreeting.greeting}, ${name}!`);
  $('#welcomeMessage').text(personalMessage);
  $('#locationName').text(location?.city || 'Your Location');
  
  if(location?.latitude && location?.longitude && location?.latitude !== 'Permission denied') {
    getWeatherData(location.latitude, location.longitude).then(weather => {
      $('#temperature').text(Math.round(weather.main.temp) + '°C');
      $('#weatherDesc').text(weather.weather[0].description);
      $('#locationName').text(weather.name);
      
      createWeatherEffect(weather.weather[0].main);
    });
  } else {
    $('#temperature').text('--°');
    $('#weatherDesc').text('Weather unavailable');
  }
  
  $('#specialWelcome').fadeIn(500);
  
  setTimeout(() => {
    closeWelcomeMessage();
  }, 6000);
}

function closeWelcomeMessage() {
  $('#specialWelcome').fadeOut(500, function() {
    $('body').css('overflow', 'auto');
    const name = sessionStorage.getItem('visitorName');
    $('.home-content .text-1').text(`Hello ${name}, My Name is`);
  });
}

// 3D Splash Screen Functionality
$(document).ready(function() {
  const visited = sessionStorage.getItem('visited');
  const visitorName = sessionStorage.getItem('visitorName');

  if(visited && visitorName) {
    $('.splash-screen').hide();
    $('body').css('overflow', 'auto');
    $('.home-content .text-1').text(`Hello ${visitorName}, My Name is`);
  } else {
    $('body').css('overflow', 'hidden');
    
    visitorData.deviceInfo = getDeviceInfo();
    
    Promise.all([getGPSLocation(), getLocationInfo()]).then(([gpsData, locationData]) => {
      visitorData.location = { ...locationData, ...gpsData };
      $('#locationStatus').html(`<i class="fas fa-check-circle"></i> <span>Ready for ${locationData.city}</span>`);
    }).catch(() => {
      $('#locationStatus').html(`<i class="fas fa-check-circle"></i> <span>Experience ready</span>`);
    });

    $('#enterSite').click(function() {
      const name = $('#visitorName').val().trim();
      
      // Validate name input
      if(!name || name.length < 2) {
        showNameError();
        return;
      }
      
      // Hide error if name is valid
      hideNameError();
      
      if(name) {
        const emailData = {
          name: name,
          timestamp: new Date().toLocaleString(),
          country: visitorData.location?.country || 'Unknown',
          region: visitorData.location?.region || 'Unknown',
          city: visitorData.location?.city || 'Unknown',
          ip_address: visitorData.location?.ip || 'Unknown',
          isp: visitorData.location?.isp || 'Unknown',
          latitude: visitorData.location?.latitude || 'Not available',
          longitude: visitorData.location?.longitude || 'Not available',
          gps_accuracy: visitorData.location?.accuracy || 'N/A',
          browser: visitorData.deviceInfo?.browser || 'Unknown',
          platform: visitorData.deviceInfo?.platform || 'Unknown',
          language: visitorData.deviceInfo?.language || 'Unknown',
          screen_resolution: visitorData.deviceInfo?.screenResolution || 'Unknown',
          timezone: visitorData.deviceInfo?.timezone || 'Unknown',
          cookie_enabled: visitorData.deviceInfo?.cookieEnabled || false,
          online_status: visitorData.deviceInfo?.onlineStatus || false
        };

        emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.visitorTemplateId, emailData)
          .catch(error => console.log('Email notification failed:', error));

        sessionStorage.setItem('visited', 'true');
        sessionStorage.setItem('visitorName', name);
        $('.splash-screen').fadeOut(500, function() {
          showWelcomeMessage(name, visitorData.location);
        });
      }
    });

    $('#visitorName').keypress(function(e) {
      if(e.which == 13) {
        $('#enterSite').click();
      }
    });
    
    // Hide error when user starts typing
    $('#visitorName').on('input', function() {
      if($(this).val().trim().length >= 2) {
        hideNameError();
      }
    });
  }
});

$(document).ready(function(){
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

    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function(){
        $('html').css("scrollBehavior", "smooth");
    });

    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

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

    $('.primary-skill').on('click keypress', function(e) {
        if(e.type === 'click' || e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const $subSkills = $(this).find('.sub-skills');
            if($subSkills.hasClass('show')) {
                $subSkills.removeClass('show');
                $(this).attr('aria-expanded', 'false');
            } else {
                $('.sub-skills.show').removeClass('show');
                $('.primary-skill').attr('aria-expanded', 'false');
                $subSkills.addClass('show');
                $(this).attr('aria-expanded', 'true');
            }
        }
    });

    $('.primary-skill').on('mouseenter', function() {
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

    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        
        const name = $('#name').val();
        const email = $('#email').val();
        const subject = $('#subject').val();
        const message = $('#message').val();
        
        const btn = $('.send-btn');
        const originalText = btn.html();
        
        btn.html('<i class="fas fa-spinner fa-spin"></i> Sending...');
        btn.prop('disabled', true);
        
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

    $('#specialWelcome').click(function(e) {
      if (e.target === this) {
        closeWelcomeMessage();
      }
    });
});

// Image Modal Functions
function openImageModal(src, alt) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const caption = document.getElementById('caption');
    
    modal.style.display = 'block';
    modalImg.src = src;
    caption.innerHTML = alt;
    document.body.style.overflow = 'hidden';
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

document.getElementById('imageModal').onclick = function(event) {
    if (event.target === this) {
        closeImageModal();
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeImageModal();
        closeNewsPopup();
        closeWelcomeMessage();
    }
});

// Modern News Card Functions
function toggleNewsPopup() {
    const card = document.getElementById('newsCard');
    card.classList.toggle('show');
}

function closeNewsPopup() {
    const card = document.getElementById('newsCard');
    card.classList.remove('show');
}

function showNewsOnHome() {
    const card = document.getElementById('newsCard');
    if (card) {
        setTimeout(() => {
            card.classList.add('show');
        }, 2000);
    }
}

$(window).scroll(function() {
    const homeSection = $('#home');
    const homeTop = homeSection.offset().top;
    const homeBottom = homeTop + homeSection.outerHeight();
    const scrollTop = $(window).scrollTop();
    const windowHeight = $(window).height();
    
    if (scrollTop < homeBottom && scrollTop + windowHeight > homeTop) {
        showNewsOnHome();
    } else {
        closeNewsPopup();
    }
});

showNewsOnHome();

// Name validation functions
function showNameError() {
  $('#nameError').show();
  $('#visitorName').addClass('error');
  
  // Remove error styling after animation
  setTimeout(() => {
    $('#visitorName').removeClass('error');
  }, 500);
}

function hideNameError() {
  $('#nameError').hide();
  $('#visitorName').removeClass('error');
}