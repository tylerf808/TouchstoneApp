const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

class Costs extends Model { }

Costs.init(
    {
        costs_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        laborRate: {
            type: DataTypes.DOUBLE
        },
        payrollTax: {
            type: DataTypes.DOUBLE
        },
        dispatch: {
            type: DataTypes.DOUBLE
        },
        insurance: {
            type: DataTypes.DOUBLE
        },
        factor: {
            type: DataTypes.DOUBLE
        },
        odc: {
            type: DataTypes.DOUBLE
        },
        tractorLease: {
            type: DataTypes.DOUBLE
        },
        trailerLease: {
            type: DataTypes.DOUBLE
        },
        gAndA: {
            type: DataTypes.DOUBLE
        },
        loan: {
            type: DataTypes.DOUBLE
        }, 
        rental: {
            type: DataTypes.DOUBLE
        }, 
        repairs: {
            type: DataTypes.DOUBLE
        }, 
        depreciation: {
            type: DataTypes.DOUBLE
        },
        mpg: {
            type: DataTypes.DOUBLE
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
        modelName: 'costs'
    }
)

module.exports = Costs