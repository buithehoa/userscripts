// ==UserScript==
// @name zlibrary
// @version 1.0
// @description Open search results in new tab and automatically trigger the download.
//
// @match *://1lib.sk/s/*
// @match *://1lib.sk/book/*
// @match *://singlelogin.re/s/*
// @match *://singlelogin.re/book/*
// @match *://z-library.rs/s/*
// @match *://z-library.rs/book/*
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

  var coverSelector = '.checkBookDownloaded.itemCoverWrapper a';
  if ($(coverSelector).length) {
    $(coverSelector).attr('target', '_blank');
  }

  // Trigger download
  var downloadButtonSelector = 'a.addDownloadedBook';
  if ($(downloadButtonSelector).length) {
    console.log('hello');
    $(downloadButtonSelector)[0].click();
  }
});
