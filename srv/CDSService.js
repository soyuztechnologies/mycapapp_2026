const cds = require('@sap/cds')

module.exports = class CDSService extends cds.ApplicationService { init() {

  const { ProductSet, ItemsSet } = cds.entities('CDSService')

  this.before (['CREATE', 'UPDATE'], ProductSet, async (req) => {
    console.log('Before CREATE/UPDATE ProductSet', req.data)
  })
  this.after ('READ', ProductSet, async (productSet, req) => {
    console.log('After READ ProductSet', productSet)
    let ids = productSet.map(p => p.ProductId)

    const partnerCount = await SELECT.from(ItemsSet)
                                 .columns('ProductId', {func: 'count', as: 'count'})
                                 .where({'ProductId': {in: ids}})
                                 .groupBy('ProductId');

    for (const p of productSet) {
      const partner = partnerCount.find(pc => pc.ProductId === p.ProductId)
      p.soldCount = partner ? partner.count : 0
    }
  })
  this.before (['CREATE', 'UPDATE'], ItemsSet, async (req) => {
    console.log('Before CREATE/UPDATE ItemsSet', req.data)
  })
  this.after ('READ', ItemsSet, async (itemsSet, req) => {
    console.log('After READ ItemsSet', itemsSet)
  })


  return super.init()
}}
