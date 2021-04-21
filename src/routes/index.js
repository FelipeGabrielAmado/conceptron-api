const { Router } = require('express');
const router = Router();

const { getProjetos, getProjetosPorId, createProjeto, updateProjeto, deleteProjeto } = require('../controllers/index.controller');

router.get('/projetos', getProjetos);
router.get('/projetos/:id', getProjetosPorId);
router.post('/projetos', createProjeto);
router.put('/projetos/:id', updateProjeto);
router.delete('/projetos/:id', deleteProjeto);

module.exports = router;