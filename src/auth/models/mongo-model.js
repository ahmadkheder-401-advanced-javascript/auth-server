'use strict';

class Model {
    
  constructor(schema) {
    this.schema = schema;
  }
  // crud operations
  create(record) {
    let newRecord = new this.schema(record);
    return newRecord.save();
  }
  get(record) {
    if (typeof record === 'object'){
      return this.schema.find(record);
    }  else{
      return this.schema.find({});
    }
  }

  update(_id, record) {
    return this.schema.findByIdAndUpdate(_id, record);
  }

  delete(_id) {
    return this.schema.findByIdAndDelete(_id);
  }
}

module.exports = Model;
