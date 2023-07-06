import React, { Fragment, useEffect, useState } from "react";
import { Form, FormGroup, Label, Input, Button, Container } from "reactstrap";
import axios from "axios";
import base_url from "../../api/bootapi";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { authHeader } from "../../App";
import { updatePlanService } from "../../service/planService";

const UpdatePlan = () => {
  const location = useLocation();
  const { planId } = location.state;
  useEffect(() => {
    document.title = "Add Plans";
  }, []);

  const [plan, setPlan] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "My Profile";
    axios
      .get(`${base_url}/workoutplan/get/${planId}`, authHeader)
      .then((res) => {
        console.log(res.data);
        setPlan(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // const [customertrackrecord, setCustomerTrackRecord] = useState({});

  //Form Handler Function
  const updateDataOnServer = (data) => {
      updatePlanService(planId,data)
      .then((res) => {
        console.log(res.data);
        toast.success("Profile Updated Successfully");
        navigate("/trainer/view-plan-trainer");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleForm = (e) => {
    console.log(plan);
    updateDataOnServer(plan);
    e.preventDefault();
  };

  return (
    <Fragment>
      <h1 className="text-center my-3">Update Plan Details</h1>
      <Form onSubmit={handleForm}>
        <FormGroup>
          <Label for="planName">Plan Name <span className="asterisk">*</span></Label>
          <Input
            type="text"
            placeholder="Enter Name here"
            name="plannName"
            id="plannName"
            value={plan.planName}
            onChange={(e) => {
              setPlan({ ...plan, planName: e.target.value });
            }}
            required
          ></Input>
        </FormGroup>

        <FormGroup>
          <Label for="planDescription">Plan Description <span className="asterisk">*</span></Label>
          <Input
            type="text"
            placeholder="Enter Plan Description here"
            name="planDescription"
            id="planDescription"
            value={plan.planDescription}
            onChange={(e) => {
              setPlan({ ...plan, planDescription: e.target.value });
            }}
            required
          ></Input>
        </FormGroup>

        <FormGroup>
          <Label for="planLevel">Choose Plan Level <span className="asterisk">*</span></Label>
          <br />
          <select
            name="levels"
            id="levels"
            onChange={(e) => {
              setPlan({ ...plan, planLevel: e.target.value });
            }}
            style={{
              width: "200px",
              height: "35px",
              borderRadius: "6px",
              borderInlineColor: "lightgray",
            }}
            required
          >
            <option value="">Choose level..</option>
            <option
              value="Beginner"
              selected={plan.planLevel === "Beginner" ? "selected" : ""}
            >
              Beginner
            </option>
            <option
              value="Intermediate"
              selected={plan.planLevel === "Intermediate" ? "selected" : ""}
            >
              Intermediate
            </option>
            <option
              value="Advanced"
              selected={plan.planLevel === "Advanced" ? "selected" : ""}
            >
              Advanced
            </option>
          </select>
        </FormGroup>

        <Container type="submit" className="text-center">
          <Button color="success">Update Plan</Button>&nbsp;
          <Button
            type="reset"
            color="warning ml-2"
            onClick={() => {
              setPlan({ planName: "", planLevel: "", planDescription: "" });
            }}
          >
            Clear
          </Button>
          &nbsp;
          <Button
            onClick={() => {
              navigate("/trainer/view-plan-trainer");
            }}
          >
            Back
          </Button>
        </Container>
      </Form>
    </Fragment>
  );
};

export default UpdatePlan;
