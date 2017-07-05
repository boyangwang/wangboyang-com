var preloaderImg = $('.inner-loader-img');
var transitionEvent = whichTransitionEvent();

function main() {
  setupPreloader();
  $(window).on('load', fadeOutAndRemovePreloaders);
  $(window).on('load', doLightning);

  bindPolyfill();
  setupLogoImgToggle();
  $.backstretch("./img/bg.jpg");

  setPageDivHeightToBeWindowHeight();
  $(window).on('orientationchange', setPageDivHeightToBeWindowHeight);

  if (isTouchDevice())
    setupMobileHoverEffectDelay();

  setupScrollButtons();

  setupTabControls();
}

function setPageDivHeightToBeWindowHeight() {
  function toPxString(height) {
    return parseInt(height) + 'px';
  }

  var screenHeight = $(window).height();
  $(".first-page-div").css('min-height', toPxString(screenHeight));
  // var footerDivHeight = $('.footer-texts-div').height() + $('.copyright-footer-div').height() + 100;
  // var remainingHeight = $('.third-page-div').height() - $('.self-container-div').height();
  // footerDivHeight = remainingHeight > footerDivHeight ? remainingHeight : footerDivHeight;
  // 	$(".footer-div").css("height", toPxString(footerDivHeight));
  // alert('resized!');
}

function bindPolyfill() {
  if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
      if (typeof this !== 'function') {
        // closest thing possible to the ECMAScript 5
        // internal IsCallable function
        throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
      }

      var aArgs = Array.prototype.slice.call(arguments, 1);
      var fToBind = this;
      var fNOP = function () {};
      var fBound = function () {
        return fToBind.apply(this instanceof fNOP ?
          this :
          oThis,
          // here arguments different from above. because it's referenced from current scoping,
          // it uses the one from fBound. That is, when fBound is called, the arguments passed.
          // Conclusion: later invokation args come at end, bind passed arguments at beginning
          aArgs.concat(Array.prototype.slice.call(arguments)));
      };
      if (this.prototype) {
        // Function.prototype doesn't have a prototype property
        fNOP.prototype = this.prototype;
      }
      fBound.prototype = new fNOP();
      return fBound;
    };
  }
}

function fadeOutAndRemovePreloaders() {
  $('.inner-loader-div').add(preloaderImg).fadeOut(800);
  $('.outer-loader-div').delay(800).fadeOut(300,
    function () {
      $('.outer-loader-div').remove();
    }
  );
}

function doLightning() {
  setTimeout(function() {
    $('body').append($('<div class="lightning"></div>'));
  }, 2000);
}

function whichTransitionEvent() {
  var t;
  var el = document.createElement('fakeelement');
  var transitions = {
    'transition': 'transitionend',
    'OTransition': 'oTransitionEnd',
    'MozTransition': 'transitionend',
    'WebkitTransition': 'webkitTransitionEnd'
  }

  for (t in transitions) {
    if (el.style[t] !== undefined) {
      return transitions[t];
    }
  }
}

function setupScrollButtons() {
  function scrollToElem(elem) {
    $('html, body').animate({
      scrollTop: elem.offset().top - parseInt(elem.css('margin-top'))
    }, 700);
  }

  $('.main-container-item-a.works').on('click', function (e) {
    // prevent standard hash navigation (avoid blinking in IE)
    e.preventDefault();
    scrollToElem($('.second-page-div'));
  });

  $('.main-container-item-a.about').on('click', function (e) {
    // prevent standard hash navigation (avoid blinking in IE)
    e.preventDefault();
    scrollToElem($('.third-page-div'));
  });
}

function setupPreloader() {
  if (preloaderImg[0].complete) {
    preloaderImg.fadeIn(50);
  } else {
    preloaderImg.on('load', function () {
      $(this).fadeIn(300);
    });
  }
}

function setupLogoImgToggle() {
  $('.logo-img').on('mouseenter click', function (e) {
    $('.youve-entered-p').toggle();
  });
}

function isTouchDevice() {
  return 'ontouchstart' in window // works on most browsers
    ||
    navigator.maxTouchPoints; // works on IE10/11 and Surface
};

function setupMobileHoverEffectDelay() {
  function hoverEffectElemClickHandler(e) {
    var elem = $(this);
    if (elem.attr('data-onTheFly')) {
      return false;
    }
    elem.attr('data-onTheFly', true);
    setTimeout(function () {
      elem.removeAttr('data-onTheFly');
      if (elem.attr('href'))
        window.location = elem.attr('href');
    }, 450);
    return false;
  }
  $('.gallery-div').on('click', 'a', hoverEffectElemClickHandler);
  $('.transition-change-button').on('click', hoverEffectElemClickHandler);
}

function setupTabControls() {
  $('.works-section-tabs-div a').on('click', function(e) {
    if ($(this).hasClass('active'))
      return false;
    $('.works-section-tabs-div a.active').removeClass('active');
    $(this).addClass('active');
    var tabName = $(this).attr('data-tab');
    var myTab = $('.works-section-tab[data-tab="'+ tabName +'"]');
    if (myTab.hasClass('active'))
      return false;
    $('.works-section-tab.active').fadeOut(300).removeClass('active');
    myTab.delay(300).fadeIn(300).addClass('active');
    return false;
  });
  $('.works-section-tabs-div a[data-tab="projects"]').trigger('click');
}

main();