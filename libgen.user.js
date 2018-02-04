// ==UserScript==
// @name Library Genesis
// @version 0.1.1
// @description Open search results in new tabs
// @match *://libgen.io/search.php*
// @match *://libgen.io/ads.php*
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

//  Inspired from Jeremy Cartrell's HN Script
$(document).ready(function() {
  var addBlankTarget = function() {
    var selector = 'table.c a[title="Libgen.io"], ';
    selector += 'table.c a[title="Libgen.pw"], ';
    selector += 'table.c a[title="Bookfi.net"], ';
    selector += 'table.c a[title~="Bookzz.org"]';

    $(selector).attr('target', '_blank');
  }

  var initDownload = function() {
    if (window.location.href.includes('libgen.io/ads.php')) {
      $('head').append('<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/css-spinning-spinners/1.1.0/load7.css" />');
      $('body').append('<div class="loading"></div>');
      $('<style>').prop("type", "text/css").html("\
        .loading:before {\
          top: 90%;\
        }\
      ").appendTo('head');

      setTimeout(function() {
        var href = $('body > table tr td:nth-child(3) a:first-child').attr('href');
        window.location.replace(href);
      }, 500);
    }
  }

  addBlankTarget();
  initDownload();
});
