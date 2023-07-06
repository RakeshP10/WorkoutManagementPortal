import React, { useState, useEffect } from "react";
import { Form, FormGroup, Label, Input, Button, Container } from "reactstrap";
import base_url from "../api/bootapi";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { registerService } from "../service/authService";

const Signup = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Add Users";
  }, []);

  const [user, setUser] = useState({});

  //Form Handler Function
  const handleForm = (e) => {
    console.log(user);
    postDatatoServer(user);
    e.preventDefault();
  };

  //Creating function to post data on server
  const postDatatoServer = (data) => {
    registerService(data)
    .then((response) => {
        // console.log(response);
        console.log("Success");
        toast.success("User Added Successfully");
        navigate("/");
      },
      (error) => {
        console.log(error);
        console.log("error");
        toast.error("Something went wrong");
      }
    );
  };

  return (
    <div className="h-80 bg-light">
      <div className="container">
        <div
          className="row d-flex justify-content-center align-items-center h-100"
          style={{ height: "150px" }}
        >
          <div className="col">
            <div className="card card-registration my-4">
              <div className="row g-0">
                <div className="col-xl-6 d-none d-xl-block">
                  <img
                    src="/img/fitness.png"
                    alt="Sample photo"
                    className="img-fluid"
                  />
                </div>
                <div className="col-xl-6">
                  <div className="card-body p-md-5 text-black">
                    {/* <h1 className="text-center my-3">Fill Form Details</h1> */}
                    <Form onSubmit={handleForm}>
                      <FormGroup>
                        <Label for="userName">Name <span className="asterisk">*</span></Label>
                        <Input
                          type="text"
                          placeholder="Enter Name here"
                          name="usernName"
                          id="usernName"
                          onChange={(e) => {
                            setUser({ ...user, userName: e.target.value });
                          }}
                          pattern="[a-zA-Z]+ [a-zA-Z]+"
                          title="Enter Full Name (First Name + Last Name)"
                          required
                        ></Input>
                      </FormGroup>

                      <FormGroup>
                        <Label for="email">Email Id <span className="asterisk">*</span></Label>
                        <Input
                          type="email"
                          placeholder="Enter Email Id here"
                          name="email"
                          id="email"
                          onChange={(e) => {
                            setUser({ ...user, email: e.target.value });
                          }}
                          // patter="/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/"
                          required
                        ></Input>
                      </FormGroup>

                      <FormGroup>
                        <Label for="contactNumber">Contact Number <span className="asterisk">*</span></Label>
                        <Input
                          type="text"
                          placeholder="Enter Contact Number here"
                          name="contactNumber"
                          id="contactNumber"
                          onChange={(e) => {
                            setUser({ ...user, contactNumber: e.target.value });
                          }}
                          pattern="(7|8|9)\d{9}"
                          title="Enter a valid 10-digit no"
                          required
                        ></Input>
                      </FormGroup>

                      <FormGroup>
                        <Label for="age">Age <span className="asterisk">*</span></Label>
                        <Input
                          type="text"
                          placeholder="Enter Age here"
                          name="age"
                          id="age"
                          onChange={(e) => {
                            setUser({ ...user, age: e.target.value });
                          }}
                          pattern="^[1-9]$|^[1-9][0-9]$|^(100)$"
                          title="Enter valid age between 1-100"
                          required
                        ></Input>
                      </FormGroup>

                      <FormGroup>
                        <Label for="weight">Weight <span className="asterisk">*</span></Label>
                        <Input
                          type="text"
                          placeholder="Enter Weight here"
                          name="weight"
                          id="weight"
                          onChange={(e) => {
                            setUser({ ...user, weight: e.target.value });
                          }}
                          pattern="^[1-9]$|^[1-9][0-9]$|^(100)$|^[1-3][0-9][0-9]$|^(300)$"
                          title="Please enter valid integer digit(eg 1,300)"
                          required
                        ></Input>
                      </FormGroup>

                      <FormGroup tag="fieldset">
                        <Label>User Gender <span className="asterisk">*</span></Label>
                        <FormGroup check>
                          <Label for="male">
                            <Input
                              type="radio"
                              name="male"
                              id="male"
                              value="Male"
                              onChange={(e) => {
                                setUser({ ...user, gender: e.target.value });
                              }}
                            />
                            Male
                          </Label>
                        </FormGroup>

                        <FormGroup check>
                          <Label check for="female">
                            <Input
                              type="radio"
                              name="female"
                              id="female"
                              value="Female"
                              onChange={(e) => {
                                setUser({ ...user, gender: e.target.value });
                              }}
                            />
                            Female
                          </Label>
                        </FormGroup>
                      </FormGroup>

                      <FormGroup>
                        <Label for="userPassword">Password <span className="asterisk">*</span></Label>
                        <Input
                          type="password"
                          placeholder="Enter Password here"
                          name="userPassword"
                          id="userPassword"
                          onChange={(e) => {
                            setUser({ ...user, password: e.target.value });
                          }}
                          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$"
                          title="Password must contain atleast 1 uppercase,1 lowercase,1 number,1 symbol min 8 max 12 characters"
                          required
                        ></Input>
                      </FormGroup>

                      <Container type="submit" className="text-center">
                        <Button color="success">Signup</Button>&nbsp;
                        <Button
                          type="reset"
                          color="warning ml-2"
                          onClick={() => {
                            setUser({ id: "", title: "", description: "" });
                          }}
                        >
                          Clear
                        </Button>
                      </Container>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
