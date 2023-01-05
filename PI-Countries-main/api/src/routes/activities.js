const { Router } = require('express')
//const { EmptyResultError } = require('sequelize/types/index.js')
const { Country, Activity } = require('../db.js')
const router = Router()


router.post('/', async (req, res) => {
  const { countries, name, difficulty, duration, season } = req.body
  const newActivity = await Activity.create({
    name,
    difficulty,
    duration,
    season,
  })

  console.log(countries)
  countries.map(
    // async (c) => await newActivity.setCountries(await Country.findByPk(c))
    async (c) => await newActivity.addCountries(await Country.findByPk(c))
  )


  res.json(newActivity)
})

// Carga todas las actividades
router.get('/all', async (req, res, next) => {
  try {
    const dbActiv = await Activity.findAll();
    return res.json(dbActiv);
  } catch (error) {
    next (error);
  }
});

module.exports = router
