const Costs = require('./Costs')
const Job = require('./Job')
const Manager = require('./Manager')
const Driver = require('./Driver')
const Dispatcher = require('./Dispatcher')

Dispatcher.hasOne(Manager, {
    foreignKey: 'manager_id'
})

Manager.hasMany(Job, {
    foreignKey: 'job_id'
})

Manager.hasOne(Costs, {
    foreignKey: 'costs_id'
})

Manager.hasMany(Driver, {
    foreignKey: 'driver_id'
})

Driver.belongsTo(Manager, {
    foreignKey: 'manager_id'
})

Driver.hasOne(Costs, {
    foreignKey: 'costs_id'
})

Driver.hasMany(Job, {
    foreignKey: 'job_id'
})

Job.belongsTo(Manager, {
    foreignKey: 'manager_id'
})

Job.belongsTo(Driver, {
    foreignKey: 'driver_id'
})

Job.hasOne(Costs, {
    foreignKey: 'costs_id'
})

Costs.belongsTo(Driver, {
    foreignKey: 'driver_id'
})

Costs.belongsTo(Manager, {
    foreignKey: 'manager_id'
})

Costs.belongsTo(Job, {
    foreignKey: 'job_id'
})

module.exports = { Driver, Manager, Job, Costs }