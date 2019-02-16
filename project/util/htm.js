'use strict';
var c = function () {
  var length = arguments.length;
  if (length === 0) {
    console.count('次数');
  } else {
    var last = arguments[length - 1];
    var constructor = last.constructor;
    if (constructor === Array || constructor === Object) {
      for (var i = 0; i < length; i++) {
        var item = arguments[i];
        var constructor = item.constructor;
        if (constructor === Array || constructor === Object) {
          if (i === 0) {
            console.group();
          }
          console.log(item);
          console.table(item);
        } else {
          if (i === 0) {
            console.group(item);
            document.title = item;
          } else {
            console.log(item);
          }
        }
      }
      console.groupEnd();
    } else {
      console.log.apply(console, arguments);
      document.title = arguments[0];
    }
  }
};

var $=function(id) {
  return window.document.getElementById(id);
};
var $$=function(cla) {
  return [].slice.call(window.document.getElementsByClassName(cla));
};

// 重定向到URL
var redirect=function(url, replace) {
  var location = window.location;
  if (replace) {
    location.replace(url);
  } else {
    location.href = url;
  }
};

var requestAnimFrame = (function () {
  return (
    window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || function (callback) {
      window.setTimeout(callback, 17);
    }
  );
}());

var addEvent = (function () {
  if (window.addEventListener) {
    return function (ele, eve, fun, cap) {
      ele.addEventListener(
        eve,
        function (e) {
          fun.call(ele, e);
        },
        cap
      );
    };
  } else if (window.attachEvent) {
    return function (ele, eve, fun) {
      ele.attachEvent('on' + eve, function (e) {
        fun.call(ele, e);
      });
    };
  }
})();

var htmlFont = (function () {
  var html = document.documentElement;
  var htmlWidth = html.clientWidth;
  var fun = function () {
    if (htmlWidth <= 750) {
      html.style.fontSize = htmlWidth * 20 / 375 + 'px';
    }
  };
  window.addEventListener('resize', fun);
  window.addEventListener('orientationchange', fun);
  return fun;
})();

window.addEventListener('load', function () {
  document.body.classList.remove('loading');
});
