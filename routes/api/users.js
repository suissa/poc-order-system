var express = require('express');
var router = express.Router();
var Controller = require('./../../controllers/users');

var cbResponseJSON = function (err, data, res) {
  if (err){
    console.log('Erro: ', err);
    msg = 'Erro: ' + err;
  } else {
    console.log('RESPOSTA: ', data);
    msg = data;
  }
  res.json(msg);
}
var cbAsyncResponseJSON = function (err, data, res, callback) {
  if (err){
    console.log('Erro: ', err);
    msg = 'Erro: ' + err;
  } else {
    console.log('RESPOSTA: ', data);
    msg = data;
  }
  res.json(msg);
  callback();
}

/* GET users listing. */
router.get('/', function(req, res) {
  Controller.retrieve(req, res, cbResponseJSON);
});

router.get('/:id', function(req, res) {
  Controller.show(req, res, cbResponseJSON);
});

router.post('/', function(req, res) {
  Controller.create(req, res, cbResponseJSON);
});

router.put('/:id', function(req, res) {
  Controller.update(req, res, cbResponseJSON);
});

router.put('/:id/addproduct', function(req, res) {
  Controller.addProduct(req, res, cbAsyncResponseJSON);
});

router.delete('/:id', function(req, res) {
  Controller.del(req, res, cbResponseJSON);
});

module.exports = router;
