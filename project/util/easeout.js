module.exports = (fun, a, b = 0, s = 2) => {
  let c;
  const step = () => {
    c = b - a;
    a += c / s;
    if (Math.abs(c) > 1) {
      fun(a, false);
      window.requestAnimationFrame(step);
    } else {
      fun(b, true);
    }
  };

  step();
};
