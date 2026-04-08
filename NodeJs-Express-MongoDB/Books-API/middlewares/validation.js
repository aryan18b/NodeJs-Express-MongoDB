const mongoose = require('mongoose');

exports.validateId = function (req, res, next) {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) return next({ message: `id is not valid`, statusCode: 400 });
    req.validated = { id };
    next();
}

exports.validateBody = function (req, res, next) {
    const data = req.body;
    if (!data.title) return next({ message: "title cannot be empty", statusCode: 400 });
    if (!data.author) return next({ message: "author cannot be empty", statusCode: 400 });
    next();
}