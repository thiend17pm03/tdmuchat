const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let tagSchema = new Schema({
  name : String,
  description : String,
  postAmount : {type:Number, default : 0},
  createdAt : {type: Number, default: Date.now},
  updatedAt : {type: Number, default: null},
  deletedAt : {type: Number, default: null}, 
});


tagSchema.statics = {
  createNew(item) {
    return this.create(item);
  },
  getAll() {
    return this.find({
    }).sort({"createdAt": -1}).exec();
  },
}




module.exports = mongoose.model("tag",tagSchema);
