const express = require("express");
const router = express.Router();
const controllerUser = require("../controllers/user/index");

const prefixPath = "/api/v1/user";

//  how to test api
router.get(`${prefixPath}/ping`, (req, res) => res.send("pong"));
// how to get all user
router.get(`${prefixPath}/:id`, controllerUser.getAllUsers);
// how to add user
router.post(`${prefixPath}/add`, controllerUser.createUser);
// how to delete user
router.delete(`${prefixPath}/delete/:id`, controllerUser.deleteUser);
//  how to edit controller
router.patch(`${prefixPath}/edit/:id`, controllerUser.updateUser);
module.exports = router;
