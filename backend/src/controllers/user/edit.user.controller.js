const ErrorUserInput = require("../utils/helper/erorr.helper");
const {
  usersOkResponse,
  usersErrorResponse,
} = require("../../utils/helper/response.helper");
const UserModel = require("../../model/user.models.js");

const editUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const body = req.body;

    if (
      !body.name &&
      !body.age &&
      !body.birth_date &&
      !body.gender &&
      !body.email &&
      !body.part_of
    ) {
      throw new ErrorUserInput("No fields to update");
    }

    const userModel = new UserModel();
    const updatedUser = await userModel.update(userId, body);

    if (!updatedUser) {
      throw new ErrorUserInput("User not found");
    }

    return res
      .status(200)
      .send(usersOkResponse("User updated successfully", updatedUser));
  } catch (e) {
    return res.status(e.code || 400).json(usersErrorResponse(e.message));
  }
};

module.exports = editUser;
