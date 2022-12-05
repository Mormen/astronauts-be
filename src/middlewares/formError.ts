import { validationResult } from 'express-validator'

import { Request, Response, NextFunction } from 'express'


const formError = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const convertedErrors: any = {}
        errors.array().forEach(error => {
            convertedErrors[error.param] = error.msg
        })

        return res.status(422).json({
            message: "Invalid form",
            errors: convertedErrors
        })
    } else {
        next()
    }
}

export default formError
