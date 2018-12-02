// Inline configuration for jshint below. Prevents `gulp jshint` from failing with quiz starter code.
/* jshint unused: false */

(function(document) {
  'use strict';

  var home = null;

  function addSearchHeader(response) {
    try {
      response = JSON.parse(response).query;
    } catch (e) {
      // it's 'unknown', so leave it alone
    }
    home.innerHTML = '<h2 class="page-title">query: ' + response + '</h2>';
  }

  function get(url) {
    /*
    This code needs to get wrapped in a Promise!
     */
    var req = new XMLHttpRequest();

    req.open('GET', url);
    req.onload = function() {
      if (req.status === 200) {
        // It worked!
        // You'll want to resolve with the data from req.response
      } else {
        // It failed :(
        // Be nice and reject with req.statusText
      }
    };
    req.onerror = function() {
      // It failed :(
      // Pass a 'Network Error' to reject
    };
    req.send();
  }

  window.addEventListener('WebComponentsReady', function() {
    home = document.querySelector('section[data-route="home"]');
    /*
    Uncomment the next line you're ready to start chaining and testing!
    You'll need to add a .then and a .catch. Pass the response to addSearchHeader on resolve or
    pass 'unknown' to addSearchHeader if it rejects.
     */
    // get('../data/earth-like-results.json')
  });
})(document);
