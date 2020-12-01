const filterMap = (f, m) => new Map([...m].filter(f))
const getValue = (k, m) => m.get(k) || 0
const mergeMap =
    (a, b) =>
        [...b].reduce(
            (acc, i) =>
                acc.set(i[0], getValue(i[0], acc) + i[1])
            , a)
const diff = (a, b) => a.filter(i => !b.includes(i));
const addToRule = (ruleSet, left, right, measure) => {
    let currVal = ruleSet.get(left);
    currVal === undefined ?
        ruleSet.set(left, [[right, measure]])
        : ruleSet.set(left, currVal.concat([[right, measure]]))
}
const intersect = (a, b) => a.filter(i => b.includes(i));
const getSubSets_intersect = arr => arr.reduce((s, itm, idx, ar) => s.concat(ar.slice(idx + 1, arr.length).map(i => intersect(itm, i))), [[]])

const apiori = (trans) => {

    const MIN_CONFIDENT = 59;
    // Generate Item Set
    const oneItemCount =
        trans
            .map(t => t
                .reduce((acc, i) =>
                    acc.set(`${i}`
                        , getValue(`${i}`, acc) + 1)
                    , new Map()))
            .reduce((acc, t) => mergeMap(acc, t), new Map())

    const sum = Array.from(oneItemCount.values()).reduce((a, b) => a + b, 0);
    const MIN_SUPPORT = (sum / Array.from(oneItemCount.values()).length) - 1 || 0;
            
    const firstSet =
        Array.from(
            filterMap(
                ([k, v]) => v > MIN_SUPPORT
                , oneItemCount)
                .keys())

    //console.log(`Starting Generate Itemset`)
    let lvl_itemset = 2
    let feqSets = Array.from(filterMap(([k, v]) => v > MIN_SUPPORT, oneItemCount))
    let preSet = firstSet
    let curSet = null
    do {
        //console.log(`Generating ${lvl_itemset}-itemset`)
        const subSet =
            preSet
                .map(s => s.split(','))
                .map(s =>
                    firstSet
                        .filter(i => !s.includes(i))
                        .reduce((acc, i) => acc.set([...s, i].sort().toString()), new Map()))
                .reduce((a, s) => new Map([...a, ...s]), new Map())
        const subSetArray = Array.from(subSet.keys()).map(s => s.split(','))

        //console.log(`Count Subset in all transaction lvl = ${lvl_itemset}`)
        const countSubInTrans =
            trans.reduce((acc, t, idx) => {
                subSetArray
                    .map(s => !s.some(val => !t.includes(val)) ? s.toString() : null)
                    .filter(s => s !== null)
                    .map(s => s.toString())
                    .forEach(s => acc.set(`${s}`, (acc.get(`${s}`) || 0) + 1))
                return acc
            }, new Map())

        const feqMap = filterMap(([k, v]) => v > MIN_SUPPORT, countSubInTrans)

        curSet = Array.from(feqMap.keys())
        feqSets = feqSets.concat(Array.from(feqMap))
        preSet = curSet
        lvl_itemset++
    } while (curSet.length > 0)


    //console.log(feqSets.filter(x => x[0].split(',').length > 1))
    let feqItemSet = new Map(feqSets)

    const feqItemSetArr = Array.from(feqItemSet.keys())
        .map(set => set.split(','))
        .filter(set => set.length > 1)

    let allRules = new Map()
    let currentLevelRules = new Map();

    //console.log(`Starting Generate Rule from generated itemset`)
    feqItemSetArr.forEach(set => {
        let processingItem = set
        let currentLevel = processingItem.map(i => [i])

        let confidentOfProcessingSet = feqItemSet.get(processingItem.toString())
        currentLevel.forEach(i => {
            const measure = confidentOfProcessingSet / feqItemSet.get(i.toString()) * 100;
            if (measure > MIN_CONFIDENT) {
                const left = diff(processingItem, i).toString();
                addToRule(currentLevelRules, left, i.toString(), measure)
                addToRule(allRules, left, i.toString(), measure)
            }
        })


        do {
            currentLevel = getSubSets_intersect(Array.from(currentLevelRules.keys()).map(i => i.split(',')))
                .filter(i => i.length != 0)
            currentLevel.shift()
            currentLevelRules.clear()
            currentLevel.forEach(i => {
                const measure = confidentOfProcessingSet / feqItemSet.get(i.toString()) * 100;
                if (measure > MIN_CONFIDENT) {
                    const right = diff(processingItem, i).toString();
                    addToRule(currentLevelRules, i.toString(), right, measure)
                    addToRule(allRules, i.toString(), right, measure)
                }
            })

        } while (currentLevel.length != 0)

    })

    return allRules
}

module.exports = {
    apiori, diff
}
//console.log(apiori(trans))
