export default function debounce(callback: (args) => void, delay: number) {
  let time: null | undefined | number = null;
  return function () {
    clearTimeout(time);
    const args = Array.prototype.slice.call(arguments);
    const that = this;
    time = setTimeout(function () {
      fn.apply(that, args);
    }, delay);
  };
}
