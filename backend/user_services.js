const mongoose = require("mongoose");
const userSchema = require("./userSchema");
const dotenv = require("dotenv");
const taskSchema = require("./userSchema");
dotenv.config();

let dbConnection;

function getDbConnection() {
  console.log(process.env.MONGODB_URI);
  if (!dbConnection) {
    dbConnection = mongoose.createConnection(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  return dbConnection;
}

async function getUsers(name) {
  const userModel = getDbConnection().model("User", userSchema);
  let result;
  if (name === undefined) {
    result = await userModel.find();
  } else {
    result = await findUserByName(name);
  }
  return result;
}

async function getTasks(user) {
  const userModel = getDbConnection().model("Task", taskSchema);
  let result;
  if (user === undefined) {
    result = await userModel.find();
  } else {
    // result = await findUserByName(user);
    result = await userModel({ user });
  }
  return result;
}

async function findUserByUsername(username) {
  const userModel = getDbConnection().model("User", UserSchema);       
  return await userModel.find({ username: username });
}

async function findAndEditUser(user, update){
  //find a user with the given username and edit their settings
  const userModel = getDbConnection().model("User", UserSchema);
  return await userModel.findOneAndUpdate(user, update); 
}

async function addUser(user){
  // userModel is a Model, a subclass of mongoose.Model
  const userModel = getDbConnection().model("User", UserSchema);
  try{
      // You can use a Model to create new documents using 'new' and 
      // passing the JSON content of the Document:
      const userToAdd = new userModel(user);
      const savedUser = await userToAdd.save()
      return savedUser;
  }catch(error) {
      console.log(error);
      return false;
  }   
}

async function findUserById(id){
  const userModel = getDbConnection().model("User", UserSchema);    
  try{
      return await userModel.findById(id);
  }catch(error) {
      console.log(error);
      return undefined;
  }
}

async function findAndDelete(id){
  const userModel = getDbConnection().model("User", UserSchema);    
  try{
      return await userModel.findByIdAndDelete(id);
  }catch(error) {
      console.log(error);
      return undefined;
  }
}

async function findUserByName(name) {
  const userModel = getDbConnection().model("User", UserSchema);
  return await userModel.find({ name: name });
}

module.exports = {
  addUser,
  getUsers,
  findUserByName,
  findUserById,
  findAndDelete,
  findAndEditUser,
  findUserByUsername,
};
