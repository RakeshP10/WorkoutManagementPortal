import "./App.css";

import AllUsers from "./components/trainer-routes/AllUsers";
import { toast, ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddUser from "./components/trainer-routes/AddUser";
import AddExercise from "./components/trainer-routes/AddExercise";
import AddUserTrackRecord from "./components/user-routes/AddUserTrackRecord";
import AllExercisesByPlan from "./components/trainer-routes/AllExercisesByPlan";
import AllUserTrackRecord from "./components/trainer-routes/AllUserTrackRecord";
import AllPlans from "./components/trainer-routes/AllPlans";
import AllExerciseTrainer from "./components/trainer-routes/AllExerciseTrainer";
import MyProfile from "./components/trainer-routes/TrainerProfile";
import UpdatePlan from "./components/trainer-routes/UpdatePlan";
import LoginComponent from "./components/LoginComponent";
import TrainerPrivateRoute from "./components/trainer-routes/TrainerPrivateRoute";
import UserRivateRoute from "./components/user-routes/UserPrivateRoute";
import CustomNavbar from "./components/CustomNavbar";
import Signup from "./components/Signup";
import TrainerHome from "./components/trainer-routes/TrainerHome";
import UserHome from "./components/user-routes/UserHome";
import GetAllPlan from "./components/user-routes/GetAllPlan";
import { getCurrentUserDetail, getToken } from "./auth";
import { useState, useEffect } from "react";
import UserExercise from "./components/user-routes/UserExercise";
import UpdateExercise from "./components/trainer-routes/UpdateExercise";
import AllPlanTrainer from "./components/trainer-routes/AllPlanTrainer";
import AllUserTrainer from "./components/trainer-routes/AllUserTrainer";
import UserProfile from "./components/user-routes/UserProfile";
import Footer from "./components/Footer";

const token = getToken();

export const authHeader = {
  headers: {
    Authorization: `Bearer ${token}`,
    "Access-Control-Allow-Origin": "*",
  },
};

function App() {
  const user = getCurrentUserDetail();

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    setCurrentUser(user);
  }, []);

  return (
    <Router>
      <ToastContainer autoClose={1500}/>
      <CustomNavbar login={currentUser} />

      <Routes>
        {/* Login/Signup ROutes */}
        <Route exact path="/" element={<LoginComponent />} />
        <Route path="/signup" element={<Signup />} />

        {/* Trainer routes */}
        <Route path="/trainer" element={<TrainerPrivateRoute />}>
          <Route path="home" element={<TrainerHome />} />
          <Route path="add-user" element={<AddUser />} />
          <Route path="view-users" element={<AllUsers />} />
          <Route path="add-exercise" element={<AddExercise />} />
          <Route path="my-profile" element={<MyProfile />} />
          <Route path="update-workout-plan" element={<UpdatePlan />} />
          <Route path="view-track-record" element={<AllUserTrackRecord />} />
          <Route path="view-exercises" element={<AllExercisesByPlan />} />
          <Route path="view-workout-plan" element={<AllPlans />} />
          <Route
            path="view-exercise-trainer"
            element={<AllExerciseTrainer />}
          />

          <Route path="update-exercise" element={<UpdateExercise />} />
          <Route path="view-plan-trainer" element={<AllPlanTrainer />} />
          <Route path="view-users-trainer" element={<AllUserTrainer />} />
        </Route>

        <Route path="/user" element={<UserRivateRoute />}>
          <Route path="home" element={<UserHome />} />
          <Route path="add-track-record" element={<AddUserTrackRecord />} />
          <Route path="plans" element={<GetAllPlan />} />
          <Route path="add-track-record" element={<AddUserTrackRecord />} />
          <Route path="exercise" element={<UserExercise />} />
          <Route path="my-profile" element={<UserProfile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
