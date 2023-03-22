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
      type: DataTypes.STRING,
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
      type: DataTypes.STRING
    },
    depreciation: {
      type: DataTypes.DOUBLE,
    },
    factor: {
      type: DataTypes.STRING,
    },
    gAndA: {
      type: DataTypes.STRING,
    },
    loan: {
      type: DataTypes.STRING,
    },
    odc: {
      type: DataTypes.STRING,
    },
    rental: {
      type: DataTypes.STRING,
    },
    repairs: {
      type: DataTypes.STRING,
    },
    labor: {
      type: DataTypes.STRING
    },
    dispatch: {
      type: DataTypes.STRING
    },
    payrollTax: {
      type: DataTypes.STRING
    },
    netProfit: {
      type: DataTypes.STRING
    },
    laborRatePercent: {
      type: DataTypes.STRING
    },
    insurance: {
      type: DataTypes.STRING
    },
    trailer: {
      type: DataTypes.STRING
    },
    tractor: {
      type: DataTypes.STRING
    },
    totalFixedCost: {
      type: DataTypes.STRING
    },
    driveTime: {
      type: DataTypes.INTEGER
    },
    client: {
      type: DataTypes.STRING
    },
    driver: {
      type: DataTypes.STRING
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "user_id",
      },
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
