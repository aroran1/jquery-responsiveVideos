(function ($) {

    "use strict";

    $.responsiveVideos = function (element, options) {

        var defaults = {
            sources: [
              'youtube',
              'vine'
            ],
            parentEl: 'body',
            wrapperClass: 'responsive-vid',
            ignore: '.ignore-responsive-vid, [data-ignore-responsive-vid="true"]' // use data attribute in TinyMCE as it strips out classes
        };

        var plugin = this;

        plugin.settings = {};

        plugin.init = function () {
            plugin.settings = $.extend({}, defaults, options);

            setupVids();

        };

        // Find the Greatest Common Denominator
        var gcd = function (a, b) {
            var m, temp;

            if (b > a) {
                temp = a;
                a = b;
                b = temp;
            }

            while (b !== 0) {
                m = a % b;
                a = b;
                b = m;
            }

            return a;
        };

        var ratioPaddingSize = function (x, y) {
            var c = gcd(x, y);
            return ((y / c) / (x / c)) * 100;
        };

        var setupVids = function () {

            // Check settings to see if there's a selector provided in which the search should be limited
            // otherwise apply the changes to all matches

            var selector = [
                plugin.settings.parentEl + " object",
                plugin.settings.parentEl + " iframe"
            ],
            sources = "";

            selector = $(document).find(selector.join(','));

            selector = selector.not(plugin.settings.ignore);

            for (var i = 0; i < plugin.settings.sources.length; i += 1) {

                sources = sources + "src.indexOf(" + plugin.settings.sources[i] + ") > -1 || ";

            }

            $(selector).each(function () {
                var src = $(this).attr('src'),
	                ratioPadding,
	                wrappedEmbed;

                if (src === undefined) {
                    src = $(this).attr('data');
                }
                if (src === undefined) {
                    src = $(this).find('embed').attr('src');
                    wrappedEmbed = true;
                }

                if (src !== undefined) {

                    if (sources) {

                        if (wrappedEmbed) {

                            ratioPadding = ratioPaddingSize($(this).find('embed').width(), $(this).find('embed').height());

                        } else {

                            ratioPadding = ratioPaddingSize($(this).width(), $(this).height());

                            if (isNaN(ratioPadding) && $(this).attr('width') !== undefined && $(this).attr('height') !== undefined) {
                                // fix for 0 width issue in Firefox
                                ratioPadding = ratioPaddingSize($(this).attr('width'), $(this).attr('height'));
                            }
                        }


                        $(this).wrap('<div class="' + plugin.settings.wrapperClass + '"></div>').parent().css({
                            'position': 'relative',
                            'padding-top': ratioPadding.toFixed(3) + '%',
                            'margin-bottom': '5px',
                        });

                        if (wrappedEmbed) {
                            $(this).find('embed').css({
                                'width': '100%',
                                'height': '100%',
                                'position': 'absolute',
                                'top': '0',
                                'left': '0',
                            });

                            // iPhone and iPad fix
                            if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                                $(this).find('embed').css({ 
                                    //'height': 100 - ratioPadding.toFixed(3) + '%',
                                    'position': 'relative',
                                });
                                $(this).parent('.' + plugin.settings.wrapperClass).css({
                                    'padding-top': 0,
                                });
                            };

                        } else {
                            $(this).css({
                                'width': '100%',
                                'height': '100%',
                                'position': 'absolute',
                                'top': '0',
                                'left': '0'
                            });

                        }

                    }
                }
            });

        };

        plugin.init();

    };

    $.fn.responsiveVideos = function (options) {

        return this.each(function () {
            if (undefined === $(this).data('responsiveVideos')) {
                var plugin = new $.responsiveVideos(this, options);
                $(this).data('responsiveVideos', plugin);
            }
        });

    };

})(jQuery);