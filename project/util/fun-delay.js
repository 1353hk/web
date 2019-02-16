/**
 * @desc   函数节流。
 * 适用于限制`resize`和`scroll`等函数的调用频率
 * @param  {Number}    delay          0 或者更大的毫秒数。 对于事件回调，大约100或250毫秒（或更高）的延迟是最有用的。
 * @param  {Boolean}   noTrailing     可选，默认为false。
 *                                    如果noTrailing为true，当节流函数被调用，每过`delay`毫秒`callback`也将执行一次。
 *                                    如果noTrailing为false或者未传入，`callback`将在最后一次调用节流函数后再执行一次.
 *                                    （延迟`delay`毫秒之后，节流函数没有被调用,内部计数器会复位）
 * @param  {Function}  callback       延迟毫秒后执行的函数。`this`上下文和所有参数都是按原样传递的，
 *                                    执行去节流功能时，调用`callback`。
 * @param  {Boolean}   debounceMode   如果`debounceMode`为true，`clear`在`delay`ms后执行。
 *                                    如果debounceMode是false，`callback`在`delay` ms之后执行。
 * @return {Function}  新的节流函数
 */

const throttle = (delay, noTrailing, callback, debounceMode) => {
  let timeoutID;
  let lastExec = 0;
  if (typeof noTrailing !== 'boolean') {
    debounceMode = callback;
    callback = noTrailing;
    noTrailing = undefined;
  }

  const wrapper = (...args) => {
    const self = this;
    const elapsed = Number(new Date()) - lastExec;

    const exec = () => {
      lastExec = Number(new Date());
      callback.apply(self, args);
    };

    const clear = () => {
      timeoutID = undefined;
    };

    if (debounceMode && !timeoutID) exec();

    if (timeoutID) clearTimeout(timeoutID);

    if (debounceMode === undefined && elapsed > delay) {
      exec();
    } else if (noTrailing !== true) {
      timeoutID = setTimeout(
        debounceMode ? clear : exec,
        debounceMode === undefined ? delay - elapsed : delay,
      );
    }
  };

  return wrapper;
};

/**
 * @desc 函数防抖
 * 与throttle不同的是，debounce保证一个函数在多少毫秒内不再被触发，只会执行一次，
 * 要么在第一次调用return的防抖函数时执行，要么在延迟指定毫秒后调用。
 * @example 适用场景：如在线编辑的自动存储防抖。
 * @param  {Number}   delay         0或者更大的毫秒数。 对于事件回调，大约100或250毫秒（或更高）的延迟是最有用的。
 * @param  {Boolean}  atBegin       可选，默认为false。
 *                                  如果`atBegin`为false或未传入，回调函数则在第一次调用return的防抖函数后延迟指定毫秒调用。
 *                                  如果`atBegin`为true，回调函数则在第一次调用return的防抖函数时直接执行
 * @param  {Function} callback      延迟毫秒后执行的函数。`this`上下文和所有参数都是按原样传递的，
 *                                  执行去抖动功能时，，调用`callback`。
 * @return {Function} 新的防抖函数。
 */

const debounce = (delay, atBegin, callback) => (callback === undefined
  ? throttle(delay, atBegin, false)
  : throttle(delay, callback, atBegin !== false));

module.exports = {
  throttle,
  debounce,
};
