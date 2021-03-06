// ==UserScript==
// @name codementor.io
// @version 0.1.1
// @description Open requests in new tab
// @match *://www.codementor.io/m/dashboard/open-requests*
// @require https://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==

$(document).ready(function() {
  addClickHandler();
  
  setInterval(function() {
		console.log("[Greasemonkey][Codementor] Refreshing open item list ...");
    
    $(".request-filter__refresh-btn").click();
    
    setTimeout(function() {
      addClickHandler();
			console.log("[Greasemonkey][Codementor] Refreshing open item list ... DONE");
    }, 2000);
    
    var closeButtonSelector = ".instant-help__request .close";
    if ($(closeButtonSelector).length) {
      console.log("[Greasemonkey][Codementor] Closing new request notification ...");
      $(closeButtonSelector).click();
    }
    
  }, 5 * 60 * 1000);
});

function addClickHandler() {
  var selector = 'a.dashboard__open-question-item';
  
  waitForEl(selector, function() {
    var newElementCount = 0;
    
    $(selector).each(function(index, element) {
      if (typeof $(element).data("blessed") === 'undefined') {
        newElementCount++;
        
        $(element).data("blessed", "1");
        $(element).click(function(e) {
          e.preventDefault();

          var url = $(this).attr('href');
          window.open(url, '_blank');
        });
      }
    });
    
    console.log("[Greasemonkey][Codementor] New element count: " + newElementCount);
  });
}

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
        console.log("[Greasemonkey][Codementor] Waiting for new elements ...");
        waitForEl(selector, callback, count);
      } else {return;}
    }, TIMEOUT);
  }
};
