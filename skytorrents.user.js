// ==UserScript==
// @name Sky Torrents
// @version 0.1.1
// @description Open search results in new tab
// @match *://www.skytorrents.in/search/*
// @require https://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==
$(document).ready(function() {
  var selector = 'table.is-striped tr td a:first-child';
  if ($(selector).length) {
    $(selector).attr('target', '_blank');
  }
});
