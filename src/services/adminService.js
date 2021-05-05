const userModel = require("./../models/userModel");
const _ = require("lodash");

let addNewAdmin = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      item = {
        role:"admin",
      }
      let user = userModel.updateUser(id, item);
  
      resolve(user);
    }
    catch(err) {
      reject(err);
    }
  });
};

let deleteAdmin = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      item = {
        role:"user",
      }
      let user = userModel.updateUser(id, item);
  
      resolve(user);
    }
    catch(err) {
      reject(err);
    }
  });
};


let getAllUser = ()=>{
  return new Promise(async (resolve, reject) => {
    let users = await userModel.getAllUser();
    resolve(users);
  });
}

let deleteUser = (id)=>{
  return new Promise(async (resolve, reject) => {
    try {
      let status = await userModel.deleteUser(id);
      //console.log(status);
      resolve(status);
    } catch (error) {
      
    }
  });

}

module.exports = {
  addNewAdmin : addNewAdmin,
  getAllUser : getAllUser,
  deleteAdmin : deleteAdmin,
  deleteUser : deleteUser,
}