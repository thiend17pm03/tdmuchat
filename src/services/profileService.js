const tagModel = require("./../models/tagModel");
const _ = require("lodash");

const LIMIT_NUMBER_TAKEN = 15;

let addNew = (tagName) => {
  return new Promise(async (resolve, reject) => {
    try {
      let newTagItem = {
        name: tagName,
      };
      let newTag = await tagModel.createNew(newTagItem);
  
      resolve(newTag);
    }
    catch(err) {
      reject(err);
    }
  });
};

getAll = ()=>{
  return new Promise(async (resolve, reject) => {
    let Tags = await tagModel.getAll();
    resolve(Tags);
  });
}

module.exports = {
  addNew : addNew,
  getAll : getAll,
}