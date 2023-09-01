const UserModel = require("../model/user.models");
const userModel = new UserModel();

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ err: "internal server error" });
  }
};

const addUsers = async (req, res) => {
  try {
    const user = req.body;
    const newUser = await userModel.create(user);
    console.log(user);
    res.status(201).json({ newUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "internal server error" });
  }
};

const deleteUsers = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteUser = await userModel.delete(id);
    res.status(200).json({ deleteUser });
  } catch (err) {
    res.send(500).json({ err: "internal server error" });
  }
};

const editUsers = async (req, res) => {
  try {
    const id = req.params.id;
    const user = req.body;
    const editUser = await userModel.edit({ id, ...user });
    res.status(200).json({ editUser });
  } catch (err) {
    res.status(500).json({ err: "internal server error" });
  }
};

const updateUsers = async (req, res) => {
  try {
    const user = req.body;
    const updateUser = await userModel.updateUsers(user);
    res.status(200).json({ updateUser });
  } catch {
    res.status(500).json({ err: "internal server error" });
  }
};

const controllerUser = {
  getAllUsers,
  addUsers,
  deleteUsers,
  editUsers,
  updateUsers,
};

module.exports = controllerUser;
