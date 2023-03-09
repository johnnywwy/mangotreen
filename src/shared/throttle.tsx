export const throttle = (fn: () => void, time: number | undefined) => {
  let timer: number | undefined = undefined;
  return (...args: any[]) => {
    if (timer) {
      return;
    } else {
      fn(...args);
      timer = setTimeout(() => {
        timer = undefined;
      }, time);
    }
  };
};
