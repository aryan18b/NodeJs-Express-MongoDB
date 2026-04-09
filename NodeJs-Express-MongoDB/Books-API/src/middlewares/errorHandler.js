exports.errorHandler = function (err, req, res, next) {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Unexpected error";

    return res.status(statusCode).json({ error: message });
}