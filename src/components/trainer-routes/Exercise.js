import React from "react";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "reactstrap";
import { confirmAlert } from "react-confirm-alert";
import DeleteIcon from "@mui/icons-material/Delete";
import "../../css/ExerciseCard.css";
import { deleteExercise } from "../../service/ExerciseService";

const Exercise = ({ exercise, update, planId, index }) => {
  const navigate = useNavigate();

  const onDelete = (e) => {
    e.stopPropagation();
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to delete the plan.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            deleteExercise(exercise.id).then(
              (response) => {
                toast.success("Exercise Deleted");
                update(exercise.id);
              },
              (error) => {
                toast.error("Exercise not deleted || Server Problem");
              }
            );
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const navigateToUpdateExercise = (e) => {
    console.log(planId);
    console.log(exercise.id);
    navigate("/trainer/update-exercise", {
      state: { planId: planId, exerciseId: exercise.id },
    });
  };

  return (
    <div class="container">
      <div class="card float-left exercisecard">
        <div class="row ">
          <div class="col-sm-7 text-center mt-3">
            <div class="card-block exercisecard-card">
              <h4
                class="card-title"
                style={{ textAlign: "left", marginLeft: "15px" }}
              >
                <span style={{ color: "gray" }}>Exercise {index + 1}:</span>{" "}
                <span className="text-uppercase">{exercise.name}</span>
              </h4>
              <div
                className="card-body"
                style={{ textAlign: "left", marginLeft: "15px" }}
              >
                <h6 className="mb-3">
                  Estimated Time : {exercise.estimatedTime}
                </h6>
                <h6 className="mb-3">No. of Sets :{exercise.sets}</h6>
                <h6 className="mb-3">No. of Repitions :{exercise.reps}</h6>
                <h6>Description :{exercise.description}</h6>
              </div>
              &emsp;
              <Button
                color="warning ml-3"
                onClick={() => {
                  navigateToUpdateExercise(exercise.id);
                }}
              >
                <i
                  class="fas fa-edit"
                  style={{ fontSize: "18px", color: "" }}
                ></i>
              </Button>
              &emsp;
              <Button color="danger" onClick={onDelete}>
                <DeleteIcon style={{ fontSize: "20px" }} />
              </Button>
            </div>
          </div>

          <div class="col-sm-5">
            <img
              class="d-block w-100 eximg"
              src="../img/exercise.gif"
              alt=""
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Exercise;
