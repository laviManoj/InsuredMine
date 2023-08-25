const UserModel = require('../models/user');

const userController = {
  // Create a new user
  createUser: async (req, res) => {
    try {
      const userData = req.body;
      const newUser = await UserModel.create(userData);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: 'Error creating user' });
    }
  },

  // Get all users
  getUsers: async (req, res) => {
    try {
      const users = await UserModel.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching users' });
    }
  },

  // Update a user
//   updateUser: async (req, res) => {
//     try {
        
//       const userId = req.params.id;
//       console.log(userId,'kkkkkkkkkkkkkkkkkk')
//       const updatedUserData = req.body;
//       console.log(updatedUserData,'mmmmmmmmmmmmmmmmmmmmmmmmmm')
//       const updatedUser = await UserModel.findByIdAndUpdate(userId, updatedUserData, { new: true });
//       console.log(updatedUser,'nnnnnnnnnnnnnnnnnnnnnnnnn')
//       res.json(updatedUser);
//     } catch (error) {
//       res.status(500).json({ error: 'Error updating user' });
//     }
//   },
//Update a user
updateUser: async (req, res) => {
    try {
      const userId = req.params.id;
      const updatedUserData = req.body;
  console.log(userId,updatedUserData)
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Update user fields
      user.field1 = updatedUserData.field1;
      user.field2 = updatedUserData.field2;
      // Update other fields...
  
      const updatedUser = await user.save();
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: 'Error updating user' });
    }
  },
  

  // Delete a user
  deleteUser: async (req, res) => {
    try {
      const userId = req.params.id;
      const removedUser = await UserModel.findByIdAndRemove(userId);
      if (removedUser) {
        res.json({ message: 'User deleted successfully' });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error deleting user' });
    }
  }
};

module.exports = userController;
