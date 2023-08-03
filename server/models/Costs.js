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
        insuranceType: {
            type: DataTypes.STRING
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
        repairs: {
            type: DataTypes.DOUBLE
        }, 
        mpg: {
            type: DataTypes.DOUBLE
        },
        parking: {
            type: DataTypes.DOUBLE
        },
        manager_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'manager',
                key: 'manager_id'
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