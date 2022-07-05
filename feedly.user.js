// ==UserScript==
// @name        Raven
// @namespace   https://feedly.com
// @include     /^https?://feedly\.com/.*$/
// @description Scroll the left pane to the selected tag or feed.
// @version     1.0.1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @require     https://raw.githubusercontent.com/rafaelw/mutation-summary/master/src/mutation-summary.js
// @grant       none
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

var observer = new MutationSummary({
  callback: rowYourBoat,
  queries: [
    { element: "div.LeftnavListRow", elementAttributes: "class" }
  ]
});

function rowYourBoat(summaries) {
  summaries.forEach(function(summary) {
    summary.attributeChanged.class.every(function(element) {
      if (element.classList.contains("LeftnavListRow--selected")) {
        element.scrollIntoView({behavior: "smooth", block: "center"});
        return false;
      }
      return true;
    });
  });
}
