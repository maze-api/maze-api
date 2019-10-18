const mongoose = require('mongoose');

const updateOptions = {
  new: true,
  lean: true
};


const updateById = schema => {
  schema.static('updateById', function(id, update) {
    return this.findByIdAndUpdate(id, update, updateOptions);
  });
};



const exists = schema => {
  schema.static('exists', function(query) {
    return this.find(query)
      .countDocuments()
      .then(count => count > 0);
  });
};

mongoose.plugin(updateById);
mongoose.plugin(exists);