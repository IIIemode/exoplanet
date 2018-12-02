/*
Instructions:
(1) Use .map to fetch all the planets in parallel.
  (a) Call .map on an array and pass it a function.
  (b) .map will execute the function against each element in the array immediately.
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

      addSearchHeader(response.query);

      response.results.map(function(url) {
        getJSON(url).then(createPlanetThumb);
      });
    });
  });
})(document);
