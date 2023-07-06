import React, { useState, useEffect, useRef } from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { CardBody, NavItem } from "reactstrap";
import base_url from "../../api/bootapi";
import { useLocation, useNavigate } from "react-router-dom";
import { authHeader } from "../../App";

const UserExercise = () => {

  const navigate = useNavigate();

  const [exercises, setExercises] = useState([]);
  const shouldLog = useRef(true);
  const location = useLocation();
  const { plans } = location.state;

  const getAllExercisesByPlanId = () => {
    console.log(plans);
    axios
      .get(`${base_url}/exercise/getAllExercise/${plans.planId}`, authHeader)
      .then((res) => {
        console.log(res.data);
        toast.success("Data has been loaded", {
          position: "bottom-center",
        });
        setExercises(res.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong.!!");
      });
  };

  useEffect(() => {
    if (shouldLog.current) {
      shouldLog.current = false;
      getAllExercisesByPlanId();
    }
  }, []);

  return (

    <div class="container">
      <Button className="btn-dark" style={{margin:"25px 0 5px 120px"}} 
          onClick={() =>navigate("/user/plans", { state: { level: plans.planLevel } })
      }>
      Back
      </Button>
    {exercises.length !== 0 ? (
        exercises.map((exercise, index) => (
    
    <div class="card exercisecard" style={{marginLeft:"120px"}}>
      <div class="row ">

        <div class="col-sm-7 text-center mt-4">
          <div class="card-block exercisecard-card">
            {/* <h3 class="card-title"> {exercise.name}</h3> */}
            <h4 class="card-title" style={{textAlign:"left",marginLeft:"65px"}}><span style={{color:"gray"}}>Exercise {index+1}:</span> <span className="text-uppercase">{exercise.name}</span></h4>
            <div className="card-body" style={{textAlign:"left", marginLeft:"75px"}}>    
                <h6 className="mb-3">Estimated Time : {exercise.estimatedTime}</h6>
                <h6 className="mb-3">No. of Sets : {exercise.sets}</h6>
                <h6 className="mb-3">No. of Repitions : {exercise.reps}</h6>
                <h6>Description : {exercise.description}</h6>
            </div>
          </div>
          &emsp;
        </div>

        <div class="col-sm-5">
          <img class="d-block w-100 eximg" src="../img/exercise.gif" alt=""></img>
        </div>
      </div>
    </div>
  
   ))
    ):" No exercises Available"}
   </div>
  )
}

export default UserExercise;
