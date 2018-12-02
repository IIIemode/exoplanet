/*
Instructions:
(1) Get the planet data and add the search header.
(2) Create the first thumbnail with createPlanetThumb(data)
(3) Handle errors!
  (a) Pass 'unknown' to the search header.
  (b) console.log the error.
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
    return fetch(url, {
      method: 'get'
    });
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
      return getJSON(response.results[0]);
    })
    .catch(function() {
      throw Error('Search Request Error');
    })
    .then(function(planetData) {
      createPlanetThumb(planetData);
    })
    .catch(function(e) {
      addSearchHeader('unknown');
      console.log(e);
    });
  });
})(document);
