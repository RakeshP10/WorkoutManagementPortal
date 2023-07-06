import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  Container,
} from "reactstrap";
import base_url from "../../api/bootapi";
import { authHeader } from "../../App";
import DeleteIcon from "@mui/icons-material/Delete";
import { deletePlanService } from "../../service/planService";

const Plan = ({ plan, update }) => {
  const navigate = useNavigate();

  const deletePlan = (planId) => {
    deletePlanService(planId)
    .then(
      (response) => {
        toast.success("Plan Deleted");
        navigate("/trainer/view-plan-trainer");
        update(planId);
      },
      (error) => {
        toast.error("Plan not deleted || Server Problem");
      }
    );
  };

  const submit = (e) => {
    e.stopPropagation();
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to delete the plan.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            deletePlan(plan.planId);
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const navigateToUpdatePlan = (e) => {
    e.stopPropagation();
    navigate("/trainer/update-workout-plan", {
      state: { planId: plan.planId },
    });
  };

  const navigateExercise = () => {
    navigate("/trainer/view-exercise-trainer", {
      state: { planId: plan.planId },
    });
  };

  return (
    <div className="col-lg-4 col-md-6 d-flex align-items-stretch" id="plancard">
      <Card
        className="text-center"
        onClick={navigateExercise}
        style={{ cursor: "pointer", width: "18rem" }}
      >
        <CardBody className="icon-box">
          <div className="icon">
            <i className="fa-solid fa-dumbbell"></i>
          </div>
          <CardTitle className="font-weight-bold">
            <h5 className="text-uppercase">{plan.planName}</h5>
          </CardTitle>
          <CardText>
            <h6>{plan.planDescription}</h6>
            <h6>{plan.planLevel}</h6> 
          </CardText>
          <br/>
          <br></br>
          <br></br>
          <Container className="text-center" >
            <Button color="warning ml-3" onClick={navigateToUpdatePlan}>
              <i class="fas fa-edit" style={{fontSize:"18px",color:""}}></i>
            </Button>&nbsp; &emsp;
            <Button color="danger" onClick={submit} style={{ height: "10%" }}>
              <DeleteIcon style={{fontSize:"20px"}} />
            </Button>
          </Container>
        </CardBody>
      </Card>
    </div>
  );
};
export default Plan;
