const { Router } = require('express')

const router = Router()

// Importar todos los routers;
const activities = require('./activities')
const countries = require('./countries')

// Configurar los routers
router.use('/activities', activities)
router.use('/countries', countries)

module.exports = router
