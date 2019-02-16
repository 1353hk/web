module.exports = (form, fun) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let inp;
    for (let i = form.length; i--;) {
      inp = form[i];
      if (!inp.checkValidity()) {
        inp.focus();
        return false;
      }
    }

    fun(e);
  });
};
