/*! @name videojs-logo @version 2.1.1 @license MIT */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('video.js')) :
  typeof define === 'function' && define.amd ? define(['video.js'], factory) :
  (global = global || self, global.videojsLogo = factory(global.videojs));
}(this, function (videojs) { 'use strict';

  videojs = videojs && videojs.hasOwnProperty('default') ? videojs['default'] : videojs;

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  var version = "2.1.1";

  var Plugin = videojs.getPlugin('plugin'); // Default options for the plugin.

  var defaults = {
    image: undefined,
    url: undefined,
    position: 'top-right',
    offsetH: 0,
    offsetV: 0,
    width: undefined,
    height: undefined,
    padding: 5,
    fadeDelay: 5000,
    hideOnReady: false,
    opacity: 1
  };
  /**
   * A videojs plugin to display a logo image on the player.
   */

  var Logo =
  /*#__PURE__*/
  function (_Plugin) {
    _inheritsLoose(Logo, _Plugin);

    /**
     * Create a Logo plugin instance.
     *
     * @param {Player} player A Video.js Player instance.
     * @param {Object} options An optional options object.
     * @param {String} options.image The URL to the logo image.
     * @param {String} [options.url] A url to be linked to from the logo. If the user clicks the logo the link will open in a new window.
     * @param {String} [options.position="top-right"] The location to place the logo (top-left, top-right, bottom-left, or bottom-right).
     * @param {Number} [options.offsetH=0] Horizontal offset (px) from the edge of the video.
     * @param {Number} [options.offsetV=0] Vertical offset (px) from the edge of the video.
     * @param {Number} [options.width] The width of the logo image (px). If not specified, it will be the width of the original image.
     * @param {Number} [options.height] The height of the logo image (px). If not specified, it will be the height of the original image.
     * @param {Number} [options.padding=5] Padding around the logo image (px).
     * @param {?Number} [options.fadeDelay=5000] Time until fade-out begins (msec). If `null` is specified, automatic fade-out is not performed.
     * @param {Boolean} [options.hideOnReady=false] Do not show the logo image when the player is ready.
     * @param {Number} [options.opacity=1] The opacity of the image. If not specified it will default to 1
     */
    function Logo(player, options) {
      var _this;

      _this = _Plugin.call(this, player) || this;
      _this.tid = null;
      _this.div = null;
      _this.options = videojs.mergeOptions(defaults, options);

      _this.player.ready(function () {
        return _this._onPlayerReady();
      });

      return _this;
    }
    /**
     * Start the plugin after the player is ready.
     *
     * @private
     */


    var _proto = Logo.prototype;

    _proto._onPlayerReady = function _onPlayerReady() {
      this.player.addClass('vjs-logo');

      if (!this.options.image) {
        return;
      }

      this._setup();

      if (!this.options.hideOnReady) {
        this.show();
      }
    }
    /**
     * Setup the plugin.
     *
     * @private
     */
    ;

    _proto._setup = function _setup() {
      var _this2 = this;

      var video = this.player.el(); // Create div element

      var div = document.createElement('div'); // eslint-disable-line no-undef

      div.classList.add('vjs-logo-content');
      div.classList.add('vjs-logo-hide');
      div.style.padding = this.options.padding + 'px'; // Setup position

      var _this$options = this.options,
          offsetH = _this$options.offsetH,
          offsetV = _this$options.offsetV;

      switch (this.options.position) {
        case 'top-left':
          div.style.top = offsetV + 'px';
          div.style.left = offsetH + 'px';
          break;

        case 'top-right':
          div.style.top = offsetV + 'px';
          div.style.right = offsetH + 'px';
          break;

        case 'bottom-left':
          div.style.bottom = offsetV + 'px';
          div.style.left = offsetH + 'px';
          break;

        case 'bottom-right':
          div.style.bottom = offsetV + 'px';
          div.style.right = offsetH + 'px';
          break;

        default:
          div.style.top = offsetV + 'px';
          div.style.right = offsetH + 'px';
      }

      this.div = div; // Create img element

      var img = document.createElement('img'); // eslint-disable-line no-undef

      img.src = this.options.image;
      var _this$options2 = this.options,
          width = _this$options2.width,
          height = _this$options2.height,
          opacity = _this$options2.opacity;

      if (width) {
        img.width = width;
      }

      if (height) {
        img.height = height;
      }

      if (opacity) {
        img.style.opacity = opacity;
      }

      if (this.options.url) {
        // Create a element for the image link
        var a = document.createElement('a'); // eslint-disable-line no-undef

        a.href = this.options.url;

        a.onclick = function (e) {
          e.preventDefault();
          window.open(_this2.options.url); // eslint-disable-line no-undef
        };

        a.appendChild(img);
        div.appendChild(a);
      } else {
        div.appendChild(img);
      }

      video.appendChild(div);
    }
    /**
     * Show the logo image.
     */
    ;

    _proto.show = function show() {
      var _this3 = this;

      // Clear timeout if set
      if (this.tid) {
        clearTimeout(this.tid);
        this.tid = null;
      } // Show the logo image


      if (this.div) {
        this.div.classList.remove('vjs-logo-hide');
      } // Set timeout to hide the logo image


      if (this.options.fadeDelay !== null) {
        this.tid = setTimeout(function () {
          _this3.hide();

          _this3.tid = null;
        }, this.options.fadeDelay);
      }
    }
    /**
     * Hide logo image.
     */
    ;

    _proto.hide = function hide() {
      // Hide the logo image
      if (this.div) {
        this.div.classList.add('vjs-logo-hide');
      }
    };

    return Logo;
  }(Plugin); // Define default values for the plugin's `state` object here.


  Logo.defaultState = {}; // Include the version number.

  Logo.VERSION = version; // Register the plugin with video.js.

  videojs.registerPlugin('logo', Logo);

  return Logo;

}));
