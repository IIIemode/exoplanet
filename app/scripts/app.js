/*
Instructions:
(1) Refactor .forEach below to create a sequence of Promises that always resolves in the same
    order it was created.
  (a) Fetch each planet's JSON from the array of URLs in the search results.
  (b) Call createPlanetThumb on each planet's response data to add it to the page.
(2) Use developer tools to determine if the planets are being fetched in series or in parallel.
 */

// Inline configuration for jshint below. Prevents `gulp jshint` from failing with quiz starter code.
/* jshint unused: false */

(function(document) {
  'use strict';

  var home = null;

  function addSearchHeader(query) {
    home.innerHTML = '<h2 class="page-title">query: ' + query + '</h2>';
  }

  function createPlanetThumb(data) {
    var pT = document.createElement('planet-thumb');
    for (var d in data) {
      pT[d] = data[d];
    }
    home.appendChild(pT);
  }

  function get(url) {
    return fetch(url);
  }

  function getJSON(url) {
    return get(url).then(function(response) {
      return response.json();
    });
  }

  window.addEventListener('WebComponentsReady', function() {
    home = document.querySelector('section[data-route="home"]');

    getJSON('../data/earth-like-results.json')
    .then(function(response) {
      var sequence = Promise.resolve();

      addSearchHeader(response.query);

      response.results.forEach(function(url) {
        sequence = sequence.then(function() {
          return getJSON(url);
        })
        .then(createPlanetThumb);
      });
    })
    .catch(function(e) {
      console.log(e);
    });
  });
})(document);
