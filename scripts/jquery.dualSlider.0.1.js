/**
* jQuery.fn.dualSlider - Dual sliders, why not?
* Date: June 2010
*
* @author Rob Phillips (Front End Developer - Hugo & Cat - http://www.hugoandcat.com)
* @version 0.1
*
* Requirements:
* jquery.1.3.2.js - http://jquery.com/
* jquery.easing.1.3.js - http://gsgd.co.uk/sandbox/jquery/easing/
* jquery.timers-1.2.js - http://plugins.jquery.com/project/timers

**/


(function($) {

    $.fn.dualSlider = function(options) {

        // default configuration properties
        var defaults = {
            auto: true,
            autoDelay: 10000,
            easingCarousel: 'swing',
            easingDetails: 'easeOutBack',
            durationCarousel: 1000,
            durationDetails: 600
        };

        var options = $.extend(defaults, options);

        this.each(function() {

            var obj = $(this);
            var carousel;
            var carouselTotal = $(".backgrounds", obj).children().length;
            var carouselPosition = 1;
            var carouselLinkIndex = 1;
            var carouselLinks = "";
            var carouselwidth = $(obj).width();
            var detailWidth = $(".panel .details_wrapper", obj).width();


            //Set main background width
            $(".backgrounds", obj).css("width", carouselTotal * carouselwidth + "px");
            //Set main detail width
            $(".details_wrapper .details", obj).css("width", detailWidth * carouselwidth + "px");

            for (i = 1; i <= carouselTotal; i++) {
                (i == 1) ? carouselLinks += "<a rel=\"" + carouselLinkIndex + "\" title=\"Go to page " + carouselLinkIndex + " \" class=\"link" + carouselLinkIndex + " selected\" href=\"javascript:void(0)\">" + carouselLinkIndex + "</a>" : carouselLinks += "<a rel=\"" + carouselLinkIndex + "\"  title=\"Go to page " + carouselLinkIndex + " \" class=\"link" + carouselLinkIndex + "\" href=\"javascript:void(0)\" >" + carouselLinkIndex + "</a>";
                carouselLinkIndex++;
            }
            $("#numbers", obj).html(carouselLinks);

            //Bind carousel controls
            $(".next", obj).click(function() {
                carouselPage(parseInt(carouselPosition + 1), false);

            });
            $(".previous", obj).click(function() {
                carouselPage(parseInt(carouselPosition - 1), false);
            });


            $("#numbers a", obj).click(function() {

                //alert($(this).attr("rel"));
                carouselPage($(this).attr("rel"), false);
            });


            function checkPreviousNext() {
                $("#numbers a", obj).removeClass("selected");
                $("#numbers .link" + carouselPosition, obj).addClass("selected");
                (carouselPosition == carouselTotal) ? $(".next", obj).hide() : $(".next", obj).show();
                (carouselPosition < 2) ? $(".previous", obj).hide() : $(".previous", obj).show();
            }

            function carouselPage(x, y) {

                carouselPosition = parseFloat(x);
                //Cancel timer if manual click
                if (y == false) $("body").stopTime("autoScroll");

                var newPage = (x * carouselwidth) - carouselwidth;
                var newPageDetail = (x * detailWidth) - detailWidth;

                if (newPage != 0) {
                    newPage = newPage * -1;
                    newPageDetail = newPageDetail * -1;
                }

                $(".carousel .backgrounds").animate({
                    marginLeft: newPage
                }, {
                    "duration": options.durationCarousel, "easing": options.easingCarousel,

                    complete: function() {

                        //Now animate the details
                        $(".carousel .details").animate({
                            marginLeft: newPageDetail
                        }, {
                            "duration": options.durationDetails, "easing": options.easingDetails

                        });
                        checkPreviousNext();
                    }
                });
                
            }

            if (options.auto == true) {
                $("body").everyTime(options.autoDelay, "autoScroll", function() {
                    carouselPage(carouselPosition + 1, true);
                }, carouselTotal - 1);
            }

        });

    };

})(jQuery);



