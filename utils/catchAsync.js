/**
 * Wraps an async function to handle errors gracefully
 * @param {Function} fn - The async function to wrap
 * @returns {Function} - The wrapped function that forwards errors to error handler
 */
const catchAsync = (fn) => {
  return async function (...args) {
    try {
      const result = await fn.apply(this, args);
      return result;
    } catch (error) {
      this.next(error);
    }
  };
};

module.exports = catchAsync;
