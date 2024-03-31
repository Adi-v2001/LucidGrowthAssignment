const dnsController = require('../controllers/dnsController.js');
const router = require('express').Router()

router.post('/addDNS', dnsController.addDNS)
router.get('/getAllDNS', dnsController.getAllDNS)
router.get('/getOneDNS/:id', dnsController.getOneDNS)
router.get('/getDNSByType', dnsController.getDNSByType)
router.delete('/deleteDNSById', dnsController.deleteDNSById)
router.patch('/editDNS', dnsController.editDNS)
module.exports = router