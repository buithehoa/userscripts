// ==UserScript==
// @name zlibrary
// @version 1.1
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
    try {
      let coverElement = shadowHost.shadowRoot.querySelector('.tile .cover a');
      if (coverElement) {
        coverElement.setAttribute('target', '_blank');
      }

      let volumeLink = shadowHost.shadowRoot.querySelector(".volume a");
      if (volumeLink) {
        volumeLink.setAttribute('target', '_blank');
      }
    } catch (error) {
      console.error('Error in addBlankTargetToCovers:', error);
    }
  });
}

function addBlankTargetToTitles(shadowHosts) {
  shadowHosts.forEach((shadowHost) => {
    try {
      let title = shadowHost.shadowRoot.querySelector(".tile .book-info a.title");
      if (title) {
        title.setAttribute('target', '_blank');
      }
    } catch (error) {
      console.error('Error in addBlankTargetToTitles:', error);
    }
  });
}

function waitForShadowRoot(selector, callback) {
  // First check if elements already exist
  let shadowHost = document.querySelector(selector);
  if (shadowHost && shadowHost.shadowRoot) {
    callback(shadowHost.shadowRoot);
    return;
  }

  const observer = new MutationObserver((mutations, obs) => {
    let shadowHost = document.querySelector(selector);

    if (shadowHost && shadowHost.shadowRoot) {
      obs.disconnect(); // Stop observing once found
      callback(shadowHost.shadowRoot);
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

function waitForElement(selector, callback) {
  // First check if element already exists
  let element = document.querySelector(selector);
  if (element) {
    callback(element);
    return;
  }

  const observer = new MutationObserver((mutations, obs) => {
    let element = document.querySelector(selector);

    if (element) {
      obs.disconnect(); // Stop observing once found
      callback(element);
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

// Only run search result modifications on search pages
if (window.location.pathname.includes('/s/')) {
  waitForShadowRoot(".book-item z-bookcard", () => {
    let searchForm = document.getElementById('searchForm');
    searchForm?.scrollIntoView();

    let shadowHosts = document.querySelectorAll(".book-item z-bookcard");

    addBlankTargetToCovers(shadowHosts);
    addBlankTargetToTitles(shadowHosts);
  });
}

// Only run auto-download on book detail pages
if (window.location.pathname.includes('/book/')) {
  waitForElement('.book-actions-container a.addDownloadedBook', (element) => {
    setTimeout(() => {
      try {
        element.focus();
        element.click();
      } catch (e) {
        console.error('Failed to trigger download:', e);
      }
    }, 500); // Wait 500ms before attempting clicks
  });
}
