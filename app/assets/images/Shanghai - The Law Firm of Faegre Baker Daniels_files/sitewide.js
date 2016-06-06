
// site.master javascript

$(document).ready(function () {

    // report bug
    $(".reportbuglink").colorbox({ innerWidth: "500px", innerHeight: "650px", opacity: .55, overlayClose: false, iframe: true });

    // turn on sorting on flagged tables
    $(".SortableTable").tablesorter();

    // removes seperator from single widgets
    if ($(".WidgetDiv").length && $(".WidgetGlobalDiv").length) {
        $(".WidgetGlobalDiv").css("border-top", "none");
    }

    // adds arrows to sidebar links			
    $('#text-left .padding a').not(".noArrow").not(".PrimaryContact span a").not(".locAddress a").not(".office a").not(".WidgetDiv a").not(".WidgetGlobalDiv a").not(".PrimaryContact a").not("#bio-widget a").prepend('<img src="/images/blue_left_arrow.png" />')

    // flashmap 
    $(".flashMapLink").click(function () { $("body").addClass("fmc") });
    $(".flashMapLink").colorbox({ innerWidth: "890px", innerHeight: "594px", opacity: .55, overlayClose: false, iframe: true, onClosed: function () { $("body").removeClass("fmc") } });

    // menu 
    var config = {
        sensitivity: 6, // number = sensitivity threshold (must be 1 or higher)    
        interval: 50, // number = milliseconds for onMouseOver polling interval    
        over: shownavUL, // function = onMouseOver callback (REQUIRED)    
        timeout: 180, // number = milliseconds delay before onMouseOut    
        out: hidenavUL // function = onMouseOut callback (REQUIRED)
    };
    $("#navUL>li").hoverIntent(config); // lower menu

    // add menu down-arrows
    $("#navUL>li").append('<div class="navsectionarrow"></div>');

    $('#MegaMenuPeople').appendTo("#PeopleMegaMenu");
    $('.EventsMegaBox').appendTo("#EventMegaMenu");
    $('#MegaMenuPeople').removeClass('hidden');
    $('.EventsMegaBox').removeClass('hidden');

    // enter to submit top search textbox
    $('input.topsearchtextbox').satEnterSubmit($('#searchKeyWord'));

    // enter to submit megamenu
    $('input.megaSB').satEnterSubmit($('#ctl00_peopleSubmit'));


    // enter to subit media section
    $('#mediacenter_ArticleSearch').satEnterSubmit($('#mediacenter_tButton'));

    $('#printpagelink').click(function () {
        window.print();
        return false;
    });

    $(".biosearchoption").chosen();

    $(".widget_item a").mouseenter(function () {
        //$(this).children(".widget_hiddenText").css("z-index","10");
        $(this).children(".widget_hiddenText").show();
    }).mouseleave(function () {
        //$(this).children(".widget_hiddenText").css("z-index","-999");
        $(this).children(".widget_hiddenText").hide();
    });

    //HomePage slider
    var position = 0;
    $(".hometop_widget_container").children("div.widget_item").each(function () {
        $(this).css("position", "absolute");
        $(this).css("left", position);
        position = position + 222;
    });

    //Set Text-body's top when inforbox appear
    if ($("#infobox").is(":visible")) {
        $("#text-body").addClass(" text-body-margin");
    }

    // Slider
    $(".widget_left").click(function () {
        if (!$(".hometop_widget_container").children().is(':animated')) {
            $(".hometop_widget_container").children("div.widget_item").animate({
                left: '+=222px'
            }, function () {
                moveController();
            });
        }
        return false;
    });
    $(".widget_right").click(function () {
        if (!$(".hometop_widget_container").children().is(':animated')) {
            $(".hometop_widget_container").children("div.widget_item").animate({
                left: '-=222px'
            }, function () {
                moveController();
            });
        }
        return false;
    });

    // Google Tracking
    ////homepage
    $("#BtnBioSearch").click(function () {
        _gaq.push(['_trackEvent', 'People Search', 'Homepage people search']);
    });
          
    ////People drop down menu
    $("#MegaMenuPeople a").click(function () {
        _gaq.push(['_trackEvent', 'People Search', 'People drop down menu search']);
    });
    ////People landing page
    $("#AllSearch a").click(function () {
        _gaq.push(['_trackEvent', 'People Search', 'People landing page search']);
    });

    if ($(".graybackground").children().length == 0) {
        $(".graybackground").hide();
    }

    $("#text-left").children("div.graypadding").children("div.printhide").addClass("headerspace");

    if ($(".hometop_widget_container").children().length == 0) {
        $("#hometop_widget").hide();
    }

    var pathname = window.location.pathname;
    if (pathname == '/bios' || pathname == '/bios.aspx') {
      //  $(".menu_people").siblings("div.navsectionarrow").css("background-image", "none");
    }

    //setup enter key press selection
    submitfooter($("#FormFullname"));
    submitfooter($("#FormCompany"));
    submitfooter($("#FormEmail"));
    submitfooter($("#FormPhone"));
    submitfooter($("#contactUsForm"));
    $("#SearchTextBox").satEnterSubmit($('#searchKeyWord'));
    $(".biosearchinput").satEnterSubmit($('#BtnBioSearch'));

    //fix people menu css problem
    $(".menu_people").siblings("ul").css("width", "auto");
    $(".menu_people").siblings("ul").css("border", "none");

    // load any galleries we find
    $(".WB-Gallery").each(function (idx) {
        $(this).load("/galleryAJAX.aspx?galleryid=" + $(this).attr('galleryid'));
    });



}); // end of .ready

function searchClick() {
    location.href = 'search?Keywords=' + escape($(".topsearchtextbox").val()) + '&Sections=1,1,1,1,1,1,1,1,1,1'
}

function submitfooter(id) {
    jQuery(id).keypress(function (e) {
        if (e.keyCode == 13) {
            sendFooterContact();
            return false;
        }
    });
}

function shownavUL() { /* menu fuction */
    var pathname = window.location.pathname;
    if (!((pathname == "/" || pathname == "/index.aspx" || pathname == "/bios.aspx" || pathname == "/bios") && $(this).children("a").hasClass("menu_people"))) {
        $('ul', this).stop(true, true).show();
        if ($(this).children('ul').length > 0) {
            $(this).addClass("js-navopen");
        }
    }
};

function hidenavUL() {  /* menu fuction */
    $('ul', this).stop().hide();
    $(this).removeClass("js-navopen");
};

function moveController() {
    if ($(".hometop_widget_container .widget_item:last-child").length > 0) {
        var lastChild_leftPosition = $(".hometop_widget_container .widget_item:last-child").position().left;
        var childNumber = $(".hometop_widget_container").children("div.widget_item").length;
        var max = (childNumber - (childNumber - 4)) * 222;
        if (lastChild_leftPosition < max) {
            $(".widget_right").hide();
        } else {
            $(".widget_right").show();
        }
    }
    if ($(".hometop_widget_container .widget_item:first-child").length > 0) {
        var firstChild_leftPosition = $(".hometop_widget_container .widget_item:first-child").position().left;
        if (firstChild_leftPosition >= 0) {
            $(".widget_left").hide();
        } else {
            $(".widget_left").show();
        }
    }
}
	



// ------------- BEGIN PLUGIN DEFINITIONS -----------------

// add enter-to-submit functionality to an element
// pass in the element you wish to be 'clicked' when enter is pressed
jQuery.fn.satEnterSubmit = function (submitelement) {
    jQuery(this).keypress(function (e) {
        if (e.keyCode == 13) {
            if (jQuery(submitelement).is('a') && jQuery(submitelement).attr('href').indexOf('javascript:__doPostBack(') == 0) {
                // POSTBACK LINK CLICKS!
                eval(jQuery(submitelement).attr('href'));
            } else {
                jQuery(submitelement).click();
            }
            return false;
        }
    });
    return jQuery(this);
};


// auto-hint functionality for textboxes
// crafted by Brian 07/26/2010, tweaked 01/14/2011, tested on jQuery 1.4.2
// updated 05/29/2013 to include auto-stripping of placeholders on form submit
jQuery.fn.satAutoHint = function () {
    var els = jQuery(this);
    // loop through all our items and set them up one by one
    els.each(function (idx) {
        var mytextbox = jQuery(this);
        var myhint = mytextbox.attr('placeholder');
        // if a placeholder is definfed, and we haven't already been configured, go ahead
        if (myhint && mytextbox.data('sat-autohint-active') != 1) {
            // on focus, automatically clear the hint
            mytextbox.bind('focus', function () {
                if (jQuery(this).val() == myhint) {
                    jQuery(this).val('');
                }
            });
            // on blur, replace the hint if we have no text
            mytextbox.bind('blur', function () {
                if (jQuery(this).val() == '') {
                    jQuery(this).val(myhint);
                }
            });
            // mark it as configured and initialize using blur
            mytextbox.data('sat-autohint-active', 1);
            mytextbox.blur();
        }
    });
    // attach automatic behavior to the document that will clear the placeholders on form submission
    if (els.length > 0) {
        // we only want to do this once! set a flag using jQuery data()
        if (jQuery(document).data('sat-autohintwipe-enabled') != 1) {
            // mark it as configured
            jQuery(document).data('sat-autohintwipe-enabled', 1);
            // bind our handler to the document -- it should catch all bubbled-up submit events
            jQuery(document).bind('submit', function (evt) {
                var targetel = jQuery(evt.target);
                // need to try to determine the containing form for this submit
                var targetform = targetel.is('form') ? targetel : targetel.parents('form');
                // loop through inputs within the form...
                var phinputs = jQuery('input[placeholder],textarea[placeholder]', targetform);
                phinputs.each(function () {
                    // blank the input if the content matches the placeholder attribute
                    var myinput = jQuery(this);
                    if (myinput.data('sat-autohint-active') == 1) {
                        var myhint = myinput.attr('placeholder');
                        if (myinput.val() == myhint) {
                            myinput.val('');
                        }
                    }
                });
                // we never wish to block form execution, so we return true
                return true;
            });
        }
    }
    return jQuery(this);
};

jQuery(document).ready(function () {
    // set up the auto-hints on any input textbox with a placeholder attribute defined!
    jQuery('input[placeholder],textarea[placeholder]').satAutoHint();
    jQuery('a[href$=".pdf"]').attr('target', '_blank').addClass('js-autopdflink');
});
