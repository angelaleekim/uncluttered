const mongoose = require('mongoose');
const dotenv = require('dotenv');
const categorySchema = require('./categorySchema');
const userSchema = require('./userSchema');
const taskSchema = require('./task');
dotenv.config();

let dbConnection;
function getDbConnection() {
  if (!dbConnection) {
    dbConnection = mongoose.createConnection(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Initialize models
    // dbConnection.model('Category', categorySchema);
    // dbConnection.model('User', userSchema);
    // dbConnection.model('Task', taskSchema);
  }
  return dbConnection;
}

// Use getDbConnection to get the models
// const Category = getDbConnection().model('Category');
// const User = getDbConnection().model('User');
// const Task = getDbConnection().model('Task');

async function addCategory(userId, name, parentId = null, visible = true) {
  const CategoryModel = getDbConnection().model('Category', categorySchema);
  try {
    const category = new CategoryModel({ userId, name, parentId, visible });
    await category.save();
    const userModel = getDbConnection().model('User', require('./userSchema'));
    const user = await userModel.findById(userId);
    if (user) {
      user.categories.push(category._id);
      await user.save();
    }
    return category;
  } catch (error) {
    console.error('Error adding category:', error);
    return null;
  }
}

async function editCategory(categoryId, updates) {
  const CategoryModel = getDbConnection().model('Category', categorySchema);
  try {
    return await CategoryModel.findByIdAndUpdate(categoryId, updates, { new: true });
  } catch (error) {
    console.error('Error editing category:', error);
    return null;
  }
}

async function deleteCategory(categoryId) {
  const CategoryModel = getDbConnection().model('Category', categorySchema);
  try {
    return await CategoryModel.findByIdAndDelete(categoryId);
  } catch (error) {
    console.error('Error deleting category:', error);
    return null;
  }
}

async function getDescendantCategories(categoryId) {
  const CategoryModel = getDbConnection().model('Category', categorySchema);
  const fetchChildren = async (parentId) => {
    const children = await CategoryModel.find({ parentId });
    const allDescendants = [];

    for (const child of children) {
      allDescendants.push(child._id);
      const childDescendants = await fetchChildren(child._id);
      allDescendants.push(...childDescendants);
    }

    return allDescendants;
  };

  const descendants = await fetchChildren(categoryId);
  return [categoryId, ...descendants]; // Include the root category
}

async function getTasksForCategories(userId, categoryIds) {
  const taskModel = getDbConnection().model('Task', require('./task'));
  try {
    const tasks = await taskModel.find({
      userId,
      category: { $in: categoryIds },
      deleted: false
    }).populate('category');
    return tasks;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
}

async function getVisibleCategories(userId) {
  const CategoryModel = getDbConnection().model('Category', categorySchema);
  try {
    return await CategoryModel.find({ userId, visible: true });
  } catch (error) {
    console.error('Error fetching visible categories:', error);
    return [];
  }
}

module.exports = {
  addCategory,
  editCategory,
  deleteCategory,
  getDescendantCategories,
  getTasksForCategories,
  getVisibleCategories
};
