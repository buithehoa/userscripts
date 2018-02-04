// ==UserScript==
// @name Library Genesis
// @version 0.1.1
// @description Open search results in new tab and automatically trigger the download.
// @match *://libgen.io/search.php*
// @match *://libgen.io/ads.php*
// @match *://libgen.pw/item/*
// @require http://code.jquery.com/jquery-latest.js
// @namespace https://greasyfork.org/users/5782
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

  var Downloader = {
    TIMEOUT: 500,
    init: function(href) {
      if (href.includes('libgen.io/ads.php')) {
        Downloader.initLibgenio();
      } else if (href.includes('libgen.pw/item')) {
        Downloader.initLibgenpw();
      }
    },
    initLibgenio: function() {
      Downloader.showSpinner();

      setTimeout(function() {
        var href = $('body > table tr td:nth-child(3) a:first-child').attr('href');
        window.location.replace(href);
      }, Downloader.TIMEOUT);
    },
    initLibgenpw: function() {
      Downloader.showSpinner();

      setTimeout(function() {
        if ($('.book-info__download a').length > 0) {
          window.location.href = $('.book-info__download a').attr('href');
        } else if ($('.book-info__get a').length > 0) {
          window.location.replace($('.book-info__get a').attr('href'));
        }
      }, Downloader.TIMEOUT);
    },
    showSpinner: function() {
      $('head').append('<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/css-spinning-spinners/1.1.0/load7.css" />');
      $('body').append('<div class="loading"></div>');
      $('<style>').prop("type", "text/css").html("\
        .loading:before {\
          top: 90%;\
        }\
      ").appendTo('head');
    }
  }

  addBlankTarget();
  Downloader.init(window.location.href);
});
