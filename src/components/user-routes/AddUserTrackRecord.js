import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Form, FormGroup, Label, Input, Button, Container } from "reactstrap";
import base_url from "../../api/bootapi";
import { authHeader } from "../../App";
import { getCurrentUserDetail } from "../../auth";
import { useNavigate } from "react-router-dom";

const AddUserTrackRecord = () => {
  const user = getCurrentUserDetail();
  const userId = user.userId;
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Add UserTrackRecord";
  }, []);

  const [usertrackrecord, setUserTrackRecord] = useState({});

  //Form Handler Function
  const handleForm = (e) => {
    console.log(usertrackrecord);
    postDatatoServer(usertrackrecord);
    navigate("/user/home");
    e.preventDefault();
  };

  //Creating function to post data on server
  const postDatatoServer = (data) => {
    axios
      .post(`${base_url}/trackRecord/${userId}/register`, data, authHeader)
      .then(
        (response) => {
          console.log(response);
          console.log("Success");
          toast.success("UserTrackRecord Added Successfully");
        },
        (error) => {
          console.log(error);
          console.log("error");
          toast.error("Something went wrong");
        }
      );
  };
  return (
    <Fragment>
      <Container>
        <h1 className="text-center my-3 ">Update TrackRecord Form</h1>

        <Form
          onSubmit={handleForm}
          style={{
            margin: "auto",
            width: "50%",
            backgroundColor: "white",
          }}
        >
          <FormGroup>
            <Label for="workoutPlan">Workout Plan Performed <span className="asterisk">*</span></Label>
            <Input
              type="text"
              placeholder="Enter Workout Plan Performed here"
              name="workoutPlan"
              id="workoutPlan"
              onChange={(e) => {
                setUserTrackRecord({
                  ...usertrackrecord,
                  workoutPlan: e.target.value,
                });
              }}
              required
            ></Input>
          </FormGroup>

          <FormGroup>
            <Label for="weight">Weight Recorded <span className="asterisk">*</span></Label>
            <Input
              type="text"
              placeholder="Enter Weight here"
              name="weight"
              id="weight"
              onChange={(e) => {
                setUserTrackRecord({
                  ...usertrackrecord,
                  weight: e.target.value,
                });
              }}
              pattern="^[1-9]$|^[1-9][0-9]$|^(100)$|^[1-3][0-9][0-9]$|^(300)$"
              title="Please enter valid integer digit(eg 1,300)"
              required
            ></Input>
          </FormGroup>

          <FormGroup>
            <Label for="noOfExercise">Number of Exercises <span className="asterisk">*</span></Label>
            <Input
              type="text"
              placeholder="Enter no of exercises performed"
              name="noOfExercise"
              id="noOfExercise"
              onChange={(e) => {
                setUserTrackRecord({
                  ...usertrackrecord,
                  noOfExercise: e.target.value,
                });
              }}
              pattern="^[1-9]$"
              title="Please enter valid single integer digit"
              required
            ></Input>
          </FormGroup>

          <FormGroup>
            <Label for="setPerExercise">Sets Per Exercise <span className="asterisk">*</span></Label>
            <Input
              type="text"
              placeholder="Enter sets per exercise performed"
              name="setPerExercise"
              id="setPerExercise"
              onChange={(e) => {
                setUserTrackRecord({
                  ...usertrackrecord,
                  setPerExercise: e.target.value,
                });
              }}
              pattern="^[1-5]$"
              title="Please enter valid single integer digit"
              required
            ></Input>
          </FormGroup>

          <FormGroup>
            <Label for="repPerSet">Repetitions Per Set <span className="asterisk">*</span></Label>
            <Input
              type="text"
              placeholder="Enter repetitions per set performed"
              name="repPerSet"
              id="repPerSet"
              onChange={(e) => {
                setUserTrackRecord({
                  ...usertrackrecord,
                  repPerSet: e.target.value,
                });
              }}
              required
            ></Input>
          </FormGroup>

          <FormGroup>
            <Label for="comments">Feedback <span className="asterisk">*</span></Label>
            <Input
              type="textarea"
              placeholder="Enter Comments here"
              name="comments"
              id="comments"
              onChange={(e) => {
                setUserTrackRecord({
                  ...usertrackrecord,
                  comments: e.target.value,
                });
              }}
              required
            ></Input>
          </FormGroup>

          <Container type="submit" className="text-center">
            <Button color="success mt-2">Add Record</Button>&nbsp;
            <Button
              type="reset"
              color="secondary ml-2 mt-2"
              onClick={() => {
                setUserTrackRecord({
                  trackId: "",
                  workoutPlan: "",
                  weight: "",
                  noOfExercise: "",
                  setPerExercise: "",
                  repPerSet: "",
                  comments: "",
                });
              }}
            >
              Clear
            </Button>
          </Container>
        </Form>
        <br />
        <br />
      </Container>
    </Fragment>
  );
};

export default AddUserTrackRecord;
