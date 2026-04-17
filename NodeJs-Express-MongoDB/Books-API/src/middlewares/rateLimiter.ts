import rateLimit from "express-rate-limit";

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Rate limit exceeded. You can only make 100 requests every 15 mins.",
  handler: (req, res, next, options) => {
    next({message: options.message, statusCode: options.statusCode})
  },
  standardHeaders: true,
  legacyHeaders: false
});

export default rateLimiter;