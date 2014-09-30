var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: { type: String, default: '', required: true },
  email: { type: String, default: '', required: true },
  password: { type: String, default: '', required: true },
  address: {
    street: { type: String, default: '' },
    number: { type: String, default: '' },
    complement: { type: String, default: '' },
    district: { type: String, default: '' },
    city: { type: String, default: '' },
    state: { type: String, default: '' },
    country: { type: String, default: '' },
  },
  orders: [
    {
      products: [
        {
          product: { type: Schema.Types.ObjectId, ref: 'Product' },
          quantity: { type: Number, min: 1 }
        }
      ]
    }
  ]
});

module.exports = UserModel = mongoose.model('User', UserSchema);


