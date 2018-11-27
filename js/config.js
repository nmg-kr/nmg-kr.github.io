requirejs.config({
    paths : {
        "$" : "./lib/jquery-1.11.2.min",
        "TweenMax" : "./lib/TweenMax.min",
        "Swiper" : "./lib/swiper.min",
        "lettering" : "./lib/jquery.lettering",
        "textillate" : "./lib/jquery.textillate",
        "App" : "App"
    },

    shim : {
        "lettering"  : {
            deps : [ "$" ],
            exports : "lettering"
        },
        "textillate"  : {
            deps : [ "$" ],
            exports : "App"
        },
        "App" : {
            deps : [ "$", "TweenMax", "lettering",  "textillate" ],
            exports : "App"
        }


    },

    urlArgs : "ts=" + ( new Date()).getTime()
});