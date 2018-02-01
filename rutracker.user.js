// ==UserScript==
// @name rutracker.org
// @version 0.1.1
// @description Open search results in new tab and automatically trigger the download.
// @match *://rutracker.org/forum/tracker.php*
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

$(document).ready(function() {

  if ($('#search-results').length != 0) {
    $('#search-results').get(0).scrollIntoView();
  }
});
