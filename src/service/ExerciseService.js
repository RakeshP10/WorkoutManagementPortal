import axios from "axios";

import base_url from "../api/bootapi";
import { authHeader } from "../App";

export const addExerciseService = async (planId, data) => {
  return await axios.post(
    `${base_url}/exercise/${planId}/register`,
    data,
    authHeader
  );
};

export const allExercisesByPlan = async (planId) => {
  return await axios.get(
    `${base_url}/exercise/getAllExercise/${planId}`,
    authHeader
  );
};

export const getExercise = async (exerciseId) => {
  return await axios.get(`${base_url}/exercise/get/${exerciseId}`, authHeader);
};

export const getExerciseByName = async (inputText) => {
  return await axios.get(
    `${base_url}/exercise/getByName/${inputText}`,
    authHeader
  );
};

export const deleteExercise = async (id) => {
  return await axios.delete(`${base_url}/exercise/delete/${id}`, authHeader);
};

export const updateExercise = async (planId, exerciseId, data) => {
  return await axios.put(
    `${base_url}/exercise/${planId}/update/${exerciseId}`,
    data,
    authHeader
  );
};

export const exerciseList = async () => {
  return await axios.get(`${base_url}/exercise/list`, authHeader);
};
