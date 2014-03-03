/**
 * @author Marcus Hansson
 */

var doc = $(document);
var win = $(window);
var sel = $('selector');

function randomFromTo(from, to){
       return Math.floor(Math.random() * (to - from + 1) + from);
}

function SetFooterPosition() {

    if(win.height() < doc.height()) {

        $("footer").offset({
            top : doc.height() - $("footer").height(),
            left : 0
        });
    } else {

        $("footer").offset({
            top : win.height() - $("footer").height(),
            left : 0
        });
    }
}

/*
 * TODO:
 * Set target animation for #tiles (launches whenever the window
 * resizes to smaller than #tiles: 960px)
 */
function SetTilesVisibility() {

    var pageWidth = $(window).width();
    var tilesWidth = $("#tiles").width();
    pageWidth <= tilesWidth ? $("#tiles").animate({

    }) : $("#tiles").show();

    var tiles = $("#tiles");
    
}

function SetVerticalScrollbar() {doc.clientHeight > doc.scrollHeight ? doc.clientHeight = ++doc.scrollHeight : doc.clientHeight;
}

function OnContactCloseClick(event) {

    //Prevent bubbling up through the dom,
    //If js is turned off, default event takes place
    //and href takes precedence.
    event.preventDefault();
    event.stopPropagation();

    var ele_contact = $('#contact');
    var btn_open = $('nav a[href="/kontakt"]');

    function Enable() {
        ele_contact.slideDown("medium");
        btn_open.css("background", "#000");
        btn_open.css("color", "#fff");
    };

    function Disable() {
        ele_contact.slideUp("medium")
        btn_open.css("background", "");
        btn_open.css("color", "");
    };ele_contact.is(":visible") ? Disable() : Enable;

    Disable();
}

function OnContactOpenClick(event) {

        event.preventDefault();

        var ele_contact = $("#contact");
        var btn_open = $('nav a[href="/kontakt/"]');

        function Enable() {
            ele_contact.slideDown("medium");
            btn_open.css("background", "#000");
            btn_open.css("color", "#fff");
        };

        function Disable() {
            ele_contact.slideUp("medium")
            btn_open.css("background", "");
            btn_open.css("color", "");
        };
        
        ele_contact.is(":visible") ? Disable() : Enable();
}
function OnNavMouseHover(event) {
    alert("A1");
    //event.preventDefault();
    
    function Enable() {
        this.animate({
            backgroundColor: "#000",
            color: "#fff"
        }, 400);
    }
    function Disable() {
        this.animate({
            backgroundColor: "#fff",
            color: "#000"
        }, 400);
    }
    
    this.css("backgroundColor") == "rgb(0, 0, 0)" ?
        Disable() :
        Enable();
}

function T_OnNavMouseHover() {
    
    var btn = $("nav a");
    
    function Enable() {
        btn.animate({
            backgroundColor: "#000",
            color: "#fff"
        }, 2000);
    }
    function Disable() {
        btn.animate({
            backgroundColor: "#fff",
            color: "#000"
        }, 2000);
    }
    
    btn.css("backgroundColor") == "rgb(0, 0, 0)" ?
        Disable() :
        Enable();
}

function OnSLNavMouseHoover(event) {
    this.animate({
        backgroundColor: "#6b6c6a"
    }, 200);
    
    alert(this);
}

function OnKeyPress(event) {
    
    var btn_open = $('nav a[href="/kontakt/"]');
    var btn_home = $('nav a[href="/index/"]');
    var btn_serv = $('nav a[href="/tjänster/"]')
    var btn_busi = $('nav a[href="/foretaget/"]');
    
    switch (event.which) {
        
        case 67:
            btn_open.trigger("click", {
            });
            break;
        case 70:
            btn_busi.trigger("click");
            break;
        case 72:
            btn_home.trigger("click");
            break;
        case 84:
            btn_serv.trigger("click");
            break;
    }
}

/*
 * TODO:
 * Launches whenever the window resizes to a larger size than #tiles: 960px.
 * Set default width (960-based) to all elements.
 */
function OnDocumentResize(event) {
    SetTilesVisibility();
    win.width() <= 960 ? $("*").width("auto") : null;
}

$(document).ready(function() {
    RegisterEvents();
    SetTilesVisibility();
    SetVerticalScrollbar();
});
function RegisterEvents() {

    var btn_close = $('a[href="#close"]');
    var btn_open = $('nav a[href="/kontakt/"]');
    var btn_nav_a = $('nav a');
    var btn_sl_a = $("div#slideshow-navigation a");

    win.bind("resize", OnDocumentResize);
    doc.bind("keypress", OnKeyPress);

    btn_close.bind("click", OnContactCloseClick);
    btn_open.bind("click", OnContactOpenClick);
    
    for (var i = 0; i < btn_nav_a.length; ++i) {

        $(btn_nav_a[i]).bind("hover", OnNavMouseHover);
    }
    
    for (var i = 0; i < btn_sl_a.length; ++i) {
        
        $(btn_sl_a[i]).bind("hover", OnSLNavMouseHoover);
    }
    
    RegisterEvents.previous = "";
    RegisterEvents.current = "";
    setInterval(function() {

        if (RegisterEvents.current == "" ||
            RegisterEvents.current.length == 0 ||
            typeof RegisterEvents.current == "undefined" ||
            typeof RegisterEvents.current == "string") {
                
                RegisterEvents.current = $("div#slideshow-navigation a").first();
                RegisterEvents.previous = $("div#slideshow-navigation a").last();
            }
            
        if (RegisterEvents.previous == "" ||
            typeof RegisterEvents.previous == "undefined" ||
            typeof RegisterEvents.previous == "string") {
                
                RegisterEvents.previous = $("div#slideshow-navigation a").first();
            }


        RegisterEvents.current.animate({
            backgroundColor: "#6b6c6a"
        },
            400
        );

        RegisterEvents.previous.animate({
            backgroundColor: "#dedede"
        },
            400
        );

        RegisterEvents.previous = RegisterEvents.current;
        RegisterEvents.current = RegisterEvents.current.next();

    }, 3200);
}

function VARS() {
    VARS.backgrounds = [
        "",
        "",
        "",
        "",
    ]
}

function DEBUG_ChangeSLBG() {
    
    var img = $("aside#slideshow img");
    var colour = "rgb(" + 
        randomFromTo(0, 255) + "," +
        randomFromTo(0, 255) + "," +
        randomFromTo(0, 255) + ")";
        
    img.animate({
        backgroundColor: colour 
    }, 400)
}
