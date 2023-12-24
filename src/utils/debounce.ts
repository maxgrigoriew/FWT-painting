export default function debounce(fn, delay) {
  let time = null;
  return function () {
    clearTimeout(time);
    const args = Array.prototype.slice.call(arguments);
    console.log(args);
    const that = this;
    time = setTimeout(function () {
      fn.apply(that, args);
    }, delay);
  };
}
