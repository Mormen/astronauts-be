import { Request, Response, NextFunction } from 'express'
import EntityNotExistError from '../errors/EntityNotExist'
import InvalidFormError from '../errors/InvalidForm'


const error = (error: any, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof EntityNotExistError) {
        return res.status(404).json({
            message: error.message
        })
    }

    if (error instanceof InvalidFormError) {
        return res.status(422).json({
            message: error.message,
            errors: error.errors
        })
    }

    return res.status(500).send()
}

export default error
