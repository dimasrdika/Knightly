const ErrorUserInput = require("../../utils/helper/erorr.helper");
const {
  usersOkResponse,
  usersErrorResponse,
} = require("../../utils/helper/response.helper");
const UserModel = require("../../model/user.models.js");
const userModel = new UserModel();

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    // Find user
    const findUser = await userModel.findOne(id);
    if (!findUser) throw new ErrorUserInput("User not found");

    // Delete user
    await userModel.delete(id);
    return res.status(200).json(usersOkResponse("User deleted successfully"));
  } catch (e) {
    console.log(e);
    return res.status(e.code).json(usersErrorResponse(e.message));
  }
};

module.exports = deleteUser;
