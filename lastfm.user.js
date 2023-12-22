// ==UserScript==
// @name last.fm
// @version 1.0
// @description Sort albums in descending order by play count.
//
// @match *://www.last.fm/user/buithehoa/library/albums?date_preset=LAST_30_DAYS&page=1*
// @match *://www.last.fm/user/buithehoa/library/albums?date_preset=ALL&item=1501*
// @match *://www.last.fm/user/buithehoa/library/artists?date_preset=ALL&page=2*
// @match *://www.last.fm/user/buithehoa/library/music/*
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
  "ATUM",
  "Bigger Houses",
  "BLACK and WHITE RAINBOWS (Remastered with Bonus Tracks)",
  "Brigade",
  "Chúng Ta Đều Muốn Một Thứ",
  "Curtain Call (Live 1995)",
  "Diamonds And Pearls (Super Deluxe Edition)",
  "Hasta la Raíz (Edición Especial)",
  "Hozier (Special Edition)",
  "I Disagree",
  "Licked Live In NYC",
  "Meds",
  "Miss Anthropocene (Rave Edition)",
  "On Earth As It Is: The B-Side/Rarities Collection",
  "Only the Strong Survive",
  "Positions",
  "Queen Radio: Volume 1",
  "Real Live Sound",
  "Reli XIV",
  "SOS",
  "Syksy (Live Helsinki '64)",
  "The Ballad of Darren (Deluxe)",
  "The Voyage",
  "Toys in the Attic",
  "Train of Thought",
  "TRUSTFALL",
];

var chartListRows = $('.chartlist .chartlist-row').not('.chartlist__placeholder-row');

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
  chartListRows.sort(function(a, b) {
    return 1;
  }).appendTo('.chartlist');
}

var updateAlbumHref = function(element) {
  var a = $(element).find(".chartlist-image a");
  var href = "/user/buithehoa/library" + a.attr("href");
  
  a.attr("href", href);
  
  console.log(a.attr('href'));
  
}

$(document).ready(function() {
  var href = window.location.href;
  
  waitForEl('.chartlist .chartlist-row', function() {

//     $('.col-main').prepend($('nav.pagination'));
    
    var scrobbleCount = 0;
    
    chartListRows.each(function(index, element) {
      var rankText = $(element).children('.chartlist-index').text();
      var rank = parseInt(rankText.replace(/,/g, ''));
      
      var chartListName = $(element).find(".chartlist-name a").text();
      
      if (href.includes("/library/albums?date_preset=LAST_30_DAYS")) {
        hideByName(element, chartListName, ALBUMS);
      } else if (href.includes("/library/albums?date_preset=ALL")) {
        hideByRank(element, rank, 1501, 1508);
      } else if (href.includes("/library/artists?date_preset=ALL")) {
        hideByName(element, chartListName, ARTISTS);
      }
      
      updateAlbumHref(element);
      
      var countBarValue = $(element).find('.chartlist-count-bar-value').contents().get(0).nodeValue;
      scrobbleCount += parseInt(countBarValue);
    });
    
    if (href.includes("/library/albums?date_preset=LAST_30_DAYS")) {
    	sortBackward();
    } else if (href.includes("/library/music/")) {
      
      var averageScrobblesPerTrack = (scrobbleCount / chartListRows.length).toFixed(2);
      $(".metadata-display").html($(".metadata-display").text() + " (Avg: <span style='color: #b90000'>" + averageScrobblesPerTrack + "</span>)");
      
    	sortBackward();
    }
    
    if ($('.container.content-top-lower').length) {
      $('.container.content-top-lower').get(0).scrollIntoView();
    }
  });
});
