!function(t) {
  var e = {};

  function n(i) {
    if (e[i]) return e[i].exports;
    var o = e[i] = { i: i, l: !1, exports: {} };
    return t[i].call(o.exports, o, o.exports, n), o.l = !0, o.exports;
  }

  n.m = t, n.c = e, n.d = function(t, e, i) {
    n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: i });
  }, n.r = function(t) {
    'undefined' != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }), Object.defineProperty(t, '__esModule', { value: !0 });
  }, n.t = function(t, e) {
    if (1 & e && (t = n(t)), 8 & e) return t;
    if (4 & e && 'object' == typeof t && t && t.__esModule) return t;
    var i = Object.create(null);
    if (n.r(i), Object.defineProperty(i, 'default', {
      enumerable: !0,
      value: t,
    }), 2 & e && 'string' != typeof t) for (var o in t) n.d(i, o, function(e) {
      return t[e];
    }.bind(null, o));
    return i;
  }, n.n = function(t) {
    var e = t && t.__esModule ? function() {
      return t.default;
    } : function() {
      return t;
    };
    return n.d(e, 'a', e), e;
  }, n.o = function(t, e) {
    return Object.prototype.hasOwnProperty.call(t, e);
  }, n.p = '/', n(n.s = 4);
}([function(t, e, n) {
  'use strict';
  var i = this && this.__importDefault || function(t) {
    return t && t.__esModule ? t : { default: t };
  };
  Object.defineProperty(e, '__esModule', { value: !0 });
  var o = i(n(2)), r = {
    viewWrapperClassName: 'slider',
    orientationClassNames: new Map([[o.default.HORIZONTAL, 'slider_horizontal'], [o.default.VERTICAL, 'slider_vertical']]),
    rangeClassName: 'slider__range',
    scaleClassName: 'slider__scale',
    runnerClassName: 'slider__runner',
    runnerCurrentModifier: 'slider__runner_current',
    stripClassName: 'slider__strip',
    scaleSubElementClassName: 'slider__scale-subelement',
    scaleSubElementMaxAmount: 10,
    tipClassName: 'slider__tip',
    tipHiddenClassName: 'slider__tip_hidden',
    tipBellowClassName: 'slider__tip_below',
    tipsJoinDistance: 15,
  };
  e.default = r;
}, function(t, e, n) {
  'use strict';
  var i, o = this && this.__extends || (i = function(t, e) {
    return (i = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, e) {
      t.__proto__ = e;
    } || function(t, e) {
      for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
    })(t, e);
  }, function(t, e) {
    function n() {
      this.constructor = t;
    }

    i(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n);
  }), r = this && this.__importDefault || function(t) {
    return t && t.__esModule ? t : { default: t };
  };
  Object.defineProperty(e, '__esModule', { value: !0 });
  var s = function(t) {
    function e(e, n) {
      var i = t.call(this) || this;
      return i.DOMNode = document.createElement('div'), i.DOMNode.classList.add(n), e.append(i.DOMNode), i;
    }

    return o(e, t), e.prototype.getDOMNode = function() {
      return this.DOMNode;
    }, e.prototype.destroy = function() {
      this.DOMNode.remove();
    }, e;
  }(r(n(3)).default);
  e.default = s;
}, function(t, e, n) {
  'use strict';
  var i;
  Object.defineProperty(e, '__esModule', { value: !0 }), function(t) {
    t.HORIZONTAL = 'horizontal', t.VERTICAL = 'vertical';
  }(i || (i = {})), e.default = i;
}, function(t, e, n) {
  'use strict';
  Object.defineProperty(e, '__esModule', { value: !0 });
  var i = function() {
    function t() {
      this.observersCallbacks = new Set;
    }

    return t.prototype.attach = function(t) {
      this.observersCallbacks.add(t);
    }, t.prototype.detach = function(t) {
      this.observersCallbacks.delete(t);
    }, t.prototype.notify = function(t, e) {
      this.observersCallbacks.forEach((function(n) {
        return n(t, e);
      }));
    }, t.prototype.getObserversCallbacks = function() {
      return this.observersCallbacks;
    }, t;
  }();
  e.default = i;
}, function(t, e, n) {
  'use strict';
  Object.defineProperty(e, '__esModule', { value: !0 }), n(5), n(19);
}, function(t, e, n) {
  'use strict';
  var i = this && this.__importDefault || function(t) {
    return t && t.__esModule ? t : { default: t };
  };
  Object.defineProperty(e, '__esModule', { value: !0 });
  var o, r = i(n(6)), s = i(n(14)), a = i(n(16)), u = i(n(17)), l = i(n(18)), h = function() {
    function t(t, e) {
      this.rootElement = t;
      try {
        this.model = new s.default(e);
      } catch (t) {
        e.step = l.default.step, e.maxValue = l.default.maxValue, e.minValue = l.default.minValue, this.model = new s.default(e);
      }
      this.model.attach(this.update.bind(this)), 'horizontal' === e.orientation || 'vertical' === e.orientation || (e.orientation = l.default.orientation);
      var n = { orientation: e.orientation, isRange: e.isRange, isTipsHidden: e.isTipsHidden };
      this.view = new r.default(t, n), this.view.attach(this.update.bind(this)), this.controller = new a.default(this.view, this.model);
    }

    return t.prototype.isRange = function() {
      return this.model.getRangeStatus();
    }, t.prototype.setRangeMode = function(t) {
      this.model.setRangeMode(t);
    }, t.prototype.getMinValue = function() {
      return this.model.getMinValue();
    }, t.prototype.setMinValue = function(t) {
      try {
        return this.model.setMinValue(t), !0;
      } catch (t) {
        return u.default.logWarning('Model', t.message), !1;
      }
    }, t.prototype.getMaxValue = function() {
      return this.model.getMaxValue();
    }, t.prototype.setMaxValue = function(t) {
      try {
        return this.model.setMaxValue(t), !0;
      } catch (t) {
        return u.default.logWarning('Model', t.message), !1;
      }
    }, t.prototype.getHighValue = function() {
      return this.model.getHighValue();
    }, t.prototype.setHighValue = function(t) {
      this.model.setHighValue(t);
    }, t.prototype.getLowValue = function() {
      return this.model.getLowValue();
    }, t.prototype.setLowValue = function(t) {
      this.model.setLowValue(t);
    }, t.prototype.getStep = function() {
      return this.model.getStep();
    }, t.prototype.setStep = function(t) {
      try {
        return this.model.setStep(t), !0;
      } catch (t) {
        return u.default.logWarning('Model', t.message), !1;
      }
    }, t.prototype.getOrientation = function() {
      return this.view.getOrientation();
    }, t.prototype.setOrientation = function(t) {
      this.view.setOrientation(t);
    }, t.prototype.hideTips = function() {
      this.view.hideTips();
    }, t.prototype.showTips = function() {
      this.view.showTips();
    }, t.prototype.getHideStatus = function() {
      return this.view.getHideStatus();
    }, t.prototype.update = function() {
      var t = new CustomEvent('slider-change', { bubbles: !0, cancelable: !0 });
      this.rootElement.dispatchEvent(t);
    }, t;
  }();
  (o = jQuery).fn.slider = function(t) {
    var e = o.extend(!0, {}, l.default, t);
    return this.each((function() {
      if (!o(this).data('slider')) {
        var t = new h(this, e);
        o(this).data('slider', t);
      }
    }));
  }, e.default = h;
}, function(t, e, n) {
  'use strict';
  var i, o = this && this.__extends || (i = function(t, e) {
    return (i = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, e) {
      t.__proto__ = e;
    } || function(t, e) {
      for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
    })(t, e);
  }, function(t, e) {
    function n() {
      this.constructor = t;
    }

    i(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n);
  }), r = this && this.__importDefault || function(t) {
    return t && t.__esModule ? t : { default: t };
  };
  Object.defineProperty(e, '__esModule', { value: !0 });
  var s = r(n(2)), a = r(n(0)), u = r(n(1)), l = r(n(7)), h = r(n(8)), c = r(n(9)), d = r(n(11)), f = r(n(12)),
    p = r(n(13)), v = function(t) {
      function e(e, n) {
        var i = t.call(this, e, a.default.viewWrapperClassName) || this;
        return i.setRunnerToCurrent = function(t) {
          i.runnersAndTips.forEach((function(e) {
            e.runner === t ? e.runner.setCurrentStatus(!0) : e.runner.setCurrentStatus(!1);
          }));
        }, i.handleRunnerDrag = function(t) {
          var e, n = t.detail.target;
          e = i.runnersAndTips.get(0).runner.getDOMNode() === n ? 0 : 1, i.setRunnerToCurrent(i.runnersAndTips.get(e).runner), i.notify('position-change-by-drag', {
            runnerIndex: e,
            position: t.detail.position,
          });
        }, i.handleSliderClick = function(t) {
          var e = 0, n = Number.MAX_VALUE;
          i.runnersAndTips.forEach((function(i, o) {
            var r = Math.abs(i.runner.getPosition() - t.detail.position);
            r < n && (e = o, n = r);
          })), i.setRunnerToCurrent(i.runnersAndTips.get(e).runner), i.notify('position-change-by-click', {
            position: t.detail.position,
            runnerIndex: e,
          });
        }, i.handleResize = function() {
          var t = i.computeDivisionsAmountBySize();
          i.notify('resize', { scaleDivisionsAmount: t });
        }, i.init(n), i;
      }

      return o(e, t), e.prototype.init = function(t) {
        var e = t.orientation, n = void 0 === e ? s.default.HORIZONTAL : e, i = t.isRange, o = void 0 !== i && i,
          r = t.isTipsHidden, u = void 0 === r || r;
        if (this.orientation = n, this.orientationBehavior = new p.default(n), this.DOMNode.classList.add(a.default.orientationClassNames.get(n)), this.strip = new l.default(this.DOMNode, this.orientationBehavior), this.isTipsHidden = u, o) {
          var c = new h.default(this.strip.getDOMNode(), this.orientationBehavior),
            v = new f.default(this.strip.getDOMNode(), u, this.orientationBehavior),
            g = new h.default(this.strip.getDOMNode(), this.orientationBehavior),
            m = new f.default(this.strip.getDOMNode(), u, this.orientationBehavior);
          this.runnersAndTips = new Map([[0, { runner: c, tip: v }], [1, { runner: g, tip: m }]]);
        } else {
          c = new h.default(this.strip.getDOMNode(), this.orientationBehavior), v = new f.default(this.strip.getDOMNode(), u, this.orientationBehavior);
          this.runnersAndTips = new Map([[0, { runner: c, tip: v }]]);
        }
        this.range = new d.default(this.strip.getDOMNode(), this.orientationBehavior), this.addHandlers();
      }, e.prototype.hideTips = function() {
        this.isTipsHidden = !0, this.runnersAndTips.forEach((function(t) {
          return t.tip.hide();
        }));
      }, e.prototype.showTips = function() {
        var t = this;
        if ((this.isTipsHidden = !1, this.runnersAndTips.forEach((function(e, n) {
          return t.showTip(n);
        })), 2 === this.runnersAndTips.size) && Math.abs(this.getRunnerPosition(0) - this.getRunnerPosition(1)) <= a.default.tipsJoinDistance) {
          this.hideTip(1);
          var e = this.getRunnerPosition(0) + (this.getRunnerPosition(1) - this.getRunnerPosition(0)) / 2;
          this.runnersAndTips.get(0).tip.setPosition(e);
        }
      }, e.prototype.getHideStatus = function() {
        return this.isTipsHidden;
      }, e.prototype.getOrientation = function() {
        return this.orientation;
      }, e.prototype.setOrientation = function(t) {
        var e = this;
        this.DOMNode.classList.remove(a.default.orientationClassNames.get(this.orientation)), this.DOMNode.classList.add(a.default.orientationClassNames.get(t)), this.orientationBehavior.setOrientation(t), this.orientation = t, this.runnersAndTips.forEach((function(t) {
          e.orientationBehavior.resetStyles(t.tip.getDOMNode()), e.orientationBehavior.resetStyles(t.runner.getDOMNode());
        })), this.orientationBehavior.resetStyles(this.range.getDOMNode()), void 0 !== this.scale && this.scale.reCreateScale(), this.notify('orientation-change', {});
      }, e.prototype.computeDivisionsAmountBySize = function() {
        var t;
        t = this.orientation === s.default.HORIZONTAL ? this.getDOMNode().clientWidth : this.getDOMNode().clientHeight;
        var e = 2 * Math.ceil(t / 300);
        return e > 2 ? e : 3;
      }, e.prototype.updateView = function(t, e, n, i) {
        i ? this.updateViewForInterval(t, e, n) : this.updateViewForSingleRunner(t, e, n);
      }, e.prototype.hideTip = function(t) {
        this.runnersAndTips.get(t).tip.hide();
      }, e.prototype.showTip = function(t) {
        this.isTipsHidden = !1;
        var e = this.runnersAndTips.get(t).tip;
        e.show(), e.setPosition(this.getRunnerPosition(t));
      }, e.prototype.setRange = function(t, e) {
        this.range.setLowEdge(t), this.range.setHighEdge(e);
      }, e.prototype.changeModeToRange = function(t, e) {
        if (2 !== this.runnersAndTips.size) {
          var n = new h.default(this.strip.getDOMNode(), this.orientationBehavior);
          n.setPosition(t);
          var i = new f.default(this.strip.getDOMNode(), this.isTipsHidden, this.orientationBehavior);
          i.setInnerText(e.toString()), i.setPosition(t), this.runnersAndTips.set(1, {
            runner: n,
            tip: i,
          }), this.setRange(this.runnersAndTips.get(0).runner.getPosition(), this.runnersAndTips.get(1).runner.getPosition());
        }
      }, e.prototype.changeModeToSingle = function() {
        if (1 !== this.runnersAndTips.size) {
          var t = this.runnersAndTips.get(1).runner, e = this.runnersAndTips.get(1).tip;
          this.runnersAndTips.delete(1), t.destroy(), e.destroy(), this.setRange(0, this.runnersAndTips.get(0).runner.getPosition());
        }
      }, e.prototype.setScale = function(t) {
        void 0 === this.scale ? this.scale = new c.default(this.getDOMNode(), t, this.orientationBehavior) : this.scale.setScale(t);
      }, e.prototype.getRunnersAmount = function() {
        return this.runnersAndTips.size;
      }, e.prototype.setRunnerPosition = function(t, e) {
        this.runnersAndTips.get(t).runner.setPosition(e);
      }, e.prototype.getRunnerPosition = function(t) {
        return this.runnersAndTips.get(t).runner.getPosition();
      }, e.prototype.setTipPosition = function(t, e) {
        this.runnersAndTips.get(t).tip.setPosition(e);
      }, e.prototype.setTipText = function(t, e) {
        this.runnersAndTips.get(t).tip.setInnerText(e);
      }, e.prototype.addHandlers = function() {
        this.DOMNode.addEventListener('slider-drag', this.handleRunnerDrag), this.DOMNode.addEventListener('slider-click', this.handleSliderClick), window.addEventListener('resize', this.handleResize);
      }, e.prototype.updateViewForInterval = function(t, e, n) {
        1 === this.getRunnersAmount() && this.changeModeToRange(t[1], e[1]), this.setScale(n), this.setRunnerPosition(0, t[0]), this.setRunnerPosition(1, t[1]), this.updateAllTipsPositionAndText(t, e), this.setRange(t[0], t[1]);
      }, e.prototype.updateAllTipsPositionAndText = function(t, e) {
        Math.abs(t[0] - t[1]) <= a.default.tipsJoinDistance ? this.joinTips(e, t) : (this.getHideStatus() || this.showTips(), this.setTipText(0, e[0].toString()), this.setTipPosition(0, t[0]), this.setTipText(1, e[1].toString()), this.setTipPosition(1, t[1]));
      }, e.prototype.updateViewForSingleRunner = function(t, e, n) {
        2 === this.getRunnersAmount() && this.changeModeToSingle(), this.setScale(n), this.setRunnerPosition(0, t[0]), this.setTipText(0, e[0].toString()), this.setTipPosition(0, t[0]), this.setRange(0, t[0]);
      }, e.prototype.joinTips = function(t, e) {
        this.hideTip(1);
        var n = t[0] + '&nbsp;&mdash;&nbsp;' + t[1];
        this.setTipText(0, n);
        var i = e[0] + (e[1] - e[0]) / 2;
        this.setTipPosition(0, i);
      }, e;
    }(u.default);
  e.default = v;
}, function(t, e, n) {
  'use strict';
  var i, o = this && this.__extends || (i = function(t, e) {
    return (i = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, e) {
      t.__proto__ = e;
    } || function(t, e) {
      for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
    })(t, e);
  }, function(t, e) {
    function n() {
      this.constructor = t;
    }

    i(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n);
  }), r = this && this.__importDefault || function(t) {
    return t && t.__esModule ? t : { default: t };
  };
  Object.defineProperty(e, '__esModule', { value: !0 });
  var s = r(n(0)), a = function(t) {
    function e(e, n) {
      var i = t.call(this, e, s.default.stripClassName) || this;
      return i.handleMouseDown = function(t) {
        var e = i.getDOMNode().getElementsByClassName(s.default.runnerClassName), n = !1;
        if (Object.entries(e).forEach((function(i, o) {
          t.target === e[o] && (n = !0);
        })), !n) {
          var o = i.orientationBehavior.getPositionFromCoordinates(t.clientX, t.clientY, i.getDOMNode()),
            r = new CustomEvent('slider-click', { bubbles: !0, cancelable: !0, detail: { position: o } });
          i.getDOMNode().dispatchEvent(r);
        }
      }, i.orientationBehavior = n, i.addHandlers(), i;
    }

    return o(e, t), e.prototype.addHandlers = function() {
      this.DOMNode.addEventListener('mousedown', this.handleMouseDown);
    }, e;
  }(r(n(1)).default);
  e.default = a;
}, function(t, e, n) {
  'use strict';
  var i, o = this && this.__extends || (i = function(t, e) {
    return (i = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, e) {
      t.__proto__ = e;
    } || function(t, e) {
      for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
    })(t, e);
  }, function(t, e) {
    function n() {
      this.constructor = t;
    }

    i(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n);
  }), r = this && this.__importDefault || function(t) {
    return t && t.__esModule ? t : { default: t };
  };
  Object.defineProperty(e, '__esModule', { value: !0 });
  var s = r(n(0)), a = function(t) {
    function e(e, n) {
      var i = t.call(this, e, s.default.runnerClassName) || this;
      return i.handleDragStart = function() {
        return !1;
      }, i.handleMouseMove = function(t) {
        try {
          var e = i.orientationBehavior.getPositionFromCoordinates(t.clientX, t.clientY, i.DOMNode),
            n = new CustomEvent('slider-drag', {
              bubbles: !0,
              cancelable: !0,
              detail: { position: e, target: i.getDOMNode() },
            });
          i.DOMNode.dispatchEvent(n);
        } catch (t) {
          i.handleMouseUp();
        }
      }, i.handleMouseUp = function() {
        document.removeEventListener('mousemove', i.handleMouseMove), document.removeEventListener('mouseup', i.handleMouseUp);
      }, i.handleMouseDown = function(t) {
        t.preventDefault(), document.addEventListener('mousemove', i.handleMouseMove), document.addEventListener('mouseup', i.handleMouseUp);
      }, i.handleTouchMove = function(t) {
        try {
          var e = t.targetTouches[0],
            n = i.orientationBehavior.getPositionFromCoordinates(e.clientX, e.clientY, i.getDOMNode()),
            o = new CustomEvent('slider-drag', {
              bubbles: !0,
              cancelable: !0,
              detail: { position: n, target: i.getDOMNode() },
            });
          i.getDOMNode().dispatchEvent(o);
        } catch (e) {
          i.handleTouchEnd(t);
        }
      }, i.handleTouchEnd = function(t) {
        document.removeEventListener('touchmove', i.handleTouchMove), document.removeEventListener('touchend', i.handleTouchEnd), document.removeEventListener('touchcancel', i.handleTouchEnd);
      }, i.handleTouchStart = function(t) {
        t.preventDefault(), document.addEventListener('touchmove', i.handleTouchMove), document.addEventListener('touchend', i.handleTouchEnd), document.addEventListener('touchcancel', i.handleTouchEnd);
      }, i.orientationBehavior = n, i.setPosition(0), i.addMouseEventsHandlers(), i.addTouchEventsHandler(), i;
    }

    return o(e, t), e.prototype.getPosition = function() {
      return this.position;
    }, e.prototype.setPosition = function(t) {
      this.position = t, this.orientationBehavior.setPosition(t, this.DOMNode);
    }, e.prototype.setCurrentStatus = function(t) {
      t ? this.getDOMNode().classList.add(s.default.runnerCurrentModifier) : this.getDOMNode().classList.remove(s.default.runnerCurrentModifier);
    }, e.prototype.addMouseEventsHandlers = function() {
      this.DOMNode.addEventListener('mousedown', this.handleMouseDown), this.DOMNode.addEventListener('dragstart', this.handleDragStart);
    }, e.prototype.addTouchEventsHandler = function() {
      this.DOMNode.addEventListener('touchstart', this.handleTouchStart), this.DOMNode.addEventListener('dragstart', this.handleDragStart);
    }, e;
  }(r(n(1)).default);
  e.default = a;
}, function(t, e, n) {
  'use strict';
  var i, o = this && this.__extends || (i = function(t, e) {
    return (i = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, e) {
      t.__proto__ = e;
    } || function(t, e) {
      for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
    })(t, e);
  }, function(t, e) {
    function n() {
      this.constructor = t;
    }

    i(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n);
  }), r = this && this.__importDefault || function(t) {
    return t && t.__esModule ? t : { default: t };
  };
  Object.defineProperty(e, '__esModule', { value: !0 });
  var s = r(n(0)), a = r(n(1)), u = r(n(10)), l = function(t) {
    function e(e, n, i) {
      var o = t.call(this, e, s.default.scaleClassName) || this;
      return o.subElements = [], o.handleRangeCLick = function(t) {
        if (t.target !== t.currentTarget) {
          var e = t.target, n = new CustomEvent('slider-click', {
            bubbles: !0,
            cancelable: !0,
            detail: { position: e.getAttribute('data-scale-position') },
          });
          o.getDOMNode().dispatchEvent(n);
        }
      }, o.orientationBehavior = i, o.setScale(n), o.addHandler(), o;
    }

    return o(e, t), e.prototype.setScale = function(t) {
      var e = this;
      this.getDOMNode().innerHTML = '', this.subElements = [], t.forEach((function(t, n) {
        if (!!(100 - t > 5 || 100 === t)) {
          var i = new u.default(e.getDOMNode(), t);
          i.getDOMNode().innerText = n.toString(), e.subElements.push(i), e.orientationBehavior.setPosition(t, i.getDOMNode());
        }
      }));
    }, e.prototype.reCreateScale = function() {
      var t = this;
      this.subElements.forEach((function(e, n) {
        var i = e.getPosition(), o = e.getDOMNode().innerText, r = new u.default(t.getDOMNode(), i);
        r.getDOMNode().innerText = o, t.orientationBehavior.setPosition(i, r.getDOMNode()), t.subElements[n].destroy(), t.subElements[n] = r;
      }));
    }, e.prototype.addHandler = function() {
      this.DOMNode.addEventListener('click', this.handleRangeCLick);
    }, e;
  }(a.default);
  e.default = l;
}, function(t, e, n) {
  'use strict';
  var i, o = this && this.__extends || (i = function(t, e) {
    return (i = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, e) {
      t.__proto__ = e;
    } || function(t, e) {
      for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
    })(t, e);
  }, function(t, e) {
    function n() {
      this.constructor = t;
    }

    i(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n);
  }), r = this && this.__importDefault || function(t) {
    return t && t.__esModule ? t : { default: t };
  };
  Object.defineProperty(e, '__esModule', { value: !0 });
  var s = r(n(0)), a = function(t) {
    function e(e, n) {
      var i = t.call(this, e, s.default.scaleSubElementClassName) || this;
      return i.position = n, i.DOMNode.setAttribute('data-scale-position', i.position.toString()), i;
    }

    return o(e, t), e.prototype.getPosition = function() {
      return this.position;
    }, e.prototype.setPosition = function(t) {
      this.position = t, this.DOMNode.setAttribute('data-scale-position', this.position.toString());
    }, e;
  }(r(n(1)).default);
  e.default = a;
}, function(t, e, n) {
  'use strict';
  var i, o = this && this.__extends || (i = function(t, e) {
    return (i = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, e) {
      t.__proto__ = e;
    } || function(t, e) {
      for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
    })(t, e);
  }, function(t, e) {
    function n() {
      this.constructor = t;
    }

    i(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n);
  }), r = this && this.__importDefault || function(t) {
    return t && t.__esModule ? t : { default: t };
  };
  Object.defineProperty(e, '__esModule', { value: !0 });
  var s = r(n(0)), a = function(t) {
    function e(e, n) {
      var i = t.call(this, e, s.default.rangeClassName) || this;
      return i.orientationBehavior = n, i.lowEdge = 0, i.highEdge = 100, i;
    }

    return o(e, t), e.prototype.getLowEdge = function() {
      return this.lowEdge;
    }, e.prototype.setLowEdge = function(t) {
      this.lowEdge = t, this.orientationBehavior.setRangePositions(this.lowEdge, this.highEdge, this.DOMNode);
    }, e.prototype.getHighEdge = function() {
      return this.highEdge;
    }, e.prototype.setHighEdge = function(t) {
      this.highEdge = t, this.orientationBehavior.setRangePositions(this.lowEdge, this.highEdge, this.DOMNode);
    }, e;
  }(r(n(1)).default);
  e.default = a;
}, function(t, e, n) {
  'use strict';
  var i, o = this && this.__extends || (i = function(t, e) {
    return (i = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, e) {
      t.__proto__ = e;
    } || function(t, e) {
      for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
    })(t, e);
  }, function(t, e) {
    function n() {
      this.constructor = t;
    }

    i(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n);
  }), r = this && this.__importDefault || function(t) {
    return t && t.__esModule ? t : { default: t };
  };
  Object.defineProperty(e, '__esModule', { value: !0 });
  var s = r(n(0)), a = function(t) {
    function e(e, n, i) {
      void 0 === n && (n = !0);
      var o = t.call(this, e, s.default.tipClassName) || this;
      return o.orientationBehavior = i, n && o.DOMNode.classList.add(s.default.tipHiddenClassName), o.isHidden = n, o;
    }

    return o(e, t), e.prototype.setPosition = function(t) {
      this.orientationBehavior.setPosition(t, this.DOMNode);
    }, e.prototype.setInnerText = function(t) {
      this.DOMNode.innerHTML = t;
    }, e.prototype.getHideStatus = function() {
      return this.isHidden;
    }, e.prototype.hide = function() {
      this.isHidden || this.DOMNode.classList.add(s.default.tipHiddenClassName), this.isHidden = !0;
    }, e.prototype.show = function() {
      this.isHidden && this.DOMNode.classList.remove(s.default.tipHiddenClassName), this.isHidden = !1;
    }, e;
  }(r(n(1)).default);
  e.default = a;
}, function(t, e, n) {
  'use strict';
  var i = this && this.__importDefault || function(t) {
    return t && t.__esModule ? t : { default: t };
  };
  Object.defineProperty(e, '__esModule', { value: !0 });
  var o = i(n(2)), r = function() {
    function t(t) {
      this.orientation = t;
    }

    return t.prototype.getOrientation = function() {
      return this.orientation;
    }, t.prototype.setOrientation = function(t) {
      this.orientation = t;
    }, t.prototype.setPosition = function(t, e) {
      if (this.orientation === o.default.HORIZONTAL) {
        var n = e.parentElement.offsetWidth, i = e.offsetWidth / n * 100;
        e.style.left = t - i / 2 + '%';
      } else {
        var r = e.parentElement.offsetHeight, s = e.offsetHeight / r * 100;
        e.style.bottom = t - s / 2 + '%';
      }
    }, t.prototype.getPositionFromCoordinates = function(t, e, n) {
      if (t > window.innerWidth || e > window.innerHeight) throw new Error('clientX or clientY is too big');
      return this.orientation === o.default.HORIZONTAL ? (t - n.parentElement.getBoundingClientRect().left) / n.parentElement.offsetWidth * 100 : 100 - (e - n.parentElement.getBoundingClientRect().top) / n.parentElement.offsetHeight * 100;
    }, t.prototype.resetStyles = function(t) {
      t.setAttribute('style', '');
    }, t.prototype.setRangePositions = function(t, e, n) {
      this.orientation === o.default.HORIZONTAL ? (n.style.left = t + '%', n.style.right = 100 - e + '%') : (n.style.bottom = t + '%', n.style.top = 100 - e + '%');
    }, t;
  }();
  e.default = r;
}, function(t, e, n) {
  'use strict';
  var i, o = this && this.__extends || (i = function(t, e) {
    return (i = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, e) {
      t.__proto__ = e;
    } || function(t, e) {
      for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
    })(t, e);
  }, function(t, e) {
    function n() {
      this.constructor = t;
    }

    i(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n);
  }), r = this && this.__importDefault || function(t) {
    return t && t.__esModule ? t : { default: t };
  };
  Object.defineProperty(e, '__esModule', { value: !0 });
  var s = r(n(15)), a = function(t) {
    function e(e) {
      var n = t.call(this) || this;
      return n.init(e), n;
    }

    return o(e, t), e.prototype.init = function(t) {
      var e = t.isRange, n = void 0 !== e && e, i = t.minValue, o = void 0 === i ? 0 : i, r = t.maxValue,
        s = void 0 === r ? 100 : r, a = t.startValueLow, u = void 0 === a ? 0 : a, l = t.startValueHigh,
        h = void 0 === l ? 100 : l, c = t.step, d = void 0 === c ? 1 : c;
      if (s <= o || d <= 0) throw new Error('options is not valid');
      this.isRange = n, this.maxValue = s, this.minValue = o, this.step = d, this.lowValue = this.minValue, this.highValue = this.maxValue, this.setLowValue(u), this.setHighValue(h);
    }, e.prototype.getRangeStatus = function() {
      return this.isRange;
    }, e.prototype.setRangeMode = function(t) {
      this.isRange = t, this.notify('range-mode-change', { isRange: t }), t && this.setLowValue(this.lowValue);
    }, e.prototype.getMaxValue = function() {
      return this.maxValue;
    }, e.prototype.setMaxValue = function(t) {
      if (!!(t <= this.minValue || t - this.minValue < this.step)) throw new Error('value is not valid');
      this.maxValue = t, this.highValue > t ? this.highValue = t : this.setHighValue(this.highValue), this.setLowValue(this.lowValue), this.notify('edge-value-change', {});
    }, e.prototype.getMinValue = function() {
      return this.minValue;
    }, e.prototype.setMinValue = function(t) {
      if (!!(t >= this.maxValue || this.maxValue - t < this.step)) throw new Error('value is not valid');
      this.minValue = t, this.lowValue < t ? this.lowValue = t : this.setLowValue(this.lowValue), this.setHighValue(this.highValue), this.notify('edge-value-change', {});
    }, e.prototype.getLowValue = function() {
      return this.lowValue;
    }, e.prototype.getLowValueInPercent = function() {
      return this.convertValueToPercent(this.lowValue);
    }, e.prototype.setLowValue = function(t) {
      var e = this.validateValue(t);
      e >= this.highValue - this.step && this.isRange && (e = Number(s.default(this.highValue).minus(this.step)), e = this.validateValue(e)), this.lowValue = e, this.notify('value-change', {});
    }, e.prototype.setLowValueByPercent = function(t) {
      var e = this.validateValueInPercent(t), n = this.convertPercentToValue(e);
      this.setLowValue(n);
    }, e.prototype.getHighValue = function() {
      return this.highValue;
    }, e.prototype.getHighValueInPercent = function() {
      return this.convertValueToPercent(this.highValue);
    }, e.prototype.setHighValueByPercent = function(t) {
      var e = this.validateValueInPercent(t), n = this.convertPercentToValue(e);
      this.setHighValue(n);
    }, e.prototype.setHighValue = function(t) {
      var e = this.validateValue(t);
      e <= this.lowValue + this.step && (e = Number(s.default(this.lowValue).plus(this.step))), this.highValue = e, this.notify('value-change', {});
    }, e.prototype.getStep = function() {
      return this.step;
    }, e.prototype.setStep = function(t) {
      if (!!(t > this.maxValue - this.minValue || t <= 0)) throw new Error('Step value is not valid');
      this.step = t, this.setLowValue(this.lowValue), this.setHighValue(this.highValue), this.notify('step-change', {});
    }, e.prototype.splitIntervalByStep = function(t) {
      var e = t - 1;
      if (e <= 1) throw new Error('divisionsAmount must be greater or equal than 2');
      for (var n = this.getMaxValue() - this.getMinValue(), i = new Map, o = this.getMinValue(), r = 0, s = 0; s < n / e;) s += this.getStep();
      do {
        o = this.validateValue(o), r = this.convertValueToPercent(o), i.set(o, r), o += s;
      } while (r < 100);
      return i;
    }, e.prototype.validateValue = function(t) {
      var e;
      if (t <= this.minValue) e = this.minValue; else if (t >= this.maxValue) e = this.maxValue; else {
        var n = Math.round(Number(s.default(t).minus(this.getMinValue()).div(this.step))),
          i = s.default(n).times(this.step);
        e = Number(s.default(this.minValue).plus(i));
      }
      return e;
    }, e.prototype.validateValueInPercent = function(t) {
      var e;
      if (t >= 100) e = 100; else if (t <= 0) e = 0; else {
        var n = Number(s.default(this.maxValue).minus(this.minValue)), i = s.default(100 / n).times(this.step),
          o = Math.ceil(n / this.step), r = s.default(t).div(i), a = i.times(o - 1), u = s.default(100).minus(a);
        if (a.plus(u.div(2)).lt(t)) e = 100; else {
          var l = Math.round(Number(r));
          e = Number(s.default(l).times(i));
        }
      }
      return e;
    }, e.prototype.convertPercentToValue = function(t) {
      var e = s.default(this.maxValue).minus(this.minValue), n = s.default(t).div(100),
        i = s.default(this.minValue).plus(n.times(e));
      return Number(i);
    }, e.prototype.convertValueToPercent = function(t) {
      var e = s.default(this.maxValue).minus(this.minValue), n = s.default(t).minus(this.minValue).div(e).times(100);
      return Number(n);
    }, e;
  }(r(n(3)).default);
  e.default = a;
}, function(t, e, n) {
  var i;
  !function(o) {
    'use strict';
    var r, s = '[big.js] ', a = s + 'Invalid ', u = a + 'decimal places', l = {},
      h = /^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;

    function c(t, e, n, i) {
      var o = t.c, r = t.e + e + 1;
      if (r < o.length) {
        if (1 === n) i = o[r] >= 5; else if (2 === n) i = o[r] > 5 || 5 == o[r] && (i || r < 0 || void 0 !== o[r + 1] || 1 & o[r - 1]); else if (3 === n) i = i || !!o[0]; else if (i = !1, 0 !== n) throw Error('[big.js] Invalid rounding mode');
        if (r < 1) o.length = 1, i ? (t.e = -e, o[0] = 1) : o[0] = t.e = 0; else {
          if (o.length = r--, i) for (; ++o[r] > 9;) o[r] = 0, r-- || (++t.e, o.unshift(1));
          for (r = o.length; !o[--r];) o.pop();
        }
      } else if (n < 0 || n > 3 || n !== ~~n) throw Error('[big.js] Invalid rounding mode');
      return t;
    }

    function d(t, e, n, i) {
      var o, r, s = t.constructor, l = !t.c[0];
      if (void 0 !== n) {
        if (n !== ~~n || n < (3 == e) || n > 1e6) throw Error(3 == e ? a + 'precision' : u);
        for (n = i - (t = new s(t)).e, t.c.length > ++i && c(t, n, s.RM), 2 == e && (i = t.e + n + 1); t.c.length < i;) t.c.push(0);
      }
      if (o = t.e, n = (r = t.c.join('')).length, 2 != e && (1 == e || 3 == e && i <= o || o <= s.NE || o >= s.PE)) r = r.charAt(0) + (n > 1 ? '.' + r.slice(1) : '') + (o < 0 ? 'e' : 'e+') + o; else if (o < 0) {
        for (; ++o;) r = '0' + r;
        r = '0.' + r;
      } else if (o > 0) if (++o > n) for (o -= n; o--;) r += '0'; else o < n && (r = r.slice(0, o) + '.' + r.slice(o)); else n > 1 && (r = r.charAt(0) + '.' + r.slice(1));
      return t.s < 0 && (!l || 4 == e) ? '-' + r : r;
    }

    l.abs = function() {
      var t = new this.constructor(this);
      return t.s = 1, t;
    }, l.cmp = function(t) {
      var e, n = this, i = n.c, o = (t = new n.constructor(t)).c, r = n.s, s = t.s, a = n.e, u = t.e;
      if (!i[0] || !o[0]) return i[0] ? r : o[0] ? -s : 0;
      if (r != s) return r;
      if (e = r < 0, a != u) return a > u ^ e ? 1 : -1;
      for (s = (a = i.length) < (u = o.length) ? a : u, r = -1; ++r < s;) if (i[r] != o[r]) return i[r] > o[r] ^ e ? 1 : -1;
      return a == u ? 0 : a > u ^ e ? 1 : -1;
    }, l.div = function(t) {
      var e = this, n = e.constructor, i = e.c, o = (t = new n(t)).c, r = e.s == t.s ? 1 : -1, s = n.DP;
      if (s !== ~~s || s < 0 || s > 1e6) throw Error(u);
      if (!o[0]) throw Error('[big.js] Division by zero');
      if (!i[0]) return new n(0 * r);
      var a, l, h, d, f, p = o.slice(), v = a = o.length, g = i.length, m = i.slice(0, a), y = m.length, _ = t,
        w = _.c = [], M = 0, b = s + (_.e = e.e - t.e) + 1;
      for (_.s = r, r = b < 0 ? 0 : b, p.unshift(0); y++ < a;) m.push(0);
      do {
        for (h = 0; h < 10; h++) {
          if (a != (y = m.length)) d = a > y ? 1 : -1; else for (f = -1, d = 0; ++f < a;) if (o[f] != m[f]) {
            d = o[f] > m[f] ? 1 : -1;
            break;
          }
          if (!(d < 0)) break;
          for (l = y == a ? o : p; y;) {
            if (m[--y] < l[y]) {
              for (f = y; f && !m[--f];) m[f] = 9;
              --m[f], m[y] += 10;
            }
            m[y] -= l[y];
          }
          for (; !m[0];) m.shift();
        }
        w[M++] = d ? h : ++h, m[0] && d ? m[y] = i[v] || 0 : m = [i[v]];
      } while ((v++ < g || void 0 !== m[0]) && r--);
      return w[0] || 1 == M || (w.shift(), _.e--), M > b && c(_, s, n.RM, void 0 !== m[0]), _;
    }, l.eq = function(t) {
      return !this.cmp(t);
    }, l.gt = function(t) {
      return this.cmp(t) > 0;
    }, l.gte = function(t) {
      return this.cmp(t) > -1;
    }, l.lt = function(t) {
      return this.cmp(t) < 0;
    }, l.lte = function(t) {
      return this.cmp(t) < 1;
    }, l.minus = l.sub = function(t) {
      var e, n, i, o, r = this, s = r.constructor, a = r.s, u = (t = new s(t)).s;
      if (a != u) return t.s = -u, r.plus(t);
      var l = r.c.slice(), h = r.e, c = t.c, d = t.e;
      if (!l[0] || !c[0]) return c[0] ? (t.s = -u, t) : new s(l[0] ? r : 0);
      if (a = h - d) {
        for ((o = a < 0) ? (a = -a, i = l) : (d = h, i = c), i.reverse(), u = a; u--;) i.push(0);
        i.reverse();
      } else for (n = ((o = l.length < c.length) ? l : c).length, a = u = 0; u < n; u++) if (l[u] != c[u]) {
        o = l[u] < c[u];
        break;
      }
      if (o && (i = l, l = c, c = i, t.s = -t.s), (u = (n = c.length) - (e = l.length)) > 0) for (; u--;) l[e++] = 0;
      for (u = e; n > a;) {
        if (l[--n] < c[n]) {
          for (e = n; e && !l[--e];) l[e] = 9;
          --l[e], l[n] += 10;
        }
        l[n] -= c[n];
      }
      for (; 0 === l[--u];) l.pop();
      for (; 0 === l[0];) l.shift(), --d;
      return l[0] || (t.s = 1, l = [d = 0]), t.c = l, t.e = d, t;
    }, l.mod = function(t) {
      var e, n = this, i = n.constructor, o = n.s, r = (t = new i(t)).s;
      if (!t.c[0]) throw Error('[big.js] Division by zero');
      return n.s = t.s = 1, e = 1 == t.cmp(n), n.s = o, t.s = r, e ? new i(n) : (o = i.DP, r = i.RM, i.DP = i.RM = 0, n = n.div(t), i.DP = o, i.RM = r, this.minus(n.times(t)));
    }, l.plus = l.add = function(t) {
      var e, n = this, i = n.constructor, o = n.s, r = (t = new i(t)).s;
      if (o != r) return t.s = -r, n.minus(t);
      var s = n.e, a = n.c, u = t.e, l = t.c;
      if (!a[0] || !l[0]) return l[0] ? t : new i(a[0] ? n : 0 * o);
      if (a = a.slice(), o = s - u) {
        for (o > 0 ? (u = s, e = l) : (o = -o, e = a), e.reverse(); o--;) e.push(0);
        e.reverse();
      }
      for (a.length - l.length < 0 && (e = l, l = a, a = e), o = l.length, r = 0; o; a[o] %= 10) r = (a[--o] = a[o] + l[o] + r) / 10 | 0;
      for (r && (a.unshift(r), ++u), o = a.length; 0 === a[--o];) a.pop();
      return t.c = a, t.e = u, t;
    }, l.pow = function(t) {
      var e = this, n = new e.constructor(1), i = n, o = t < 0;
      if (t !== ~~t || t < -1e6 || t > 1e6) throw Error(a + 'exponent');
      for (o && (t = -t); 1 & t && (i = i.times(e)), t >>= 1;) e = e.times(e);
      return o ? n.div(i) : i;
    }, l.round = function(t, e) {
      var n = this.constructor;
      if (void 0 === t) t = 0; else if (t !== ~~t || t < -1e6 || t > 1e6) throw Error(u);
      return c(new n(this), t, void 0 === e ? n.RM : e);
    }, l.sqrt = function() {
      var t, e, n, i = this, o = i.constructor, r = i.s, a = i.e, u = new o(.5);
      if (!i.c[0]) return new o(i);
      if (r < 0) throw Error(s + 'No square root');
      0 === (r = Math.sqrt(i + '')) || r === 1 / 0 ? ((e = i.c.join('')).length + a & 1 || (e += '0'), a = ((a + 1) / 2 | 0) - (a < 0 || 1 & a), t = new o(((r = Math.sqrt(e)) == 1 / 0 ? '1e' : (r = r.toExponential()).slice(0, r.indexOf('e') + 1)) + a)) : t = new o(r), a = t.e + (o.DP += 4);
      do {
        n = t, t = u.times(n.plus(i.div(n)));
      } while (n.c.slice(0, a).join('') !== t.c.slice(0, a).join(''));
      return c(t, o.DP -= 4, o.RM);
    }, l.times = l.mul = function(t) {
      var e, n = this, i = n.constructor, o = n.c, r = (t = new i(t)).c, s = o.length, a = r.length, u = n.e, l = t.e;
      if (t.s = n.s == t.s ? 1 : -1, !o[0] || !r[0]) return new i(0 * t.s);
      for (t.e = u + l, s < a && (e = o, o = r, r = e, l = s, s = a, a = l), e = new Array(l = s + a); l--;) e[l] = 0;
      for (u = a; u--;) {
        for (a = 0, l = s + u; l > u;) a = e[l] + r[u] * o[l - u - 1] + a, e[l--] = a % 10, a = a / 10 | 0;
        e[l] = (e[l] + a) % 10;
      }
      for (a ? ++t.e : e.shift(), u = e.length; !e[--u];) e.pop();
      return t.c = e, t;
    }, l.toExponential = function(t) {
      return d(this, 1, t, t);
    }, l.toFixed = function(t) {
      return d(this, 2, t, this.e + t);
    }, l.toPrecision = function(t) {
      return d(this, 3, t, t - 1);
    }, l.toString = function() {
      return d(this);
    }, l.valueOf = l.toJSON = function() {
      return d(this, 4);
    }, (r = function t() {
      function e(n) {
        var i = this;
        if (!(i instanceof e)) return void 0 === n ? t() : new e(n);
        n instanceof e ? (i.s = n.s, i.e = n.e, i.c = n.c.slice()) : function(t, e) {
          var n, i, o;
          if (0 === e && 1 / e < 0) e = '-0'; else if (!h.test(e += '')) throw Error(a + 'number');
          t.s = '-' == e.charAt(0) ? (e = e.slice(1), -1) : 1, (n = e.indexOf('.')) > -1 && (e = e.replace('.', ''));
          (i = e.search(/e/i)) > 0 ? (n < 0 && (n = i), n += +e.slice(i + 1), e = e.substring(0, i)) : n < 0 && (n = e.length);
          for (o = e.length, i = 0; i < o && "0" == e.charAt(i);) ++i;
          if (i == o) t.c = [t.e = 0]; else {
            for (; o > 0 && "0" == e.charAt(--o);) ;
            for (t.e = n - i - 1, t.c = [], n = 0; i <= o;) t.c[n++] = +e.charAt(i++);
          }
        }(i, n), i.constructor = e;
      }

      return e.prototype = l, e.DP = 20, e.RM = 1, e.NE = -7, e.PE = 21, e.version = '5.2.2', e;
    }()).default = r.Big = r, void 0 === (i = function() {
      return r;
    }.call(e, n, e, t)) || (t.exports = i);
  }();
}, function(t, e, n) {
  'use strict';
  Object.defineProperty(e, '__esModule', { value: !0 });
  var i = function() {
    function t(t, e) {
      this.init(t, e);
    }

    return t.prototype.init = function(t, e) {
      this.view = t, this.model = e, this.view.attach(this.handleViewEvents.bind(this)), this.model.attach(this.handleModelEvents.bind(this)), this.updateView();
    }, t.prototype.handleViewEvents = function(t, e) {
      'position-change-by-drag' === t || 'position-change-by-click' === t ? this.setValues(e.runnerIndex, e.position) : this.updateView();
    }, t.prototype.handleModelEvents = function() {
      this.updateView();
    }, t.prototype.setValues = function(t, e) {
      0 === t ? this.model.setLowValueByPercent(e) : 1 === t && this.model.setHighValueByPercent(e);
    }, t.prototype.updateView = function() {
      var t = [this.model.getLowValueInPercent(), this.model.getHighValueInPercent()],
        e = [this.model.getLowValue(), this.model.getHighValue()],
        n = this.model.splitIntervalByStep(this.view.computeDivisionsAmountBySize()), i = this.model.getRangeStatus();
      this.view.updateView(t, e, n, i);
    }, t;
  }();
  e.default = i;
}, function(t, e, n) {
  'use strict';
  Object.defineProperty(e, '__esModule', { value: !0 });
  var i = {
    logWarning: function(t, e) {
      console.warn('[WARNING] ' + new Date + ' in ' + t + '\n' + e);
    }, logInfo: function(t, e) {
      console.info('[INFO] ' + new Date + ' in ' + t + '\n' + e);
    }, logError: function(t, e) {
      console.error('[Error] ' + new Date + ' in ' + t + '\n' + e);
    },
  };
  e.default = i;
}, function(t, e, n) {
  'use strict';
  Object.defineProperty(e, '__esModule', { value: !0 });
  e.default = {
    isRange: !1,
    isTipsHidden: !1,
    maxValue: 100,
    minValue: 0,
    orientation: 'horizontal',
    startValueHigh: 100,
    startValueLow: 0,
    step: 1,
  };
}, function(t, e, n) {
  var i = n(20), o = n(21);
  'string' == typeof (o = o.__esModule ? o.default : o) && (o = [[t.i, o, '']]);
  var r = { insert: 'head', singleton: !1 };
  i(o, r);
  t.exports = o.locals || {};
}, function(t, e, n) {
  'use strict';
  var i, o = function() {
    return void 0 === i && (i = Boolean(window && document && document.all && !window.atob)), i;
  }, r = function() {
    var t = {};
    return function(e) {
      if (void 0 === t[e]) {
        var n = document.querySelector(e);
        if (window.HTMLIFrameElement && n instanceof window.HTMLIFrameElement) try {
          n = n.contentDocument.head;
        } catch (t) {
          n = null;
        }
        t[e] = n;
      }
      return t[e];
    };
  }(), s = [];

  function a(t) {
    for (var e = -1, n = 0; n < s.length; n++) if (s[n].identifier === t) {
      e = n;
      break;
    }
    return e;
  }

  function u(t, e) {
    for (var n = {}, i = [], o = 0; o < t.length; o++) {
      var r = t[o], u = e.base ? r[0] + e.base : r[0], l = n[u] || 0, h = ''.concat(u, ' ').concat(l);
      n[u] = l + 1;
      var c = a(h), d = { css: r[1], media: r[2], sourceMap: r[3] };
      -1 !== c ? (s[c].references++, s[c].updater(d)) : s.push({
        identifier: h,
        updater: g(d, e),
        references: 1,
      }), i.push(h);
    }
    return i;
  }

  function l(t) {
    var e = document.createElement('style'), i = t.attributes || {};
    if (void 0 === i.nonce) {
      var o = n.nc;
      o && (i.nonce = o);
    }
    if (Object.keys(i).forEach((function(t) {
      e.setAttribute(t, i[t]);
    })), 'function' == typeof t.insert) t.insert(e); else {
      var s = r(t.insert || 'head');
      if (!s) throw new Error('Couldn\'t find a style target. This probably means that the value for the \'insert\' parameter is invalid.');
      s.appendChild(e);
    }
    return e;
  }

  var h, c = (h = [], function(t, e) {
    return h[t] = e, h.filter(Boolean).join('\n');
  });

  function d(t, e, n, i) {
    var o = n ? '' : i.media ? '@media '.concat(i.media, ' {').concat(i.css, '}') : i.css;
    if (t.styleSheet) t.styleSheet.cssText = c(e, o); else {
      var r = document.createTextNode(o), s = t.childNodes;
      s[e] && t.removeChild(s[e]), s.length ? t.insertBefore(r, s[e]) : t.appendChild(r);
    }
  }

  function f(t, e, n) {
    var i = n.css, o = n.media, r = n.sourceMap;
    if (o ? t.setAttribute('media', o) : t.removeAttribute('media'), r && btoa && (i += '\n/*# sourceMappingURL=data:application/json;base64,'.concat(btoa(unescape(encodeURIComponent(JSON.stringify(r)))), ' */')), t.styleSheet) t.styleSheet.cssText = i; else {
      for (; t.firstChild;) t.removeChild(t.firstChild);
      t.appendChild(document.createTextNode(i));
    }
  }

  var p = null, v = 0;

  function g(t, e) {
    var n, i, o;
    if (e.singleton) {
      var r = v++;
      n = p || (p = l(e)), i = d.bind(null, n, r, !1), o = d.bind(null, n, r, !0);
    } else n = l(e), i = f.bind(null, n, e), o = function() {
      !function(t) {
        if (null === t.parentNode) return !1;
        t.parentNode.removeChild(t);
      }(n);
    };
    return i(t), function(e) {
      if (e) {
        if (e.css === t.css && e.media === t.media && e.sourceMap === t.sourceMap) return;
        i(t = e);
      } else o();
    };
  }

  t.exports = function(t, e) {
    (e = e || {}).singleton || 'boolean' == typeof e.singleton || (e.singleton = o());
    var n = u(t = t || [], e);
    return function(t) {
      if (t = t || [], '[object Array]' === Object.prototype.toString.call(t)) {
        for (var i = 0; i < n.length; i++) {
          var o = a(n[i]);
          s[o].references--;
        }
        for (var r = u(t, e), l = 0; l < n.length; l++) {
          var h = a(n[l]);
          0 === s[h].references && (s[h].updater(), s.splice(h, 1));
        }
        n = r;
      }
    };
  };
}, function(t, e, n) {
}]);