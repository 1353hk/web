module.exports = (arg) => {
  const type = Object.prototype.toString.call(arg);
  switch (type) {
    case '[object String]':
      break;

    case '[object Array]': {
      const [r, g, b] = arg;
      const bit = (r << 16) + (g << 8) + b;
      const str = bit.toString(16).padStart(6, '0');
      return `#${str}`;
    }

    default: {
      const bit = (Math.random() * 0x1000000) << 0;
      const str = `00000${bit.toString(16)}`.slice(-6);
      return `#${str}`;
    }
    /* default: {
      const arr = Array.from({ length: 3 });
      const rgb = arr.map(() => {
        let color = Math.floor(Math.random() * 256).toString(16);
        if (color.length === 1) color = `0${color}`;
        return color;
      });

      const str = rgb.join('');
      return `#${str}`;
    } */
  }
};
