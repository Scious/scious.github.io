$(function() {

    
    /*
        SNAPSCROLL
    */
    if( $(window).width() > 767 ) {
        // calculate the padding for mobile / non-mobile
        // var paddingTop = ( $(window).width() < 767 ) ? 62 : 92;

        // $('#fullpage').fullpage();
        // {
        //     anchors: ['home', 'about', 'contact', 'projects'],
        //     menu: '#navigation',
        //     paddingTop: 92,
        //     fixedElements: '#navigation',
        //     verticalCentered: false,
        //     scrollBar: false,
        //     fitToSection: false,
        //     slidesNavigation: true
        // });
        // $(".navbar-brand, .nav a").on("click", function(e) {
        //     $.fn.fullpage.moveTo(1);
        // });

        // $('.next-section').on("click", function(e) {
        //     $.fn.fullpage.moveSectionDown();
        // });
    } 
    // mobile
    else {
        $('body').css({'paddingTop': 0});

        // Andriod Keyboard Hack
        var windowHeight = $(window).height();
        var strHeight = (windowHeight - 62) + 'px !important';
        $('section').css('height', '100vh').css('height', '-=60px');;

        // Mobile Nav
        $("#navigation a, .next-section a").click(function() {
            var $this = $(this)
            scrollToClass = '.'+$this.attr('href').replace('#', '');
            $('html, body').animate({
                scrollTop: $(scrollToClass).offset().top - 60
            }, 700);
        });

        // Collapse menu after click
        $('.nav a:not(.dropdown-toggle)').on('click', function(e) {
            $('#navbar').collapse('hide');
        });
    }


    /*
        WAVE ANIMATION
    */
    var track = function(amplx, amply, freqx, freqy, pageX, pageY) {
        return {
            x: amplx * Math.sin(freqx * pageX),
            y: amply * Math.sin(freqy * pageY)
        };
    };
    var $imgs = $('img.image');
    $('#waves').on('mousemove', function(e) {
        $imgs.each(function() {
            var $img = $(this);
            var current = track($img.data('ax'), $img.data('ay'), $img.data('fx'), $img.data('fy'), e.pageX, e.pageY);
            $img.css({
                left: current.x,
                bottom: current.y
            });
        });
    });

    // checks the window height and scales the waves down if needed
    var resizeWaves = function() {
        if( $(window).height() < 800 ) {
            $('#waves img').css({
                transform: "scale(0.80) translate3d(0, 50px, 0)"
            });
        } else {
            $('#waves img').css({
                transform: "none"
            });
        }
    }
    resizeWaves();
    $( window ).on('resize', resizeWaves);
    


    /*
        CONTACT FORM
    */
    $('#contact-form').on('submit', function(e) {
        e.preventDefault();

        var $this = $(this),
            name = $this.find('#name'),
            email = $this.find('#email'),
            message = $this.find('#message'),
            $submitBtn = $this.find('button');

        // validation
        if( name.val().length === 0 ) {
            alert('Please provide your Name');
            return false;
        }
        if( email.val().length === 0 ) {
            alert('Please provide your Email');
            return false;
            
        }
        if( message.val().length === 0 ) {
            alert('Please provide a Message');
            return false;
        }

        // soooo long, but it's the RFC 5322 standard
        var regex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
        if( regex.test(email.val()) === false ) {
            alert('Please provide a Valid Email');
            return false;
        }

        // disbale the submit button to prevent a double submit
        $submitBtn.prop("disabled", true);

        $.ajax({
                method: "POST",
                url: "https://formspree.io/sciousinquiry@gmail.com",
                data: $this.serialize(),
                dataType: 'json'
            })
            .done(function(msg) {                
                $this.find('button').text('Message Sent');
                // clear the inputs
                $this.find(':input').val('');
                $submitBtn.prop("disabled", false);
            })
            .error(function(){
                alert('An error occurred, please try again');
                $submitBtn.prop("disabled", false);
            });
    });


    /*
        CUSTOM
    */

    // set the year in the copyright
    $('.current-year').text(new Date().getFullYear());
});