import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Form, FormGroup, Label, Input, Button, Container } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../service/UserService";
const AddUser = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Add Users";
  }, []);

  const [user, setUser] = useState({});

  //Form Handler Function to post data on server
  const handleForm = (e) => {
    addUser(user).then(
      (response) => {
        toast.success("User Added Successfully");
      },
      (error) => {
        console.log(error);
        toast.error("Something went wrong");
      }
    );
    navigate("/trainer/view-users-trainer");
    window.location.reload();
    e.preventDefault();
  };

  return (
    <Fragment>
      <h1 className="text-center my-3">Fill Form Details</h1>
      <Form onSubmit={handleForm}>
        <FormGroup>
          <Label for="userName">User Name <span className="asterisk">*</span></Label>
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
          <Label for="email">User Email Id <span className="asterisk">*</span></Label>
          <Input
            type="email"
            placeholder="Enter Email Id here"
            name="email"
            id="email"
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
            required
          ></Input>
        </FormGroup>

        <FormGroup>
          <Label for="contactNumber">User Contact Number <span className="asterisk">*</span></Label>
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
          <Label for="age">User Age <span className="asterisk">*</span></Label>
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
          <Label for="weight">User Weight <span className="asterisk">*</span></Label>
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
            <Label for="gender">
              <Input
                type="radio"
                name="gender"
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
            <Label check for="gender">
              <Input
                type="radio"
                name="gender"
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
          <Label for="userPassword">User Password <span className="asterisk">*</span></Label>
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
          <Button color="success">Add User</Button>&nbsp;
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
    </Fragment>
  );
};

export default AddUser;
