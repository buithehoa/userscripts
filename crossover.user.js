// ==UserScript==
// @name     Crossover
// @version  1
// @grant    none
// @require https://code.jquery.com/jquery-3.4.1.min.js
// @match *://rutracker.org/forum/*
// @match *://app.crossover.com/x/dashboard/contractor/my-dashboard*
// ==/UserScript==

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
        console.log("[Greasemonkey][Crossover] Waiting for elements ...");
        waitForEl(selector, callback, count);
      } else {return;}
    }, TIMEOUT);
  }
};

var formatFloatAmount = function(amount) {
  return amount.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

$(document).ready(function() {
  console.log("[Greasemonkey][Crossover] Initializing ...");

  var HOURLY_RATE_IN_USD = 30;
  var ONE_USD_IN_VND = 23236.50;
  var HOURS_PER_WEEK = 40;
  var TOTAL_HOUR_REGEXP = /(\d+)h\s(\d+)m/;

  var progressSelector = ".timecardsummary-block .progress-chart .progress .normal";
  waitForEl(progressSelector, function() {
    console.log("[Greasemonkey][Crossover] Elements detected");

    var percentageString;
    var progressInPercentage;
    var totalHourString;
    var totalHours;

    var income;
    var totalIncome = 0;
    $(progressSelector).each(function(index, element) {
      totalHourString = $(element).prop('title').match(TOTAL_HOUR_REGEXP);
      totalHours = parseFloat(totalHourString[1]) + parseFloat(totalHourString[2]) / 60;
      if (totalHours > 40.0) totalHours = 40.0;

      income = totalHours * HOURLY_RATE_IN_USD * ONE_USD_IN_VND;
      totalIncome = totalIncome + income;

    	$(this).text(formatFloatAmount(income));
      $(this).css('height', '24px');
      $(this).css('padding-top', '0.2em');
      $(this).css('padding-left', '0.5em');
      $(this).css('color', '#fff');
    });

    var totalAmountSelector = '.timecardsummary-block .top20 h4 span';
    $(totalAmountSelector).text('(' + formatFloatAmount(totalIncome) + ')');
    $(totalAmountSelector).css('font-size', '1em');
  });
});
