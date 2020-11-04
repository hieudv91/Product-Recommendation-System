const mongoose = require('mongoose');
const Boom = require('@hapi/boom')
const Recommendation = require('../models/rconfig.model');
const Trans = require('../models/transaction.model');
const RRule = require('../models/rrule.model');
const Shop = require('../models/shop.model');
const Apiori = require('../utils/apiori.util')

const generateOftenBoughtTogether = async (req, h) => {
    const time = Date.now();
    console.log(`[Apiori] Starting generation job id Job-${time}`)
    const recommendations = await Recommendation.find({})

    recommendations
        .filter(reco => reco.type == 'BOUGHT_TOGETHER')
        .forEach(async (reco) => {
            const trans = await Trans.find({ active: true, shop: reco.shop })
            const order =
                trans.filter(t => t.type == 'SALES_ORDER')
                    .map(t => t.items)

            const newRules = 
                Array.from(Apiori.apiori(order))
                    .map(line => ({
                        source: line[0],
                        target: line[1],
                        shop: reco.shop
                    }))

            try {
                const del = await RRule.deleteMany({ shop: reco.shop })
                const cre = await RRule.create(newRules);

            } catch (err) {
                console.log(err)
                throw Boom.notAcceptable()
            }
            const shop = await Shop.findById(reco.shop)
            console.log(`[Apiori] Generation for shop ${shop.name} finished, ${newRules.length} rule(s) generated`)

        })
    //console.log(`[Apiori] Generation job id Job-${time} finished`)
    return '----------'
}

module.exports = {
    generateOftenBoughtTogether
};