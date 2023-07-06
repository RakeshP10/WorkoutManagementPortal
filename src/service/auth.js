import axios from "axios";

import base_url from "../api/bootapi";

export const loginService = async (loginDetail) => {
  return await axios.post(`${base_url}/auth/login`, loginDetail);
};

export const registerService = async (data) => {
  return await axios.post(`${base_url}/user/register`, data);
};
