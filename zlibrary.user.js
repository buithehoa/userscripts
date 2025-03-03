// ==UserScript==
// @name zlibrary
// @version 1.0
// @description Open search results in new tab and automatically trigger the download.
//
// @match *://1lib.sk/s/*
// @match *://1lib.sk/book/*
// @match *://singlelogin.re/s/*
// @match *://singlelogin.re/book/*
// @match *://z-library.sk/s/*
// @match *://z-library.sk/book/*
//
// ==/UserScript==

function addBlankTargetToTitles(shadowHosts) {
  shadowHosts.forEach((shadowHost) => {
  	let title = shadowHost.shadowRoot.querySelector(".tile .book-info a.title");
    title.setAttribute('target', '_blank');
  })
}

function waitForShadowRoot(selector, callback) {
  const observer = new MutationObserver((mutations, obs) => {
    let shadowHost = document.querySelector(selector);

    if (shadowHost && shadowHost.shadowRoot) {
      obs.disconnect(); // Stop observing once found
      callback(shadowHost.shadowRoot);
    }
  });

  observer.observe(document.body, { // Observe changes to the body
    childList: true,
    subtree: true,
  });
}

// Example usage:
waitForShadowRoot(".book-item z-bookcard", () => {
  let shadowHosts = document.querySelectorAll(".book-item z-bookcard");
  
	addBlankTargetToTitles(shadowHosts);
});

(function() {
  'use strict';
  
  
  
  // Scroll search results into view
//   if ($('#searchForm').length) {
//     $('#searchForm').get(0).scrollIntoView();
//   }

  // Open search result in new tab

//   var coverSelector = '.bookRow .itemCoverWrapper';
//   if ($(coverSelector).length) {
//     $(coverSelector).attr('target', '_blank');
//   }

  // Trigger download
//   var downloadButtonSelector = 'a.addDownloadedBook';
//   if ($(downloadButtonSelector).length) {
//     $(downloadButtonSelector)[0].click();
//   }
})();
