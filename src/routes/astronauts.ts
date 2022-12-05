import express from 'express'

import {
    getAll,
    getOne,
    create,
    update,
    _delete,
    createUpdateValidate
} from '../controllers/astronauts'

import formErrorMiddleware from '../middlewares/formError'

import { Router } from 'express'


const route: Router = express.Router()

route.get("/", getAll)
route.get("/:id", getOne)
route.post("/", createUpdateValidate, formErrorMiddleware, create)
route.put("/:id", createUpdateValidate, formErrorMiddleware, update)
route.delete("/:id", _delete)

export default route