import axios from "axios";
import base_url from "../api/bootapi";
import { authHeader } from "../App";

export const getAllPlansService = async() => {
    return await axios.get(`${base_url}/workoutplan/list`, authHeader);
}

export const addPlanService = async(data) => {
    return await axios.post(`${base_url}/workoutplan/register`, data, authHeader);
}

export const deletePlanService = async(planId) => {
    return await axios.delete(`${base_url}/workoutplan/delete/${planId}`, authHeader);
}

export const updatePlanService = async(planId,data) => {
    return await axios.put(`${base_url}/workoutplan/update/${planId}`, data, authHeader)
}

export const getAllPlansByLevelService = async(level) => {
    return await axios.get(`${base_url}/workoutplan/getPlanByLevel/${level}`, authHeader)
}