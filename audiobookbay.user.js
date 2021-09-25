// ==UserScript==
// @name     		AudioBook Bay
// @version     1.0
// @description Automatically copy magnet links to clipboard.
//
// @match *://audiobookbay.nl/audio-books/*
//
// @require https://code.jquery.com/jquery-3.6.0.min.js
// ==/UserScript==

$(document).ready(function() {
  var magnetLink = $('#magnetLink').get(0);

  magnetLink.scrollIntoView({ behavior: 'smooth' });
	magnetLink.click();

  setTimeout(function() {
    var magnetIcon = $('#magnetIcon').get(0);
    if (magnetIcon) {
    	console.log('[DEBUG]', magnetIcon.href);

      var textarea = $('textarea#comment');
      textarea.val(magnetIcon.href);
     	textarea.select();
      document.execCommand("copy");
      textarea.val('');
    }

  }, 2000);

});
