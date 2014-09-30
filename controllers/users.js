var Model = UserModel;
var  msg = '';
var async = require('async');

module.exports = {
  create: function (req, res, cb) {
    var dados = req.body;
    var model = new Model(dados);

    model.save(function (err, data) {
      cb(err, data, res);
    });
  },
  retrieve: function (req, res, cb, view) {
    Model.find({}, function (err, data) {
      cb(err, data, res, view);
    });
  },
  show: function (req, res, cb) {
    var query = {_id: req.params.id};

    Model.findOne(query, function (err, data) {
      cb(err, data, res);
    });
  },
  update: function (req, res, cb) {
    var query = {_id: req.params.id};
    var mod = req.body;

    // removendo o _id para poder alterar o objeto
    delete mod._id;

    Model.update(query, mod, function (err, data) {
      cb(err, data, res);
    });
  },
  del: function (req, res, cb) {
    var query = {_id: req.params.id};

    Model.remove(query, function(err, data) {
      cb(err, data, res);
    });
  },
  addProduct: function (req, res, cbAsync) {
    var query = {_id: req.params.id};
    var product = req.body;
    var mod = {$push: {"orders.products": product}};

    async.series([
      function(callback) {
        console.log('serie 1');
        Model.update(query, mod, function(err, data) {
          cbAsync(err, data, res, callback);
        });
      },
      function(callback) {
        console.log('serie 2');
        var query = {_id: product.product};
        var mod = {$inc: {stock: -product.quantity}};

        ProductModel.update(query, mod, function(err, data) {
          cbAsync(err, data, res, callback);
        });
      }
    ]);
  }
};
