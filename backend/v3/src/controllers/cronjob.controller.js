const mongoose = require('mongoose');
const Boom = require('@hapi/boom')
const Trans = require('../models/transaction.model');
const RRule = require('../models/rrule.model');
const Apiori = require('../utils/apiori.util')

const testJob = async (req, h) => {
    const trans = await Trans.find({active:true})
    const order =
        trans.filter(t => t.type == 'SALES_ORDER')
            .map(t => t.items)
    const rules = Array.from(Apiori.apiori(order))
        .map(line => ({ source: line[0], target: line[1]}))
    try {
        const no = RRule.create(rules);
    } catch (err) {
        console.log(err)
        throw Boom.notAcceptable()
    }
    console.log(rules)
    return `We have total ${trans.length}`
}

module.exports = {
    testJob
};