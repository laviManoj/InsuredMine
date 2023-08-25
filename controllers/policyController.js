const UserModel = require('../models/policy');

const userController = {
  // Create a new policy
  createPolicy: async (req, res) => {
    try {
      const userData = req.body;
      const newUser = await UserModel.create(userData);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: 'Error creating user' });
    }
  },

  // Get all policy
  getPolicy: async (req, res) => {
    try {
      const users = await UserModel.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching users' });
    }
  },


//Update a policy
updatePolicy: async (req, res) => {
    try {
      const userId = req.params.id;
      const updatedUserData = req.body;
  console.log(userId,updatedUserData)
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Update policy fields
      user.field1 = updatedUserData.field1;
      user.field2 = updatedUserData.field2;
      // Update other fields...
  
      const updatedUser = await user.save();
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: 'Error updating user' });
    }
  },
  

  // Delete a policy
  deletePolicy: async (req, res) => {
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
