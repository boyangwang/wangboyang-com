var preloaderImg = $('.inner-loader-img');
var transitionEvent = whichTransitionEvent();

function main() {
  setupPreloader();
  $(window).load(fadeOutAndRemovePreloaders);

  bindPolyfill();
  setupLogoImgToggle();
  $.backstretch("./img/bg.jpg");

  setPageDivHeightToBeWindowHeight();
  $(window).on('orientationchange', setPageDivHeightToBeWindowHeight);

  setupMobileHoverEffectDelay();

  setupScrollButtons();

}

function setPageDivHeightToBeWindowHeight() {
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
    Function.prototype.bind = function(oThis) {
      if (typeof this !== 'function') {
        // closest thing possible to the ECMAScript 5
        // internal IsCallable function
        throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
      }

      var aArgs   = Array.prototype.slice.call(arguments, 1),
          fToBind = this,
          fNOP    = function() {},
          fBound  = function() {
            return fToBind.apply(this instanceof fNOP
                   ? this
                   : oThis,
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

function toPxString(height) {
	return parseInt(height) + 'px';
}

function scrollToElem(elem) {
	$('html, body').animate({
		scrollTop: elem.offset().top - parseInt(elem.css('margin-top'))
	}, 700);
}

function fadeOutAndRemovePreloaders() {
  $('.inner-loader-div').add(preloaderImg).fadeOut(800);
  $('.outer-loader-div').delay(800).fadeOut(300,
    function() {
      $('.outer-loader-div').remove();
    }
  );
}

function whichTransitionEvent(){
    var t;
    var el = document.createElement('fakeelement');
    var transitions = {
      'transition':'transitionend',
      'OTransition':'oTransitionEnd',
      'MozTransition':'transitionend',
      'WebkitTransition':'webkitTransitionEnd'
    }

    for(t in transitions){
        if( el.style[t] !== undefined ){
            return transitions[t];
        }
    }
}

function setupScrollButtons() {
  $('.navbar-item-a.projects').on('click', function(e) {
    // prevent standard hash navigation (avoid blinking in IE)
    e.preventDefault();
    scrollToElem($('.second-page-div'));
  });

  $('.navbar-item-a.about').on('click', function(e) {
    // prevent standard hash navigation (avoid blinking in IE)
    e.preventDefault();
    scrollToElem($('.third-page-div'));
  });

  $('.downward-arrow-div').on('click', function(e) {
    // prevent standard hash navigation (avoid blinking in IE)
    e.preventDefault();
    scrollToElem($('.second-page-div'));
  });

  $('.upward-arrow-div').on('click', function(e) {
    // prevent standard hash navigation (avoid blinking in IE)
    e.preventDefault();
    scrollToElem($('.first-page-div'));
  });
}

function setupPreloader() {
  if (preloaderImg[0].complete) {
    preloaderImg.fadeIn(50);
  }
  else {
    preloaderImg.load(function() { $(this).fadeIn(300); });
  }
}

function setupLogoImgToggle() {
  $('.logo-img').on('mouseenter click', function(e) {
    $('.youve-entered-p').toggle();
  });
}

function isTouchDevice() {
  return 'ontouchstart' in window        // works on most browsers
      || navigator.maxTouchPoints;       // works on IE10/11 and Surface
};

function hoverEffectElemClickHandler(e) {
  var elem = $(this);
  if (elem.attr('data-onTheFly')) {
    return false;
  }
  elem.attr('data-onTheFly', true);
  setTimeout(function() {
    elem.removeAttr('data-onTheFly');
    window.location = elem.attr('href');
  }, 450);
  return false;
}

function setupMobileHoverEffectDelay() {
  if (!isTouchDevice()) {
    return;
  }
  $('.gallery-div').on('click', 'a', hoverEffectElemClickHandler);
  $('.transition-change-button').on('click', hoverEffectElemClickHandler);
}

main();