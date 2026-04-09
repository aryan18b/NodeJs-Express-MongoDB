const Author = require('../models/author.model')

exports.getAllAuthors = async () =>{
    return await Author.find();
}