const {getBookValidator, createBookValidator, updateBookValidatorId, updateBookValidatorBody, deleteBookValidatorId} = require("../validators/book.validatorschema")

exports.getbookvalidatemiddleware = (req, res, next) => {
    try {
        getBookValidator.parse(req.query);
        next();
    } catch (error) {
        return res.status(400).json({message: "Validation failed", errors: error.issues});

        
    }

}



exports.createbookvalidatemiddleware = (req, res, next) => {
    try {
        // const { title, description, authorid } = req.body;
         createBookValidator.parse(req.body);
        
        next();
    } catch (error) {
        return res.status(400).json({message: "Validation failed", errors: error.issues});

        
    }

}





exports.updatebookvalidatemiddleware = (req, res, next) => {
    try {
        
        updateBookValidatorId.parse(req.params);

        updateBookValidatorBody.parse(req.body);
        
        next();
    } catch (error) {
        return res.status(400).json({message: "Validation failed", errors: error.issues});

        
    }

}





exports.deletebookvalidatemiddleware = (req, res, next) => {
    try {

        deleteBookValidatorId.parse(req.params);
        
        next();
    } catch (error) {
        return res.status(400).json({message: "Validation failed", errors: error.issues});

        
    }

}