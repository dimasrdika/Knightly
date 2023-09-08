const ErrorUserInput = require("../../utils/helper/erorr.helper");
const {
  usersOkResponse,
  usersErrorResponse,
} = require("../../utils/helper/response.helper");
const UserModel = require("../../model/user.models.js");

const getUserId = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) throw new ErrorUserInput("id is required");
    const userModel = new UserModel();
    const user = await userModel.findOne(id);
    console.log(user);

    return res
      .status(200)
      .json(usersOkResponse("success get user detail", user));
  } catch (e) {
    return res.status(e.code || 400).json(usersErrorResponse(e.message));
  }
};

module.exports = getUserId;
