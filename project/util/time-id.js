class TimeId {
  constructor() {
    this.ids = {};
  }

  setTimeId(name, id) {
    const { ids } = this;
    const arr = ids[name];
    if (arr) {
      arr.push(id);
    } else {
      ids[name] = [id];
    }
  }

  delTimeId(name, delOth) {
    const { ids } = this;

    if (name && !delOth) {
      for (const i of ids[name]) {
        this.clearTimeId(i);
      }
      ids[name] = [];
    } else {
      for (const k in ids) {
        if (delOth && k === name) continue;

        if (ids.hasOwnProperty(k)) {
          for (const i of ids[k]) {
            this.clearTimeId(i);
          }
          ids[k] = [];
        }
      }
    }
  }

  clearTimeId(id) {
    clearTimeout(id);
    clearInterval(id);
  }
}

module.exports = TimeId;
