document.addEventListener('DOMContentLoaded', function () {
  window.ttyPlayers = {};
  let urlParams = new URLSearchParams(window.location.search);
  let id = urlParams.get('id');
  let playURL = `/api/session-log-play/${id}`

  var elements = document.querySelectorAll('.ttyplay');

  for (var i = 0, length = elements.length; i < elements.length; ++i) {
    var element = elements[i];

    if (!element.id) {
      element.id = 'ttyplay_' + ('000000' + parseInt(0x1000000 * Math.random(), 10).toString(16)).slice(-6);
    }

    window.ttyPlayers[element.id] = new TTYPlay(element, {
      url: playURL,
      gzip: false,
      //precompose  : element.dataset.precompose == true || element.dataset.precompose == 'true',
      cols: parseInt(element.dataset.cols) || 80,
      rows: parseInt(element.dataset.rows) || 25,
      speed: parseFloat(element.dataset.speed) || 3.0,
      auto: true,
      repeat: true,
      position: 0,
      controls: true,
    });
  }
});
