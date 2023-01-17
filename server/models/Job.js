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
        date: {
            type: DataTypes.STRING
        },
        gasCost: {
            type: DataTypes.DECIMAL
        },
        depreciation: {
            type: DataTypes.DECIMAL
        },
        factor: {
            type: DataTypes.DECIMAL
        },
        gAndA: {
            type: DataTypes.DECIMAL
        },
        loan: {
            type: DataTypes.DECIMAL
        },
        odc: {
            type: DataTypes.DECIMAL
        },
        rental: {
            type: DataTypes.DECIMAL
        },
        repairs: {
            type: DataTypes.DECIMAL
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'user_id'
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