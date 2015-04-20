# jquery-responsiveVideos
=======================

Convert all videos on a page to be responsive.


responsiveVideos implements the technique popularised by Thierry Koblentz in 2009:
http://alistapart.com/article/creating-intrinsic-ratios-for-video/

In an ideal world, you would either write your code or have your CMS generate the code that matches the method described there, but this isn't always possible or practical. 

This plugin is ideal for sites that have legacy content moving from fixed to responsive layouts or those who don't have the knowledge, time or interest in modifying a CMS to follow the pattern.

One thing this plugin offers over the techniques above is detecting the correct ratios of an embedded video and maintaining it site wide.

We know that the majority of standard embed codes (i.e. YouTube) will set the player dimensions to a 16:9 ratio, but what if the player is customised? or what about Vine, where a 1:1 is possible? What if you produce your own video at a custom ratio? jquery-responsiveVideos allows for that and ensures the ratio is consistent on all devices.

###Available Options

The code snippet below shows the available options.

sources - Define the services you use when embedding a video. This name should be lowercase and used in the domain of the src of any embedded code provided to you. You can use any including your own domain, or you can target a subdomain.

ParentEl - The parent container to target. By default this will be 'body' but it's possible you don't want to be resizing videos in sidebars or headers. This gives you the option to limit the scope.

wrapperClass - The class given to a container the plugin wraps around the video

```
$(document).ready(function () {
                $.responsiveVideos({
                    sources : [
                        'youtube',
                        'vine',
                        'brightcove'
                    ],
                    parentEl : 'article',
                    wrapperClass : 'responsive-vid'
                });
            });
```

###How Does It Work?

jQuery-responsiveVideos works as follows:

1. Find all object or iFrame tags within the scope of 'parentEl'
2. Check if their src attributes include a match to the sources provided in settings (if not, check data-src)
3. Wrap any matches inside a div with the 'wrapperClass' class provided in settings
4. Apply inline styles to the object / iFrame

 It'll run once on page load and then you should be all set.
