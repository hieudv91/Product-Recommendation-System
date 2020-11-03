const mongoose = require('mongoose');
const Boom = require('@hapi/boom')
const Recommendation = require('../models/rconfig.model');
const Trans = require('../models/transaction.model');
const RRule = require('../models/rrule.model');
const Apiori = require('../utils/apiori.util')

const testJob = async (req, h) => {
    console.log(`Cronjob start!`)
    const recommendations = await Recommendation.find({})

    recommendations
        .filter(reco => reco.type == 'BOUGHT_TOGETHER')
        .forEach(async (reco) => {

            const trans = await Trans.find({ active: true, shop: reco.shop })
            const order =
                trans.filter(t => t.type == 'SALES_ORDER')
                    .map(t => t.items)
        
            const rules = Array.from(Apiori.apiori(order))
                .map(line => ({ source: line[0], target: line[1] }))
        
            try {
                const no = RRule.create(rules);
            } catch (err) {
                console.log(err)
                throw Boom.notAcceptable()
            }

        })

    return `Cronjob finished`
}

module.exports = {
    testJob
};