export const throttle = (fn: () => void, time: number | undefined) => {
  let timer: number | undefined = undefined;
  return (...args: []) => {
    if (timer) {
      return;
    } else {
      fn(...args); // 在这里使用类型断言
      timer = setTimeout(() => {
        timer = undefined;
      }, time);
    }
  };
};
