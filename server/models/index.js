const User = require('./User')
const Costs = require('./Costs')
const Job = require('./Job')

User.hasMany(Job, {
    foreignKey: 'job_id',
    onDelete: 'CASCADE'
})

User.hasOne(Costs, {
    foreignKey: 'costs_id',
    onDelete: 'CASCADE'
})

Job.belongsTo(User, {
    foreignKey: 'user_id'
})

Job.hasOne(Costs, {
    foreignKey: 'costs_id'
})

Costs.belongsTo(User, {
    foreignKey: 'user_id'
})

Costs.belongsTo(Job, {
    foreignKey: 'job_id'
})

module.exports = { User, Job, Costs }