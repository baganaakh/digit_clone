import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const register = (email, username, firstname, lastname, password) => {
  return axios.post(API_URL + "/auth/local/register", {
    email,
    username,
    firstname,
    lastname,
    password,
  }).then((response) => {
    console.debug(response)
    // if (response.data.jwt) {
    //   localStorage.setItem("user", JSON.stringify(response.data));
    // }

    return response.data;
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "/auth/local", {
      identifier: email,
      password,
    })
    .then((response) => {
      if (response.data.jwt) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};
