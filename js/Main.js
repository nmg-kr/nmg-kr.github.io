
define([
    "App",
    "lib/swiper.min"
], function( App, Swiper ){

    var $window, $html, $section, $header;
    var section2Swiper, section3Swiper;
    var currentMenu = 1;

    
    function init() {
        create();
        swiperInit();
        addEvent();
        
    }

    function create() {
        $window = $(window);
        $html = $('html,body');
        $header = $('header');
        $section = $('section');
    }

    function addEvent() {
        
        $(".hamburger").on('click', hamburgerToggle);
        $('h1, footer .arrow').on('click', function(){ menuLink( 1 ); });
        $('.scroll').on('click', function(){ menuLink( 2 ); });
        $('.wrap header nav li a').on('click', function(){
            menuLink( $(this).parent().index()+2 );
        });

        $window.on('scroll', scrollHandler);
        scrollHandler();
        changeMenu();


        $('.section5 .tab li a').on('click', function(){
            var $thisIndex = $(this).parent().index();
            $('.section5 .content > ul > li, .section5 .tab li').removeClass('is-active');
            $('.section5 .content > ul > li:eq(' + $thisIndex + '), .section5 .tab li:eq(' + $thisIndex + ')').addClass('is-active');
        });

        $('footer a.brochure').on('click', function(){
            alert('준비중입니다.');
        });

    }
    

    function scrollHandler(){
        var $scrollTop = $window.scrollTop();
        var $windowHeight = $window.height();
        var previewMenu = currentMenu;

        if( $scrollTop > 18 ) {
            $header.addClass('is-scroll');
        } else {
            $header.removeClass('is-scroll');
        }

        $section.each( function(){
            var topPosition = $(this).offset().top - ($windowHeight*2/3);
            if ( $scrollTop > topPosition ){
                currentMenu = $(this).index();
            }
        });

        if( previewMenu != currentMenu ) {
            changeMenu();
        }
    }

    function changeMenu(){
        var $thismenu = $('.section' + currentMenu );
        if( !$thismenu.hasClass('scrolled') ){
            $thismenu.addClass('scrolled');

            switch( currentMenu ){
                case 1:
                    $('.section1 h2 .white div').textillate({
                        in: { effect: 'fadeIn', shuffle: true, delayScale:2, delay:65 },
                        callback: function () {
                            $('.section1 h2 .colored').fadeIn(500);
                            motionTitle();
                        }
                    });
                    randomTitle();         
                    window.setInterval(randomTitle, 3000);
                    break;
                case 2:
                    section2Swiper.on('slideChange', function () {
                        $('.section2 h2 p').removeClass('is-active');
                        $('.section2 h2 p:eq(' + section2Swiper.activeIndex + ')').addClass('is-active');
                    });
            
                    $('.section2 h2 p').textillate({
                        in: { effect: 'fadeIn', shuffle: true, delayScale:1.5, delay:50 }
                    });
                    
                    break;
                case 3:
                    $('.section3 h2').textillate({
                        in: { effect: 'fadeIn', shuffle: true, delayScale:1.5, delay:50 }
                    });
                    break;
                case 5:
                    $('.section5 h2').textillate({
                        in: { effect: 'fadeIn', shuffle: true, delayScale:1.5, delay:50 }
                    });
                    break;
                case 6:
                    $('.section6 h2').textillate({
                        in: { effect: 'fadeIn', shuffle: true, delayScale:1.5, delay:50 }
                    });
                    break;
                case 7:
                    $('.section7 h2').textillate({
                        in: { effect: 'fadeIn', shuffle: true, delayScale:1.5, delay:50 }
                    });
                    break;
                case 9:
                    $('.section9 h2').textillate({
                        in: { effect: 'fadeIn', shuffle: true, delayScale:1.5, delay:50 }
                    });
                    break;
            }
        }

        $('.wrap header nav li').removeClass('is-active');
        if( currentMenu > 1) {
            $('.wrap header nav li:eq('+ (currentMenu-2) + ')').addClass('is-active');
        }
    }


    function menuLink( val ){
        var finalScroll;
        if( val != 1 ) {
            finalScroll = $('.section' + val).offset().top - $header.height() +1;
        } else {
            finalScroll = 0;
        }
        
        TweenMax.to( $html, 0.5, { scrollTop : finalScroll, ease: Power1.easeOut });
        $('.hamburger').removeClass("is-active");
        $('header nav').removeClass('is-active');
    }


    function hamburgerToggle(){
        $(this).toggleClass("is-active");

        if( $(this).hasClass('is-active')){
            $('header nav').addClass('is-active');
        } else {
            $('header nav').removeClass('is-active');
        }
    }

    function motionTitle(){
        $('.section1 h2 .colored .textgreen').textillate({
            in: { effect: 'fadeIn', shuffle: true, delayScale:1, delay:30 },
            out: { effect: 'fadeOut', shuffle: true, callback:function(){
                $('.section1 h2 .colored .textgreen').removeClass('textgreen');
            } },
            loop: true,
            minDisplayTime: 1000
        });
    }

    function randomTitle(){
        $('.section1 h2 .colored .textgreen').removeClass('textgreen');
        $('.section1 h2 .colored p').each(function( index ) {
            var $this = $(this);
            window.setTimeout(function(){
                if( Math.random() > 0.7 ) {  $this.addClass('textgreen');  }
            }, 50*index);
        });
    }

    function swiperInit(){
        section2Swiper = new Swiper('.section2 .swiper-container', {
            speed: 400,
            spaceBetween:50,
            pagination: {
                el: '.section2 .swiper-pagination',
                type: 'bullets',
                clickable: true
            },
            effect: 'coverflow',
            coverflowEffect: {
                rotate: 15,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows : false,
            }
        });

        section3Swiper = new Swiper('.section3 .swiper-container', {
            speed: 400,
            spaceBetween:50,
            pagination: {
                el: '.section3 .swiper-pagination',
                type: 'bullets',
                clickable: true
            },
            effect: 'coverflow',
            coverflowEffect: {
                rotate: 15,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows : false,
            }
        });
    }

    $( document ).ready( function(){
        init();
    });
});