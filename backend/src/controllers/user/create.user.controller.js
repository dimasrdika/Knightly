const ErrorUserInput = require("../../utils/helper/erorr.helper");
const {
  usersOkResponse,
  usersErrorResponse,
} = require("../../utils/helper/response.helper");
const UserModel = require("../../model/user.models.js");

const createUser = async (req, res) => {
  try {
    const request = {
      name: "",
      email: "",
      part_of: "",
    };
    const body = req.body;
    if (!body.name) throw new ErrorUserInput("Name is required");
    if (!body.email) throw new ErrorUserInput("Email is required");
    if (!body.part_of) throw new ErrorUserInput("Part of is required");

    request.name = body.name;
    request.email = body.email;
    request.part_of = body.part_of;

    const userModel = new UserModel();

    // for cek my code run or not haha
    console.log(body);
    const newUser = await userModel.save(request);
    // for cek my code run or not haha
    console.log(newUser);
    return res
      .status(200)
      .send(usersOkResponse("success create new user", newUser));
  } catch (e) {
    console.log(e);
    return res.status(e.code || 400).json(usersErrorResponse(e.message));
  }
};

module.exports = createUser;
