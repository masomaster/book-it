const rateLimit = require('express-rate-limit');

const skip = process.env.NODE_ENV === 'test';

function wrap(limiter) {
  if (skip) {
    return (req, res, next) => next();
  }
  return limiter;
}

/** Logins: per IP (no user yet). */
exports.loginLimiter = wrap(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 25,
    message: { message: 'Too many login attempts. Try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
  })
);

/** Sign-ups: per IP. */
exports.signupLimiter = wrap(
  rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 10,
    message: { message: 'Too many sign-up attempts. Try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
  })
);

/** Claude recommendations: per authenticated user. */
exports.recsLimiter = wrap(
  rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 50,
    message: { message: 'Too many recommendation requests. Try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) =>
      req.user && req.user._id ? String(req.user._id) : req.ip || 'unknown',
  })
);

/** Google Books proxy: per authenticated user. */
exports.googleBooksLimiter = wrap(
  rateLimit({
    windowMs: 60 * 1000,
    max: 45,
    message: { message: 'Too many book searches. Try again shortly.' },
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) =>
      req.user && req.user._id ? String(req.user._id) : req.ip || 'unknown',
  })
);
