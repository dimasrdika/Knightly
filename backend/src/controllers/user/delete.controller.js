const ErrorUserInput = require("../../utils/helper/erorr.helper");
const {
  usersOkResponse,
  usersErrorResponse,
} = require("../../utils/helper/response.helper");
const UserModel = require("../../model/user.models.js");

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) throw new ErrorUserInput("Please provide a valid id");
    const userModel = new UserModel();

    // Find user
    const findUser = await userModel.findById(id);
    if (!findUser) throw new ErrorUserInput("User not found");

    // Delete user
    await userModel.delete(id);
    return res.status(200).json(usersOkResponse("User deleted successfully"));
  } catch (e) {
    return res.status(e.code || 400).json(usersErrorResponse(e.message));
  }
};

module.exports = deleteUser;
