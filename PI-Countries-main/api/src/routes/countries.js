const { Router } = require('express')
const { Country, Activity } = require('../db.js')
const { Op } = require('sequelize')
const router = Router()

router.get('/', async (req, res) => {
  //incluyo la información de la tabla Activities para poder filtrar por actividad
  const all = await Country.findAll({ include: Activity })

  if (req.query.name) {
    let { name } = req.query
    name = name[0].toUpperCase() + name.slice(1).toLowerCase()
    const found = await Country.findAll({
      where: { name: { [Op.iLike]: '%'+name+'%' } },
    })
    
    return res.json(found)
  }
  
  res.json(all)
})

//**** En el examen */
// router.get('/pobChi', async (req, res) => {
//   const oneChi = await Country.findAll({
//       where: { population: 1402112000 } })
//       return res.json(oneChi) 
//        })

router.get('/:id', async (req, res) => {
  const one = await Country.findByPk(req.params.id.toUpperCase(), {
    include: Activity,
  })
  if (!one) {
    return res.status(404).send('Error: country not found')
  }
  console.log(one)
  return res.json(one)
})


  

    




module.exports = router
