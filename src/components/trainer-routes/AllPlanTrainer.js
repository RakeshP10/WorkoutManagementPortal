import React, { useState, useEffect, useRef } from "react";
import AllPlans from "./AllPlans";
import base_url from "../../api/bootapi";
import axios from "axios";
import { toast } from "react-toastify";
import { authHeader } from "../../App";
import Modal from "react-bootstrap/Modal";
import { Form, FormGroup, Label, Input, Container, Button } from "reactstrap";
import { addPlanService } from "../../service/planService";

const AllPlanTrainer = () => {

  const [show, setShow] = useState(false);

  useEffect(() => {
    document.title = "Plans";
  }, []);

  const handleClose = () => {
    setShow(false);
  };

  const handleSave = () => {
    setShow(false);
    handleForm();
  };

  const handleShow = () => setShow(true);

  const [plan, setPlan] = useState({});
  //Form Handler Function
  const handleForm = (e) => {
    console.log(plan);
    postDatatoServer(plan);
    e.preventDefault();
  };

  const postDatatoServer = async (data) => {

    addPlanService(data)
    .then(
      (response) => {
        toast.success("Plan Added Successfully");
      },
      (error) => {
        console.log(error);
        toast.error("Something went wrong");
      }
    );
  };

  return (
    <Container>
      <Button
        onClick={handleShow}
        color="success"
        className="mt-5"
        style={{ float: "right", marginRight: "10%" }}
      >
        Add Plan
      </Button>
      <AllPlans />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Plan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleForm}>
            <FormGroup>
              <Label for="planName">Plan Name <span className="asterisk">*</span></Label>
              <Input
                type="text"
                placeholder="Enter Name here"
                name="plannName"
                id="plannName"
                onChange={(e) => {
                  setPlan({ ...plan, planName: e.target.value });
                }}
                pattern="/^[a-zA-Z ]*$/"
                title="Only alphabets allowed"
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
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button color="warning" variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button color="success" variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AllPlanTrainer;
