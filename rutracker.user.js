// ==UserScript==
// @name rutracker.org
// @version 1.0
// @description Open search results in new tab and automatically trigger the download.
// @match *://rutracker.org/forum/*
// @require https://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==

$(document).ready(function() {
  // Scroll search results into view
  if ($('#search-results').length) {
    $('#search-results').get(0).scrollIntoView();
  }

  // Open search result in new tab
  var selector = '#tor-tbl a.tLink';
  if ($(selector).length) {
    $(selector).attr('target', '_blank');
  }

  // Copy magnet link to clipboard
  if ($('#topic_main').length) {
    setClipboardText($('a.med.magnet-link').attr('href'));
    $('#topic_main').get(0).scrollIntoView();

    setTimeout(function() {
      var magnetIcon = "<img\
				src='https://static.rutracker.cc/templates/v1/images/magnet_1.svg'\
				style='width: 1em; margin-left: 0.5em;'\
				alt='magnet' />";

      $('#topic_main tbody:nth-child(2) .post_body > span:first-child').append(magnetIcon);

      $('.magnet-icon').css('margin-left', '0.5em');
      $('.magnet-icon').fadeIn({
        duration: 2000
      });
    }, 500);
  }
});

/*
 * https://ourcodeworld.com/articles/read/143/how-to-copy-text-to-clipboard-with-javascript-easily
 */
function setClipboardText(text) {
  var id = "mycustom-clipboard-textarea-hidden-id";
  var existsTextarea = document.getElementById(id);

  if (!existsTextarea) {
    console.log("Creating textarea");
    var textarea = document.createElement("textarea");
    textarea.id = id;
    // Place in top-left corner of screen regardless of scroll position.
    textarea.style.position = 'fixed';
    textarea.style.top = 0;
    textarea.style.left = 0;

    // Ensure it has a small width and height. Setting to 1px / 1em
    // doesn't work as this gives a negative w/h on some browsers.
    textarea.style.width = '1px';
    textarea.style.height = '1px';

    // We don't need padding, reducing the size if it does flash render.
    textarea.style.padding = 0;

    // Clean up any borders.
    textarea.style.border = 'none';
    textarea.style.outline = 'none';
    textarea.style.boxShadow = 'none';

    // Avoid flash of white box if rendered for any reason.
    textarea.style.background = 'transparent';
    document.querySelector("body").appendChild(textarea);
    console.log("The textarea now exists :)");
    existsTextarea = document.getElementById(id);
  } else {
    console.log("The textarea already exists :3")
  }

  existsTextarea.value = text;
  existsTextarea.select();

  try {
    var status = document.execCommand('copy');
    if (!status) {
      console.error("[ERROR] Cannot copy text");
    } else {
      console.log("[DEBUG] The text is now on the clipboard", text);
    }
  } catch (err) {
    console.log('[ERROR] Unable to copy.');
  }
}
