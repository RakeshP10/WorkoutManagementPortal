import React, { Fragment, useEffect, useState } from "react";
import { Form, FormGroup, Label, Input, Button, Container } from "reactstrap";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { getExercise, updateExercise } from "../../service/ExerciseService";
const UpdateExercise = () => {
  const location = useLocation();
  const { planId, exerciseId } = location.state;
  useEffect(() => {
    document.title = "Add Exercises";
  }, []);

  const [exercise, setExercise] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Update Exercise";
    getExercise(exerciseId)
      .then((res) => {
        setExercise(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //Form Handler Function
  const handleForm = (e) => {
    updateExercise(planId, exerciseId, exercise)
      .then((res) => {
        toast.success("Exercise Updated Successfully");
        navigate("/trainer/view-exercise-trainer", {
          state: { planId: planId },
        });
      })
      .catch((err) => {
        console.log(err);
      });

    e.preventDefault();
  };

  return (
    <Fragment>
      <h1 className="text-center my-3">Fill Exercise Details</h1>
      <Form onSubmit={handleForm}>
        <FormGroup>
          <Label for="name">Exercise Name <span className="asterisk">*</span></Label>
          <Input
            type="text"
            placeholder="Enter Name here"
            name="name"
            id="name"
            value={exercise.name}
            onChange={(e) => {
              setExercise({ ...exercise, name: e.target.value });
            }}
            required
          ></Input>
        </FormGroup>

        <FormGroup>
          <Label for="estimatedTime">Estimated Time <span className="asterisk">*</span></Label>
          <Input
            type="text"
            placeholder="Enter Estimation Time here"
            name="estimatedTime"
            id="estimatedTime"
            value={exercise.estimatedTime}
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
            value={exercise.sets}
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
            value={exercise.reps}
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
            value={exercise.description}
            style={{ height: 150 }}
            onChange={(e) => {
              setExercise({ ...exercise, description: e.target.value });
            }}
            required
          ></Input>
        </FormGroup>

        <Container className="text-center">
          <Button type="submit" color="success">
            Update Exercise
          </Button>
          &nbsp;
          <Button
            type="reset"
            color="warning ml-2"
            onClick={() => {
              setExercise({ id: "", title: "", description: "" });
            }}
          >
            Clear
          </Button>
          &nbsp;
          <Button
            onClick={() => {
              navigate("/trainer/view-exercise-trainer", {
                state: { planId: planId },
              });
            }}
          >
            Back
          </Button>
        </Container>
      </Form>
    </Fragment>
  );
};

export default UpdateExercise;
