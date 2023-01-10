const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

class Job extends Model {}

Job.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        start: {
            type: DataTypes.STRING
        },
        pickUp: {
            type: DataTypes.STRING
        },
        dropOff: {
            type: DataTypes.STRING
        },
        revenue: {
            type: DataTypes.DECIMAL
        },
        costs: {
            type: DataTypes.DECIMAL
        },
        profit: {
            type: DataTypes.DECIMAL
        },
        distance: {
            type: DataTypes.DECIMAL
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'user_id'
            }
        },
        costs_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'costs',
                key: 'costs_id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'job'
    }
)

module.exports = Job