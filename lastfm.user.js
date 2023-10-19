// ==UserScript==
// @name last.fm
// @version 1.0
// @description Sort albums in descending order by play count.
//
// @match *://www.last.fm/user/buithehoa/library/albums?date_preset=LAST_30_DAYS*
// @match *://www.last.fm/user/buithehoa/library/albums?date_preset=ALL&item=1501*
// @match *://www.last.fm/user/buithehoa/library/artists?date_preset=ALL&item=31*
//
// @require https://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

var waitForEl = function(selector, callback, count) {
  var MAX_NUMBER_OF_RETRIES = 60;
  var TIMEOUT = 1000;

  if (jQuery(selector).length) {
    callback();
  } else {
    setTimeout(function() {
      if (!count) {
        count = 0;
      }
      count++;
      if (count <= MAX_NUMBER_OF_RETRIES) {
        waitForEl(selector, callback, count);
      } else {return;}
    }, TIMEOUT);
  }
};

$(document).ready(function() {
  var href = window.location.href;
  
  waitForEl('.chartlist .chartlist-row', function() {
    /*
    $('.chartlist .chartlist-row').sort(function(a, b) {
      return 1;
    }).appendTo('.chartlist');

    $('.col-main').prepend($('nav.pagination'));
		*/
    
    $('.chartlist .chartlist-row').each(function(index, element) {
      var rankText = $(element).children('.chartlist-index').text();
      var rank = parseInt(rankText.replace(/,/g, ''));
      
      var startRank = 1;
      var endRank = 50;
      
      if (href.includes("/library/albums?date_preset=LAST_30_DAYS")) {
        startRank = 21;
        endRank = 28;
      } else if (href.includes("/library/albums?date_preset=ALL")) {
      	startRank = 1501;
        endRank = 1508;
      } else if (href.includes("/library/artists?date_preset=ALL")) {
      	startRank = 31;
        endRank = 38;
      }
      
      if (rank < startRank || rank > endRank) {
        $(element).hide();
      }
    });
    
    if ($('.container.content-top-lower').length) {
      $('.container.content-top-lower').get(0).scrollIntoView();
    }
  });
});
