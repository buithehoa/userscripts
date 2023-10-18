// ==UserScript==
// @name last.fm
// @version 1.0
// @description Sort albums in descending order by play count.
//
// @match *://www.last.fm/user/buithehoa/library/albums?date_preset=LAST_30_DAYS*
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
  waitForEl('.chartlist .chartlist-row', function() {
    /*
    $('.chartlist .chartlist-row').sort(function(a, b) {
      return 1;
    }).appendTo('.chartlist');

    $('.col-main').prepend($('nav.pagination'));
		*/
    
    $('.chartlist .chartlist-row').each(function(index, element) {
      var rank = parseInt($(element).children('.chartlist-index').text());
      
      var startRank = 21;
      var endRank = 28;
      
      if ($('.library-top .metadata-title').text().trim() == 'Artists Scrobbled') {
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
