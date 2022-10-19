(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.StyleAttacher = factory());
})(this, (function () { 'use strict';

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }

  const attachers = [];
  //elements created here may be removed for some reason, so set a timer for checking element stat
  let checkerTimer;
  function styleChecker() {
    clearTimeout(checkerTimer);
    for (let attacher of attachers) {
      if (attacher._stylesheets.size > 0 && !attacher._el_link.isConnected) {
        document.head.appendChild(attacher._el_link);
      }
      if (attacher._styles.size > 0 && !attacher._el_style.isConnected) {
        attacher._el_style.setAttribute('from', attacher.name);
        document.head.appendChild(attacher._el_style);
      }
    }
    checkerTimer = setTimeout(() => {
      requestAnimationFrame(styleChecker);
    }, 500);
  }
  styleChecker();
  class StyleAttacher {
    //更改stylesheet的url时先注销旧的url

    /**
     * Creates an instance of StyleAttacher.
     * @param {string} name
     */
    constructor(name) {
      _defineProperty(this, "_createdObjectURL", null);
      _defineProperty(this, "_stylesheets", new Set());
      _defineProperty(this, "_styles", new Set());
      _defineProperty(this, "_el_link", void 0);
      _defineProperty(this, "_el_style", void 0);
      this.name = name || 'attahcedStyles_' + (Math.random() * 0xffffff | 0);
      attachers.push(this);
    }
    attachStyleSheet(csstext) {
      if (csstext instanceof Array === false) csstext = [csstext];
      for (let css of csstext) {
        if (!(css = css.trim())) continue;
        this._stylesheets.add(css);
      }
      let url = URL.createObjectURL(new Blob([[...this._stylesheets].join('\n')], {
        type: 'text/css'
      }));
      if (!this._el_link) {
        const l = this._el_link = document.createElement('link');
        l.rel = 'stylesheet';
        l.type = "text/css";
        l.setAttribute('from', this.name);
      } else {
        URL.revokeObjectURL(this._el_link.href);
      }
      this._el_link.href = url;
      document.head.appendChild(this._el_link);
    }
    appendStyle(csstext) {
      if (!this._el_style) {
        this._el_style = document.createElement('style');
        this._el_style.type = "text/css";
        this._el_style.setAttribute('from', this.name);
      }
      if (csstext instanceof Array === false) csstext = [csstext];
      for (let css of csstext) {
        if (!(css = css.trim())) continue;
        this._styles.add(css);
      }
      this._el_style.innerHTML = [...this._styles].join('\n');
      if (!this._el_style.isConnected) document.head.appendChild(this._el_style);
    }
    resetStyle() {
      this._stylesheets.clear();
      this._styles.clear();
      this.attachStyleSheet('');
      this.appendStyle('');
    }
  }

  return StyleAttacher;

}));
