const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Job extends Model {}

Job.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    start: {
      type: DataTypes.STRING,
    },
    pickUp: {
      type: DataTypes.STRING,
    },
    dropOff: {
      type: DataTypes.STRING,
    },
    revenue: {
      type: DataTypes.DOUBLE,
    },
    grossProfitPercentage: {
      type: DataTypes.STRING,
    },
    operatingProfitPercentage: {
      type: DataTypes.STRING
    },
    netProfitPercentage: {
      type: DataTypes.STRING
    },
    distance: {
      type: DataTypes.DOUBLE,
    },
    date: {
      type: DataTypes.STRING,
    },
    gasCost: {
      type: DataTypes.DOUBLE,
    },
    ratePerMile: {
      type: DataTypes.DOUBLE
    },
    depreciation: {
      type: DataTypes.DOUBLE,
    },
    factor: {
      type: DataTypes.DOUBLE,
    },
    gAndA: {
      type: DataTypes.DOUBLE,
    },
    loan: {
      type: DataTypes.DOUBLE,
    },
    odc: {
      type: DataTypes.DOUBLE,
    },
    repairs: {
      type: DataTypes.DOUBLE,
    },
    labor: {
      type: DataTypes.DOUBLE
    },
    dispatch: {
      type: DataTypes.DOUBLE
    },
    payrollTax: {
      type: DataTypes.DOUBLE
    },
    netProfit: {
      type: DataTypes.DOUBLE
    },
    laborRatePercent: {
      type: DataTypes.STRING
    },
    insurance: {
      type: DataTypes.DOUBLE
    },
    trailer: {
      type: DataTypes.DOUBLE
    },
    tractor: {
      type: DataTypes.DOUBLE
    },
    tolls: {
      type: DataTypes.DOUBLE
    },
    grossProfit: {
      type: DataTypes.DOUBLE
    },
    operatingProfit: {
      type: DataTypes.DOUBLE
    },
    totalFixedCost: {
      type: DataTypes.DOUBLE
    },
    driveTime: {
      type: DataTypes.STRING
    },
    client: {
      type: DataTypes.STRING
    },
    driver: {
      type: DataTypes.STRING
    },
    manager: {
      type: DataTypes.INTEGER,
      references: {
        model: "manager",
        key: "user_id"
      }
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "job",
  }
);

module.exports = Job;
