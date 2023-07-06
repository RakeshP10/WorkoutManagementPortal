import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import Exercise from "./Exercise";
import { useLocation } from "react-router-dom";
import { allExercisesByPlan } from "../../service/ExerciseService";

const AllExercisesByPlan = () => {
  const [exercises, setExercises] = useState([]);
  const location = useLocation();
  const { planId } = location.state;

  useEffect(() => {
    document.title = "View Exercises";
    allExercisesByPlan(planId).then(
      (response) => {
        setExercises(response.data);
      },
      (error) => {
        console.log(error);
        toast.error("Something went wrong");
      }
    );
  }, []);

  const updateExercises = (id) => {
    setExercises(exercises.filter((c) => c.id != id));
  };

  return (
    <div>
      {exercises.length > 0
        ? exercises.map((item, index) => (
            <Exercise
              key={item.id}
              exercise={item}
              update={updateExercises}
              planId={planId}
              index={index}
            />
          ))
        : "No Exercises Available"}
    </div>
  );
};

export default AllExercisesByPlan;
