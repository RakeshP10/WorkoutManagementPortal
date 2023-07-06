import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AllExercisesByPlan from "./AllExercisesByPlan";
import { useLocation } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import Exercise from "./Exercise";
import { Button, Container } from "reactstrap";
import { getExerciseByName } from "../../service/ExerciseService";

const AllExerciseTrainer = () => {
  const [isShown, setIsShown] = useState(false);
  const location = useLocation();
  const { planId } = location.state;
  const navigate = useNavigate();
  const [exercise, setExercise] = useState([]);

  useEffect(() => {}, [exercise]);

  const navigateAddExercise = () => {
    navigate("/trainer/add-exercise", { state: { planId: planId } });
  };

  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
    if (inputText === "") {
      setIsShown(false);
    }
  };

  const handleClick = (event) => {
    if (inputText === "") {
      setIsShown(false);
    } else {
      setIsShown(true);
      getExerciseByName(inputText).then(
        (response) => {
          setExercise(response.data);
        },
        (error) => {
          console.log(error);
          toast.error("Something went wrong");
        }
      );
    }
  };

  const updateExercises = (id) => {
    setExercise(exercise.filter((c) => c.id != id));
  };

  //Reset Search Box
  const handleClear = (e) => {
    setInputText("");
    setIsShown(false);
  };

  return (
    <Container className="mt-4">
      <div className="search" style={{ marginLeft: "10px" }}>
        <TextField
          id="outlined-basic"
          onChange={inputHandler}
          variant="outlined"
          label="Search"
          size="small"
          value={inputText}
        />
        &nbsp;
        <Button onClick={handleClick} color="primary">
          Search
        </Button>
        &nbsp;
        <Button onClick={handleClear} color="info">
          Clear
        </Button>
        <Button
          onClick={navigateAddExercise}
          color="success"
          className="float-right"
          style={{ float: "right", marginRight: "250px" }}
        >
          Add Exercise
        </Button>
      </div>

      <br />
      {isShown &&
        (exercise.length === 0 ? (
          "No Such Exercise"
        ) : (
          <Exercise
            key={exercise.id}
            exercise={exercise}
            update={updateExercises}
            planId={planId}
            index={exercise.id}
          />
        ))}
      {!isShown && <AllExercisesByPlan planId={planId} />}

      <div>
        <br />
      </div>
    </Container>
  );
};

export default AllExerciseTrainer;
