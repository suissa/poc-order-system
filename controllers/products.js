var Model = ProductModel;
var  msg = '';

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
  getByCategory: function (req, res, cb) {
    var category = req.params.category;
    var query = {category: new RegExp(category, 'gi')};

    Model.find(query, function (err, data) {
      cb(err, data, res);
    });
  },
  getByTag: function (req, res, cb) {
    var tag = req.params.tag;
    var query = {tags: {$in: [new RegExp(tag, 'gi')]} };

    Model.find(query, function (err, data) {
      cb(err, data, res);
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
};
