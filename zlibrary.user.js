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

'use strict';

function addBlankTargetToCovers(shadowHosts) {
  shadowHosts.forEach((shadowHost) => {
    shadowHost = shadowHost.shadowRoot.querySelector('.tile .cover a z-cover');
    
  	let cover = shadowHost.shadowRoot.querySelector(".volume a");
    cover.setAttribute('target', '_blank');
  })
}

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

waitForShadowRoot(".book-item z-bookcard", () => {
  let searchForm = document.getElementById('searchForm');
  searchForm?.scrollIntoView();
  
  let shadowHosts = document.querySelectorAll(".book-item z-bookcard");
  addBlankTargetToCovers(shadowHosts);
  
  shadowHosts = document.querySelectorAll(".book-item z-bookcard");  
	addBlankTargetToTitles(shadowHosts);
});

function waitForElement(selector, callback) {
  const observer = new MutationObserver((mutations, obs) => {
    let element = document.querySelector(selector);

    if (element) {
      obs.disconnect(); // Stop observing once found
      callback(element);
    }
  });

  observer.observe(document.body, { // Observe changes to the body
    childList: true,
    subtree: true,
  });
}

waitForElement('.book-actions-container a.addDownloadedBook', (element) => {
	element.click();
});
