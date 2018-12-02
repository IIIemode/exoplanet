/*
Instructions:
(1) Rewrite get with the Fetch API: https://davidwalsh.name/fetch
(2) Finish the getJSON method. getJSON should take a URL and return the parsed JSON response.
  (a) getJSON needs to return a Promise!
(3) Test by console.logging the response and by passing the query string from getJSON to addSearchHeader.
(4) Handle errors by passing "unknown" to addSearchHeader.
 */

// Inline configuration for jshint below. Prevents `gulp jshint` from failing with quiz starter code.
/* jshint unused: false */

(function(document) {
  'use strict';

  var home = null;

  function addSearchHeader(query) {
    home.innerHTML = '<h2 class="page-title">query: ' + query + '</h2>';
  }

  function get(url) {
    return fetch(url, {
      method: 'get'
    });
  }

  function getJSON(url) {
    return get(url).then(function(response) {
      // Handle network errors
      if (!response.ok) {
        throw Error(response.statusText ? response.statusText : 'Unknown network error');
      }

      return response.json();
    });
  }

  window.addEventListener('WebComponentsReady', function() {
    home = document.querySelector('section[data-route="home"]');
    getJSON('../data/earth-like-results.json')
    .then(function(response) {
      addSearchHeader(response.query);
      console.log(response);
    })
    .catch(function(error) {
      addSearchHeader('unknown');
      console.log(error);
    });
  });
})(document);
