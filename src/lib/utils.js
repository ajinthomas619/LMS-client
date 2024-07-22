export const debounce = (func, delay) => {
    let timerId;

    const debouncedFunction = (...args) => {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            func(...args);
        }, delay);
    };

    debouncedFunction.cancel = () => {
        clearTimeout(timerId);
    };

    return debouncedFunction;
};
