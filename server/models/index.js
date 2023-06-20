const Costs = require('./Costs')
const Job = require('./Job')
const Manager = require('./Manager')
const Driver = require('./Driver')

Manager.hasMany(Job, {
    foreignKey: 'job_id'
})

Manager.hasOne(Costs, {
    foreignKey: 'costs_id'
})

Manager.hasMany(Driver, {
    foreignKey: 'user_id'
})

Driver.belongsTo(Manager, {
    foreignKey: 'user_id'
})

Driver.hasOne(Costs, {
    foreignKey: 'costs_id'
})

Driver.hasMany(Job, {
    foreignKey: 'job_id'
})

Job.belongsTo(Manager, {
    foreignKey: 'user_id'
})

Job.belongsTo(Driver, {
    foreignKey: 'user_id'
})

Job.hasOne(Costs, {
    foreignKey: 'costs_id'
})

Costs.belongsTo(Driver, {
    foreignKey: 'user_id'
})

Costs.belongsTo(Manager, {
    foreignKey: 'user_id'
})

Costs.belongsTo(Job, {
    foreignKey: 'job_id'
})

module.exports = { Driver, Manager, Job, Costs }