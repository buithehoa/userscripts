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
  var textarea = $('textarea#comment');
  textarea.get(0).scrollIntoView({ behavior: 'smooth', block: 'end' });

  var magnetLink = $('#magnetLink').get(0);
	magnetLink.click();

  setTimeout(function() {
    var copyToClipboard = function(text) {
      textarea.val(text);
     	textarea.select();
      document.execCommand("copy");
      textarea.val('');
    }

    var magnetIcon = $('#magnetIcon').get(0);
    if (magnetIcon) {
    	console.log('[DEBUG]', magnetIcon.href);

      copyToClipboard(magnetIcon.href);
      magnetIcon.focus();
    }

  }, 2000);
});
