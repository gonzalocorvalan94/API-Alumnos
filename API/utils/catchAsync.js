export const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next); // Si hay error lo pasa al errorHandler
  };
};