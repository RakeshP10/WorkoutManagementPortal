import axios from "axios";

import base_url from "../api/bootapi";
import { authHeader } from "../App";

export const addUser = async (data) => {
  return await axios.post(`${base_url}/user/register`, data, authHeader);
};

export const getUsers = async (pageNumber, pageSize) => {
  return await axios.get(
    `${base_url}/user/list?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    authHeader
  );
};

export const deleteUser = async (userId) => {
  return await axios.delete(`${base_url}/user/delete/${userId}`, authHeader);
};

export const getUserTrackRecord = async (userId) => {
  return await axios.get(
    `${base_url}/trackRecord/${userId}/getAll`,
    authHeader
  );
};

export const searchUserByName = async (inputText) => {
  return await axios.get(`${base_url}/user/getByName/${inputText}`, authHeader);
};

export const getUserById = async (userId) => {
  axios.get(`${base_url}/user/get/${userId}`, authHeader);
};

export const userList = async () => {
  return await axios.get(`${base_url}/user/list`, authHeader);
};
