import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { Button } from "reactstrap";
import { authHeader } from "../../App";
import { useNavigate } from "react-router-dom";

const PlanCards = ({ plans }) => {
  const navigate = useNavigate();

  const navigateToExercise = () => {
    console.log({ plans });
    navigate("/user/exercise", { state: { plans: plans } });
  };

  return (
    <div className="col-lg-3 col-md-6 d-flex align-items-stretch" id="plancard">
      <Card
        style={{ width: "280px", height: "400px" }}
        onClick={navigateToExercise}
      >
        <Card.Body className="icon-box">
          <div className="icon">
            <i className="fa-solid fa-dumbbell"></i>
          </div>
          <Card.Title>
            <a onClick={navigateToExercise}>{plans.planName}</a>
          </Card.Title>
          <Card.Text style={{ margin: "0 10px 0 10px" }}>
            {/* Plan Level : {plans.planLevel} <br /> */}
            {plans.planDescription}
          </Card.Text>
          <br />
          <Button
            className=""
            color="dark mt-2"
            style={{ position: "absolute", bottom: "55px", left: "100px" }}
            onClick={navigateToExercise}
          >
            Exercises
          </Button>
          {/* <div className="mb-5 text-center exerciseButton">
          
        </div> */}
        </Card.Body>
      </Card>
    </div>
  );
};
export default PlanCards;
