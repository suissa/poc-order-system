// var fs = require('fs')
//   , inflection = require('inflection')
//   , mongoose = require('mongoose');
// // Lookup models directory
// fs.readdirSync(__dirname).forEach(function (file){
//   var filePath = __dirname + '/models/' + file;
//   console.log(filePath);
//   // Match all .js files but this
//   if (fs.statSync(filePath).isFile() && file != 'index.js' && /.*.js/.test(file)) {
//     // Inflect the model name
//     var modelName = inflection.camelize(file.replace('.js', '').replace('-', '_'));
//     // Load the model
//     var modelSchema = require(filePath)[modelName + 'Schema'];
//     if (typeof modelSchema != 'undefined') {
//       mongoose.model(modelName, modelSchema);
//       console.log('Loaded model "%s" from file "%s"', modelName, file);
//     }
//     else {
//       console.error('Schema for model "%s" not found in file "%s"', modelName, file);
//     }
//   };
// });

var MODELS_FOLDER = './models';
require('fs').readdirSync(MODELS_FOLDER).forEach(function(file) {
  // Remove index from models
  if(file !== 'index.js'){
    require('./'+file);
    console.log('Addd model: ', file);
  }
});

