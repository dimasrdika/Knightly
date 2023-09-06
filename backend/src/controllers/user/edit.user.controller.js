const ErrorUserInput = require("../../utils/helper/erorr.helper");
const {
  usersOkResponse,
  usersErrorResponse,
} = require("../../utils/helper/response.helper");
const UserModel = require("../../model/user.models.js");
const userModel = new UserModel();

const editUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const body = req.body;

    if (!body.name && !body.email && !body.part_of) {
      throw new ErrorUserInput("No fields to update");
    }

    const updatedUser = await userModel.update(userId, body);

    if (!updatedUser) {
      throw new ErrorUserInput("User not found");
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
