const usersErrorResponse = (errorMsg) => {
  return {
    error: errorMsg,
  };
};
const usersOkResponse = (successMsg, data) => {
  return {
    data,
    message: successMsg,
  };
};

module.exports = {
  usersErrorResponse,
  usersOkResponse,
};
