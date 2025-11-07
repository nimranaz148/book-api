const {getAuthorvalidator, createAuthorvalidator, updateAuthorvalidatorId, updateAuthorvalidatorBody, deleteAuthorvalidatorId} = require('../validators/author.validatorschema')

exports.getAuthorvalidateMiddleware = (req, res, next) => {
    try {
            getAuthorvalidator.parse(req.query)
            next()
    } catch (error) {
        return res.status(400).json({message: "Validation Error", errors: error.issues})
        
    }


}



exports.createAuthorvalidateMiddleware = (req, res, next) => {
    try {
            createAuthorvalidator.parse(req.body)
            next()
    } catch (error) {
        return res.status(400).json({message: "Validation Error", errors: error.issues})
        
    }


}




exports.updateAuthorvalidateMiddleware = (req, res, next) => {
    try {

        // const {id} = req.params
            updateAuthorvalidatorId.parse(req.params)

            // const {firstName, lastName, email} = req.body

            updateAuthorvalidatorBody.parse(req.body)
            next()
    } catch (error) {
        return res.status(400).json({message: "Validation Error", errors: error.issues})
        
    }


}





exports.deleteAuthorvalidateMiddleware = (req, res, next) => {
    try {

        // const {id} = req.params
        deleteAuthorvalidatorId.parse(req.params)

        next()
    } catch (error) {

        return res.status(400).json({message: "Validation Error", errors: error.issues})
        
    }


}
