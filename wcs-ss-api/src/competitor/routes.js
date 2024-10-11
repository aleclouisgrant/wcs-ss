const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get('/', controller.getCompetitors);
router.get('/:id', controller.getCompetitorByWsdcId);
router.get('/id/:id', controller.getCompetitorByWsdcId);

module.exports = router;