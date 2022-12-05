import { body } from 'express-validator'

const { Op } = require("sequelize")
import AstronautModel from '../models/astronauts'

import EntityNotExistError from '../errors/EntityNotExist'

import { superpowersEnum } from '../enums'

import { Request, Response, NextFunction } from 'express'


export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = parseInt(<string>req.query.page) || 1
        const limit = parseInt(<string>req.query.limit) || 10
        const surnameFilter = req.query.surname || null
        const superpowerFilter = req.query.superpower || null

        const offset = limit * (page - 1)

        const where: any = {}
        if (surnameFilter) where.surname = { [Op.like]: `%${surnameFilter}%` }
        if (superpowerFilter) where.superpower = superpowerFilter

        const astronauts = await AstronautModel.findAll({
            where,
            limit,
            offset
        })

        const totalResults = await AstronautModel.count({
            where
        })

        return res.json({
            astronauts,
            pagination: {
                total_results: totalResults,
                limit
            }
        })
    } catch (error) {
        return next(error)
    }
}

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id)

        const astronaut = await AstronautModel.findOne({
            where: {
                id
            }
        })
        if (!astronaut) return next(new EntityNotExistError("Astronaut doesn't exists"))

        return res.json({ astronaut })
    } catch (error) {
        return next(error)
    }
}

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body

        const astronaut = await AstronautModel.create({
            name: body.name,
            surname: body.surname,
            birthdate: body.birthdate,
            superpower: body.superpower
        })

        return res.json({
            message: "Astronaut was succesfully created",
            astronaut
        })
    } catch (error) {
        return next(error)
    }
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id)
        const body = req.body

        const astronaut = await AstronautModel.findOne({
            where: {
                id
            }
        })
        if (!astronaut) return next(new EntityNotExistError("Astronaut doesn't exists"))

        await AstronautModel.update({
            name: body.name,
            surname: body.surname,
            birthdate: body.birthdate,
            superpower: body.superpower
        }, {
            where: {
                id
            }
        })

        const _astronaut = await AstronautModel.findOne({
            where: {
                id
            }
        })

        return res.json({
            message: "Astronaut was succesfully updated",
            astronaut: _astronaut
        })
    } catch (error) {
        return next(error)
    }
}

export const _delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id)

        const astronaut = await AstronautModel.findOne({
            where: {
                id
            }
        })
        if (!astronaut) return next(new EntityNotExistError("Astronaut doesn't exists"))

        await AstronautModel.destroy({
            where: {
                id
            }
        })

        return res.json({
            message: "Astronaut was succesfully deleted"
        })
    } catch (error) {
        return next(error)
    }
}

export const createUpdateValidate = [
    body("name")
        .notEmpty()
        .withMessage("Required")
        .bail()
        .isLength({ max: 64 })
        .withMessage("Max length is 64 chars"),
    body("surname")
        .notEmpty()
        .withMessage("Required")
        .bail()
        .isLength({ max: 64 })
        .withMessage("Max length is 64 chars"),
    body("birthdate")
        .notEmpty()
        .withMessage("Required")
        .bail()
        .isISO8601().toDate()
        .withMessage("Invalid date format"),
    body("superpower")
        .notEmpty()
        .withMessage("Required")
        .bail()
        .isIn([superpowersEnum.FLYING, superpowersEnum.SPEED, superpowersEnum.STRONG])
        .withMessage("Unknown type")
]