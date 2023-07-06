import React, { useEffect, useState } from "react";
import NewUsersTable from "./NewUsersTable";
import axios from "axios";
import base_url from "../../api/bootapi";
import { authHeader } from "../../App";
import { toast } from "react-toastify";
import { exerciseList } from "../../service/ExerciseService";
import { userList } from "../../service/UserService";
import { getAllPlansService } from "../../service/planService";

const TrainerHome = () => {
  const styles = {
    position: "absolute",
    left: "35%",
    top: "-20px",
    borderRadius: "50%",
    fontSize: "35px",
  };

  const [userCount, setUserCount] = useState(20);
  const [planCount, setPlanCount] = useState(15);
  const [exerciseCount, setExerciseCount] = useState(40);

  useEffect(() => {
    userList().then(
      (response) => {
        setUserCount(response.data.totalElements);
      },
      (error) => {
        console.log(error);
        // toast.error("Something went wrong");
      }
    );

    getAllPlansCount();

    exerciseList()
      .then((res) => {
        setExerciseCount(res.data.length);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  });

  const getAllPlansCount = () => {
    getAllPlansService()
      .then((res) => {
        setPlanCount(res.data.length);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div>
      <div className="container" style={{ marginTop: "50px" }}>
        <div className="row" style={{ width: "80%" }}>
          <div className="col-md-4">
            <div className="card border-info mx-sm-1 p-2">
              <div
                className="card border-info shadow text-info p-3 my-card"
                style={styles}
              >
                <span className="fas fa-user-friends" aria-hidden="true"></span>
              </div>
              <div className="text-info text-center mt-5">
                <h4>Total Users</h4>
              </div>
              <div className="text-info text-center">
                <h1>{userCount}</h1>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-success mx-sm-1 p-2">
              <div
                className="card border-success shadow text-success p-3 my-card"
                style={styles}
              >
                <span className="fas fa-tasks" aria-hidden="true"></span>
              </div>
              <div className="text-success text-center mt-5">
                <h4>Total Plans</h4>
              </div>
              <div className="text-success text-center">
                <h1>{planCount}</h1>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-danger mx-sm-1 p-2">
              <div
                className="card border-danger shadow text-danger p-3 my-card"
                style={styles}
              >
                <span className="fas fa-dumbbell" aria-hidden="true"></span>
              </div>
              <div className="text-danger text-center mt-5">
                <h4>Total exercises</h4>
              </div>
              <div className="text-danger text-center">
                <h1>{exerciseCount}</h1>
              </div>
            </div>
          </div>
        </div>
        <NewUsersTable />
      </div>
    </div>
  );
};

export default TrainerHome;
