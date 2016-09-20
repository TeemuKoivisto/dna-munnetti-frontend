const logger = store => next => action => {
  if (process.env.NODE_ENV !== "production") {
    console.log("dispatching", action);
  }
  next(action);
};

export default logger;
