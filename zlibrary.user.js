// ==UserScript==
// @name zlibrary
// @version 1.0
// @description Open search results in new tab and automatically trigger the download.
//
// @match *://b-ok.asia/s/*
// @match *://b-ok.asia/book/*
//
// @require https://code.jquery.com/jquery-3.5.1.min.js
// ==/UserScript==

$(document).ready(function() {
  // Scroll search results into view
  if ($('#searchForm').length) {
    $('#searchForm').get(0).scrollIntoView();
  }

  // Open search result in new tab
  var titleSelector = 'td h3[itemprop=name] a';
  if ($(titleSelector).length) {
    $(titleSelector).attr('target', '_blank');
  }

  // Trigger download
  var downloadButtonSelector = 'a.dlButton.addDownloadedBook';
  if ($(downloadButtonSelector).length) {
    console.log('hello');
    $(downloadButtonSelector)[0].click();
  }
});
