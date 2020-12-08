const mongoose = require('mongoose');
const Boom = require('@hapi/boom')
const Recommendation = require('../models/rconfig.model');
const Trans = require('../models/transaction.model');
const RRule = require('../models/rrule.model');
const Shop = require('../models/shop.model');
const Apiori = require('../utils/apiori.util')

const generateOftenBoughtTogether = async (req, h) => {
    const time = Date.now();

    const recommendations = await Recommendation.find({ type: 'BOUGHT_TOGETHER', status: 'NOT_YET' })

    if (recommendations.length == 0) {
        console.log(`[Apiori] There is not recommendation active`);
        return `[Apiori] Job finished.`;
    }

    const updSReco = recommendations.map(i => i._id);
    const upS1 = await
        Recommendation
            .update({ _id: { $in: updSReco } },
                { $set: { status: 'GENERATING' } },
                { multi: true }
            )

    recommendations
        .forEach(async (reco, i) => {
            const trans = await Trans.find({ active: true, shop: reco.shop })
            const order =
                trans.filter(t => t.type == 'SALES_ORDER')
                    .map(t => t.items)

            const newRules =
                Array.from(Apiori.apiori(order))
                    .map(line => line[1]
                        .map(l => ({
                            target: line[0],
                            source: l[0],
                            value: parseFloat(l[1]).toFixed(2),
                            shop: reco.shop,
                            code: reco.code
                        })))
                    .reduce((acc, cV) => acc.concat(cV), [])
                    .filter(i => i.source.split(',').length == 1)
                    .filter(i => i.target.split(',').length == 1)
            try {
                const del = await RRule.deleteMany({ shop: reco.shop })
                const cre = await RRule.create(newRules);

            } catch (err) {
                throw Boom.notAcceptable()
            }
            const shop = await Shop.findById(reco.shop)
            const upS2 = await
                Recommendation
                    .update({ _id: { $in: [reco._id] } },
                        { $set: { status: 'GENERATED' } },
                        { multi: false }
                    )
            console.log(`[Apiori] Generation for shop ${shop.name} finished, ${newRules.length} rule(s) generated`)
        })
    return `[Apiori] Starting generation job id Job-${time}`;
}

module.exports = {
    generateOftenBoughtTogether
};