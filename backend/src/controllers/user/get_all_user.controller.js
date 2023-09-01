const {
  usersOkResponse,
  usersErrorResponse,
} = require("../../utils/helper/response.helper");
const UserModel = require("../../model/user.models.js");

const getAllUsers = async (req, res) => {
  try {
    const { limit, page, search } = req.query;

    const filterOptions = {
      limit: limit ? Number(limit) : 10,
      page: page ? Number(page) : 1,
      search: search || "",
    };

    const userModel = new UserModel();
    const users = await userModel.find(filterOptions, {
      name: filterOptions.search,
    });

    return res
      .status(200)
      .json(usersOkResponse("Success: Get all users", users));
  } catch (e) {
    return res.status(e.code || 400).json(usersErrorResponse(e.message));
  }
};

module.exports = getAllUsers;
