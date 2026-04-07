exports.validateId = function(req, res, next){
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: `id is not valid` });
    req.params.id = id;
    next();
}

exports.validateBody = function(req, res, next){
    const data = req.body;
    if (!data.title) return res.status(400).json({ error: "title cannot be empty" });
    if (!data.author) return res.status(400).json({ error: "author cannot be empty" });
    next();
}