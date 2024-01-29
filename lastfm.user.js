// ==UserScript==
// @name last.fm
// @version 1.0
// @description Sort albums in descending order by play count.
//
// @match *://www.last.fm/user/buithehoa/library/albums?date_preset=LAST_30_DAYS&page=1*
// @match *://www.last.fm/user/buithehoa/library/albums?date_preset=ALL&page=31*
// @match *://www.last.fm/user/buithehoa/library/artists?date_preset=ALL&page=2*
// @match *://www.last.fm/user/buithehoa/library/music/*
//
// @require https://code.jquery.com/jquery-3.3.1.min.js
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
//
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

const ARTISTS = [
  "Prince",
  "The Smashing Pumpkins",
  "YUI"
];

const ALBUMS = [
  "72 Seasons",
  "Alive at Twenty-Five - Ritual De Lo Habitual Live",
  "Atum",
  "Bewitched",
  "Bigger Houses",
  "Cân Bằng",
  "Curtain Call (Live 1995)",
  "Hozier (Special Edition)",
  "MY SHORT STORIES",
  "On Earth As It Is: The B-Side/Rarities Collection",
  "SOS",
  "Take Me Back to Eden",
  "The Ballad of Darren (Deluxe)",
  "Welcome 2 America"
];

var getChartListRows = function() {
	return $('.chartlist .chartlist-row').not('.chartlist__placeholder-row');
}

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
  getChartListRows().sort(function(a, b) {
    return 1;
  }).appendTo('.chartlist');
}

var updateAlbumHref = function(element) {
  var a = $(element).find(".chartlist-image a");
  var href = "/user/buithehoa/library" + a.attr("href");
  
  a.attr("href", href);
}


// $(document).ready(function() {
waitForKeyElements(".col-main", function() {
  console.log("[DEBUG] .col-main");
  
  var href = window.location.href;
  
//     $('.col-main').prepend($('nav.pagination'));
    
  var scrobbleCount = 0;

  getChartListRows().each(function(index, element) {
    var rankText = $(element).children('.chartlist-index').text();
    var rank = parseInt(rankText.replace(/,/g, ''));

    var chartListName = $(element).find(".chartlist-name a").text();

    if (href.includes("/library/albums?date_preset=LAST_30_DAYS")) {
      hideByName(element, chartListName, ALBUMS);
    } else if (href.includes("/library/albums?date_preset=ALL")) {
      hideByRank(element, rank, 1501, 1510);
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

    var averageScrobblesPerTrack = (scrobbleCount / getChartListRows().length).toFixed(2);
    $(".metadata-display").html($(".metadata-display").text() + " (Avg: <span style='color: #b90000'>" + averageScrobblesPerTrack + "</span>)");

    sortBackward();
  }

  if ($('.container.content-top-lower').length) {
    $('.container.content-top-lower').get(0).scrollIntoView();
  }
});
