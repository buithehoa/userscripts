// ==UserScript==
// @name last.fm
// @version 1.0
// @description Sort albums in descending order by play count.
//
// @match *://www.last.fm/user/buithehoa/library/albums?date_preset=LAST_30_DAYS&page=1*
// @match *://www.last.fm/user/buithehoa/library/albums?date_preset=ALL&item=1501*
// @match *://www.last.fm/user/buithehoa/library/artists?date_preset=ALL&page=2*
//
// @require https://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

const ARTISTS = [
  "Foo Fighters",
  "Gipsy Kings",
  "Prince",
  "The Smashing Pumpkins",
  "YUI"
];

const ALBUMS = [
  "72 Seasons",
  "Alive at Twenty-Five - Ritual De Lo Habitual Live",
  "And Time Begins",
  "Bad Reputation",
  "Bigger Houses",
  "Black and White Rainbows (Deluxe Edition)",
  "Brigade",
  "Cheap Queen (Deluxe)",
  "Chim Vao Lang Quen",
  "Chúng Ta Đều Muốn Một Thứ",
  "CITIZENS",
  "Curtain Call (Live 1995)",
  "Hozier (Special Edition)",
  "I Disagree",
  "Licked Live In NYC",
  "Live from the Artists Den",
  "Meds",
  "Miss Anthropocene (Rave Edition)",
  "On Earth As It Is: The B-Side/Rarities Collection",
  "Only the Strong Survive",
  "Positions",
  "Seventeen",
  "SOS",
  "The Ballad of Darren (Deluxe)",
  "the storm before the calm",
  "The Voyage",
  "Toys in the Attic",
  "Train of Thought",
  "TRUSTFALL",
  "Tulip Drive",
];

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

var hideByRank = function(element, rank, startRank, endRank) {
  if (rank < startRank || rank > endRank) {
    $(element).hide();
  }
}

var hideByName = function(element, chartListName, names) {
	if (! names.includes(chartListName)) {
    $(element).hide();
  }
}

var sortBackward = function() {
  $('.chartlist .chartlist-row').sort(function(a, b) {
    return 1;
  }).appendTo('.chartlist');
}

$(document).ready(function() {
  var href = window.location.href;
  
  waitForEl('.chartlist .chartlist-row', function() {

//     $('.col-main').prepend($('nav.pagination'));
    
    $('.chartlist .chartlist-row').each(function(index, element) {
      var rankText = $(element).children('.chartlist-index').text();
      var rank = parseInt(rankText.replace(/,/g, ''));
      
      var chartListName = $(element).find(".chartlist-name a").text();
      console.log(chartListName);
      
      var startRank = 1;
      var endRank = 50;
      
      if (href.includes("/library/albums?date_preset=LAST_30_DAYS")) {
        hideByName(element, chartListName, ALBUMS);
      } else if (href.includes("/library/albums?date_preset=ALL")) {
        hideByRank(element, rank, 1501, 1508);
      } else if (href.includes("/library/artists?date_preset=ALL")) {
        hideByName(element, chartListName, ARTISTS);
      }
    });
    
    if (href.includes("/library/albums?date_preset=LAST_30_DAYS")) {
    	sortBackward();
    }
    
    if ($('.container.content-top-lower').length) {
      $('.container.content-top-lower').get(0).scrollIntoView();
    }
  });
});
