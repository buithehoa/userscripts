// ==UserScript==
// @name     		AudioBook Bay
// @version     1.1
// @description Automatically copy magnet links to clipboard.
//
// @match *://audiobookbay.fi/*
// @match *://audiobookbay.fi/page/*
// @match *://audiobookbay.fi/abs/*
// @match *://audiobookbay.is/*
// @match *://audiobookbay.is/page/*
// @match *://audiobookbay.is/abs/*
// @match *://audiobookbay.lu/*
// @match *://audiobookbay.lu/page/*
// @match *://audiobookbay.lu/abss/*
// @match *://audiobookbay.net/*
// @match *://audiobookbay.net/page/*
// @match *://audiobookbay.net/abs/*
// @match *://audiobookbay.nl/*
// @match *://audiobookbay.nl/page/*
// @match *://audiobookbay.nl/abs/*
// @match *://audiobookbay.se/*
// @match *://audiobookbay.se/page/*
// @match *://audiobookbay.se/abs/*
//
// @require https://code.jquery.com/jquery-3.6.0.min.js
// ==/UserScript==

$(document).ready(function() {
  var copyToClipboard = function(text) {
    var textarea = $('textarea#comment');
    textarea.val(text);
    textarea.select();
    document.execCommand("copy");
    textarea.val('');
  }

  var addBlankTarget = function() {
    var selector = '.post .postTitle a';
    if ($(selector).length) {
      $(selector).attr('target', '_blank');
    }
  }
  addBlankTarget();

  var magnetLink = $('#magnetLink').get(0);
  magnetLink.scrollIntoView({ block: 'center' });
	magnetLink.click();

  var magnetIcon;
  var waitForMagnetLink = setInterval(function() {
  	magnetIcon = $('#magnetIcon').get(0);

    if (magnetIcon.href != '') {
      console.log('[DEBUG]', magnetIcon.href);

      copyToClipboard(magnetIcon.href);
      magnetIcon.focus();
      clearInterval(waitForMagnetLink);
    }
  }, 500);
});
