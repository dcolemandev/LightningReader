$(function () {
    "use strict";

    var nav_offset_top = $('header').height() + 50;
    /*-------------------------------------------------------------------------------
      Navbar 
    -------------------------------------------------------------------------------*/

    //* Navbar Fixed  
    function navbarFixed() {
        if ($('.header_area').length) {
            if (!$('.header_area').hasClass('divFixed')) {
                $(window).scroll(function () {
                    var scroll = $(window).scrollTop();
                    if (scroll >= nav_offset_top) {
                        $(".header_area").addClass("navbar_fixed");
                        $(".header-addto").removeClass("d-none");
                    } else {
                        $(".header_area").removeClass("navbar_fixed");
                        $(".header-addto").addClass("d-none");
                    }
                });
            }

        };
    };
    navbarFixed();





    //------- mailchimp --------//  
    function mailChimp() {
        $('#mc_embed_signup').find('form').ajaxChimp();
    }
    mailChimp();


    /*-------------------------------------------------------------------------------
        testimonial slider
      -------------------------------------------------------------------------------*/
    if ($('.testimonial').length) {
        $('.testimonial').owlCarousel({
            loop: true,
            margin: 30,
            // items: 5,
            nav: false,
            dots: true,
            responsiveClass: true,
            slideSpeed: 300,
            paginationSpeed: 500,
            responsive: {
                0: {
                    items: 1
                },
                800: {
                    items: 2
                },
                1200: {
                    items: 3
                }
            }
        })
    }



    /*-------------------------------------------------------------------------------
      featured slider
    -------------------------------------------------------------------------------*/
    if ($('.logo-carousel').length) {
        $('.logo-carousel').owlCarousel({
            loop: false,
            margin: 30,
            items: 2,
            nav: false,
            dots: false,
            responsiveClass: true,
            slideSpeed: 300,
            responsive: {
                590: {
                    items: 3
                },
                1000: {
                    items: 4
                },
                1200: {
                    items: 5
                }
            }
        })
    }



    /*-------------------------------------------------------------------------------
      featured slider
    -------------------------------------------------------------------------------*/
    if ($('.hero-carousel').length) {
        $('.hero-carousel').owlCarousel({
            loop: false,
            margin: 30,
            items: 1,
            nav: false,
            dots: true,
            responsiveClass: true,
            slideSpeed: 300,
            paginationSpeed: 500
        })
    }




});

var TxtType = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};

window.onload = function () {
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};

// code fragment
// the form id is myForm
$('#myForm').on('submit', function (event) {
    event.preventDefault(); // prevent reload

    var formData = new FormData(this);
    formData.append('service_id', 'YOUR_SERVICE_ID');
    formData.append('template_id', 'YOUR_TEMPLATE_ID');
    formData.append('user_id', 'YOUR_PUBLIC_KEY');

    $.ajax('https://api.emailjs.com/api/v1.0/email/send-form', {
        type: 'POST',
        data: formData,
        contentType: false, // auto-detection
        processData: false // no need to parse formData to string
    }).done(function () {
        alert('Your mail is sent!');
    }).fail(function (error) {
        alert('Oops... ' + JSON.stringify(error));
    });
});


// $(document).ready(function () { // Tells the function to wait to preform until everything on the page has loaded.
//     $(window).scroll(function () { // Says this function is preformed continuisly while scrolling.
//         var Scroll = $(window).scrollTop() + 1, // This variable finds the distance you have scrolled from the top.
//             SectionOneOffset = $('#section-one').offset().top, // This variable finds the distance between #section-one and the top. Replace #section-one with the ID of your section.
//             SectionTwoOffset = $('#section-two').offset().top; // This variable finds the distance between #section-two and the top. Replace #section-two with the ID of your section. You can duplicate this for as many sections as you want.
//         SectionThreeOffset = $('#section-three').offset().top, // This variable finds the distance between #section-one and the top. Replace #section-one with the ID of your section.
//             SectionFourOffset = $('#section-four').offset().top;
//         if (Scroll >= SectionOneOffset) { // If you have scrolled past section one do this.
//             $(".nav-item")[0].addClass("active"); // Adds class of current-menu-item to the menu item with a class of menu-item-1
//         } else { // If you have not scrolled section one do this.
//             $(".nav-item")[0].removeClass("active"); // Removes class of current-menu-item to the menu item with a class of menu-item-1
//         }
//         if (Scroll >= SectionTwoOffset) { // If you have scrolled past section two do this.You can duplicate this for as many sections as you want.
//             $(".nav-item")[1].addClass("active"); // Adds class of current-menu-item to the menu item with a class of menu-item-2
//             $(".nav-item")[0].removeClass("active"); // Removes class of current-menu-item to the menu item with a class of menu-item-1
//         } else { // If you have not scrolled section two do this.
//             $(".nav-item")[1].removeClass("active"); // Removes class of current-menu-item to the menu item with a class of menu-item-2
//         }
//         if (Scroll >= SectionThreeOffset) {
//             $(".nav-item")[2].addClass("active");
//             $(".nav-item")[1].removeClass("active");
//         } else {
//             $(".nav-item")[2].removeClass("active");
//         }
//         if (Scroll >= SectionFourOffset) {
//             $(".nav-item")[3].addClass("active");
//             $(".nav-item")[2].removeClass("active");
//         } else {
//             $(".nav-item")[3].removeClass("active");
//         }
//     });
// });
