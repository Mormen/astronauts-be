import { DataTypes } from 'sequelize'

import sequelizeConn from '../services/sequelize'

import { superpowersEnum } from '../enums'

import { Model, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize'


interface AstronautModelI extends Model<InferAttributes<AstronautModelI>, InferCreationAttributes<AstronautModelI>> {
    id: CreationOptional<number>
    name: string
    surname: string
    birthdate: Date
    superpower: superpowersEnum
}

const AstronautModel = sequelizeConn.define<AstronautModelI>("astronaut", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    surname: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    birthdate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    superpower: {
        type: DataTypes.ENUM(superpowersEnum.FLYING, superpowersEnum.SPEED, superpowersEnum.STRONG),
        allowNull: false
    }
})

export default AstronautModel