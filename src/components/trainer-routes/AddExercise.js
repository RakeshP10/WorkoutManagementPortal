import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { Form, FormGroup, Label, Input, Button, Container } from "reactstrap";
import { addExerciseService } from "../../service/ExerciseService";

const AddExercise = () => {
  const location = useLocation();
  const { planId } = location.state;

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Add Exercise";
  }, []);

  const [exercise, setExercise] = useState({});

  //Form Handler Function
  const handleForm = (e) => {
    addExerciseService(planId, exercise).then(
      (response) => {
        console.log(response);
        console.log("Success");
        toast.success("Exercise Added Successfully");
      },
      (error) => {
        console.log(error);
        console.log("error");
        toast.error("Something went wrong");
      }
    );
    e.preventDefault();
    navigate("/trainer/view-exercise-trainer", { state: { planId: planId } });
    window.location.reload();
  };

  return (
    <Fragment>
      <h1 className="text-center my-3">Fill Exercise Details</h1>
      <Form onSubmit={handleForm}>
        <FormGroup>
          <Label for="name">Exercise Name<span className="asterisk">*</span></Label>
          <Input
            type="text"
            placeholder="Enter Name here"
            name="name"
            id="name"
            onChange={(e) => {
              setExercise({ ...exercise, name: e.target.value });
            }}
            required
          ></Input>
        </FormGroup>

        <FormGroup>
          <Label for="estimatedTime">Estimation Time <span className="asterisk">*</span></Label>
          <Input
            type="text"
            placeholder="Enter Estimation Time here"
            name="estimatedTime"
            id="estimatedTime"
            onChange={(e) => {
              setExercise({ ...exercise, estimatedTime: e.target.value });
            }}
            required
          ></Input>
        </FormGroup>

        <FormGroup>
          <Label for="sets">Exercise Sets <span className="asterisk">*</span></Label>
          <Input
            type="text"
            placeholder="Enter Exercise Sets here"
            name="sets"
            id="sets"
            onChange={(e) => {
              setExercise({ ...exercise, sets: e.target.value });
            }}
            pattern="^[1-5]$"
            title="Please enter valid single integer digit"
            required
          ></Input>
        </FormGroup>

        <FormGroup>
          <Label for="reps">Exercise Repetitions <span className="asterisk">*</span></Label>
          <Input
            type="text"
            placeholder="Enter Exercise Repetitions here"
            name="reps"
            id="reps"
            onChange={(e) => {
              setExercise({ ...exercise, reps: e.target.value });
            }}
            required
          ></Input>
        </FormGroup>

        <FormGroup>
          <Label for="description">Exercise Description <span className="asterisk">*</span></Label>
          <Input
            type="textarea"
            placeholder="Enter Exercise Description here"
            name="description"
            id="description"
            style={{ height: 150 }}
            onChange={(e) => {
              setExercise({ ...exercise, description: e.target.value });
            }}
            required
          ></Input>
        </FormGroup>

        <Container type="submit" className="text-center">
          <Button color="success">Add Exercise</Button>&nbsp;
          <Button
            type="reset"
            color="warning ml-2"
            onClick={() => {
              setExercise({ id: "", title: "", description: "" });
            }}
          >
            Clear
          </Button>
        </Container>
      </Form>
    </Fragment>
  );
};

export default AddExercise;
