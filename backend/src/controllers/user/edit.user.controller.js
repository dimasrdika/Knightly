const { ErrorServer } = require("../../utils/helper/erorr.helper");
const {
  usersOkResponse,
  usersErrorResponse,
} = require("../../utils/helper/response.helper");
const UserModel = require("../../model/user.models.js");
const userModel = new UserModel();

const editUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, part_of } = req.body;

    if (!body.name && !body.email && !body.part_of) {
      throw new ErrorServer("No fields to update");
      // return {
      //   status: 400,
      //   message: "No fields to update",
      // };
    }

    const updatedUser = await userModel.edit(userId, name, email, part_of);

    if (!updatedUser) {
      throw new ErrorServer("User not found");
      // return {
      //   status: 404,
      //   message: "User not found",
      // };
    }

    return res.editUser
      .status(200)
      .send(usersOkResponse("User updated successfully", updatedUser));
  } catch (e) {
    console.log(e);
    return res.status(e.code || 400).json(usersErrorResponse(e.message));
  }
};

module.exports = editUser;
