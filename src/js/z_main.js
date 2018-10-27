/**
* JS Main
*/
'use strict';

var IZWAY = function(configs) {
    this.config = {};
    for (var key in configs) {
        this.config[key] = configs[key];
    }

    return this;
}

IZWAY.prototype = {
    init: function() {
        this.generate()
        this.wowAnimation()
        this.sliderPart()
        this.particlesJS('particles')
    },
    generate: function() {
        var screenWidth = $( window ).width()

        $(".dropdown-toggle").dropdown()
        $('[data-toggle="tooltip"]').tooltip()
        $('[data-toggle="popover"]').popover()

        jQuery(window).bind('scroll', function () {
            var menu = jQuery('.header-menu');
            if ($(window).scrollTop() > menu.offset().top) {
                menu.addClass('is-fixed');
                $('body').addClass('is-fixed');
            } else {
                menu.removeClass('is-fixed');
                $('body').removeClass('is-fixed');
            }
        });

        if(screenWidth > 1023) {
            if(jQuery('.bgeffect').length) {
                var s = skrollr.init({
                    edgeStrategy: 'set',
                    easing: {
                        WTF: Math.random,
                        inverted: function(p) {
                            return 1-p;
                        }
                    }
                });
            }
        }

        $('.icon-scroll').on('click', function() {
            var nextEle = $('.services')
            $('html, body').animate({
                scrollTop: (nextEle.offset().top-70)
            }, 2000);
        })

      // $('.icon-menu-mobile').click(function(){
      //   $(this).toggleClass('open');
      // });
    },
    wowAnimation: function() {
        if($('.wow').length > 0)
        {
            var wow = new WOW({
              boxClass:     'wow',      // animated element css class (default is wow)
              animateClass: 'animated', // animation css class (default is animated)
              offset: 50,          // distance to the element when triggering the animation (default is 0)
              mobile: false       // trigger animations on mobile devices (true is default)
            });
            wow.init(); 
        }   
    },
    sliderPart: function() {
        jQuery('.beauty-care').owlCarousel({
            loop:true,
            autoplay:true,
            nav:true,
            dots: false,
            autoplaySpeed: 2000,
            navSpeed: 2000,
            paginationSpeed: 2000,
            slideSpeed: 2000,
            navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
            responsive:{
                0:{
                    items:1
                },
                
                480:{
                    items:1
                },
                
                767:{
                    items:1
                },
                1000:{
                    items:1
                }
            }
        })
    },
    particlesJS: function(tag_id) {
        if($("#"+tag_id).length) {
            particlesJS(tag_id,
            {
              "particles": {
                "number": {
                  "value": 10,
                  "density": {
                    "enable": false,
                    "value_area": 800
                  }
                },
                "color": {
                  "value": "#ffffff"
                },
                "shape": {
                  "type": "image",
                  "stroke": {
                    "width": 0,
                    "color": "#000000"
                  },
                  "image": {
                    "src": this.config.themeDistUrl+"images/tringle.png",
                    "width": 100,
                    "height": 100
                  }
                },
                "opacity": {
                  "value": 0.5,
                  "random": false,
                  "anim": {
                    "enable": false,
                    "speed": 0.5,
                    "opacity_min": 0.1,
                    "sync": false
                  }
                },
                "size": {
                  "value": 25,
                  "random": false,
                  "anim": {
                    "enable": true,
                    "speed": 5,
                    "size_min": 10,
                    "sync": true
                  }
                },
                "line_linked": {
                  "enable": false,
                  "distance": 150,
                  "color": "#ffffff",
                  "opacity": 0.4,
                  "width": 1
                },
                "move": {
                  "enable": true,
                  "speed": 1,
                  "direction": "none",
                  "random": true,
                  "straight": false,
                  "out_mode": "bounce",
                  "bounce": false,
                  "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                  }
                }
              },
              "interactivity": {
                "detect_on": "canvas",
                "events": {
                  "onhover": {
                    "enable": false,
                    "mode": "grab"
                  },
                  "onclick": {
                    "enable": false,
                    "mode": "push"
                  },
                  "resize": true
                },
                "modes": {
                  "grab": {
                    "distance": 400,
                    "line_linked": {
                      "opacity": 1
                    }
                  },
                  "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                  },
                  "repulse": {
                    "distance": 200,
                    "duration": 0.4
                  },
                  "push": {
                    "particles_nb": 1
                  },
                  "remove": {
                    "particles_nb": 2
                  }
                }
              },
              "retina_detect": true
            }
            );
        }
    }
}