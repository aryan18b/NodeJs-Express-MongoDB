exports.validateId = function (req, res, next) {
    const id = Number(req.params.id);
    if (isNaN(id)) return next({ message: `id is not valid`, statusCode: 400 });
    req.validated = { id };
    next();
}

exports.validateBody = function (req, res, next) {
    const data = req.body;
    if (!data.title) return next({ message: "title cannot be empty", statusCode: 400 });
    if (!data.author) return next({ message: "author cannot be empty", statusCode: 400 });
    next();
}