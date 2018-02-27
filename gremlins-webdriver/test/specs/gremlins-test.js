function loadScript(callback) {
  var s = document.createElement('script');
  s.src = 'https://rawgithub.com/marmelab/gremlins.js/master/gremlins.min.js';
  if (s.addEventListener) {
    s.addEventListener('load', callback, false);
  } else if (s.readyState) {
    s.onreadystatechange = callback;
  }
  document.body.appendChild(s);
}

function unleashGremlins(ttl, callback) {
  function stop() {
    horde.stop();
    callback();
  }
  
  var formFiller = gremlins.species.formFiller();

  formFiller.canFillElement(function name(element) {
    return( (element.type == 'text') ||
            (element.type == 'password') ||
            (element.type == 'number') ||
            (element.type == 'email') ||
            (element.type == 'textarea'));
            
  })

  var clicker = gremlins.species.clicker();
  
  clicker.canClick(function (element) {
    return( (element.type == 'button') ||
            (element.tagName == 'A'));
  })
  clicker.clickTypes(['click']);
  
  var horde = window.gremlins.createHorde()
                              .gremlin(formFiller)
                              .gremlin(clicker)
                              .gremlin(gremlins.species.toucher())
                              .gremlin(gremlins.species.scroller());

  horde.seed(1234);

  horde.after(callback);
  window.onbeforeunload = stop;
  setTimeout(stop, ttl);
  horde.unleash();
}

describe('Monkey testing with gremlins ', function() {

  it('it should not raise any error', function() {
    browser.url('/');
    browser.click('button=Cerrar');

    browser.timeoutsAsyncScript(60000);
    browser.executeAsync(loadScript);

    browser.timeoutsAsyncScript(60000);
    browser.executeAsync(unleashGremlins, 50000);
  });

  afterAll(function() {
    browser.log('browser').value.forEach(function(log) {
      browser.logger.info(log.message.split(' ')[2]);
    });
  });

});