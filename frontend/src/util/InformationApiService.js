import axiosInstance from "./axiosInstance";

function editPassword(param, success, fail) {
  axiosInstance
    .put(`${process.env.REACT_APP_BACKEND_URL}/buyer/pw`, JSON.stringify(param))
    .then(success)
    .catch(fail);
}

// eslint-disable-next-line import/prefer-default-export
export { editPassword };
