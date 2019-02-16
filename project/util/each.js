module.exports = (a, f) => {
  let i = a.length;
  let r = i % 10;

  do {
    f(a[--i], i);
  } while (--r);
  while (i) {
    f(a[--i], i);
    f(a[--i], i);
    f(a[--i], i);
    f(a[--i], i);
    f(a[--i], i);
    f(a[--i], i);
    f(a[--i], i);
    f(a[--i], i);
    f(a[--i], i);
    f(a[--i], i);
  }
};
