import React, { Fragment, useEffect, useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Container,
  Table,
} from "reactstrap";
import axios from "axios";
import base_url from "../../api/bootapi";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import { getCurrentUserDetail } from "../../auth";
import "../../css/style.css";
import { authHeader } from "../../App";
const UserProfile = () => {
  // const id = 1;
  const user = getCurrentUserDetail();
  const userId = user.userId;

  const [users, setUsers] = useState({});
  const [records, setRecords] = useState({});
  const [showRecord, setShowRecord] = useState(false);
  const navigate = useNavigate();

  //Form Handler Function
  const handleForm = (e) => {
    console.log(user);
    handleUpdate(user);
    e.preventDefault();
  };

  useEffect(() => {
    document.title = "My Profile";
    axios
      .get(`${base_url}/user/get/${userId}`, authHeader)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  //Form Handler Function
  const handleUpdate = (data, e) => {
    e.preventDefault();
    axios
      .put(`${base_url}/user/update/${userId}`, data, authHeader)
      .then((res) => {
        console.log(res.data);
        toast.success("Profile Updated Successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Form Handler Function
  const handleTrackRecord = (e) => {
    setShowRecord(true);
    e.preventDefault();
    axios
      .get(`${base_url}/trackRecord/${userId}/getAll`, authHeader)
      .then((res) => {
        console.log(res.data);
        setRecords(res.data);
        toast.success("Record loaded Successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="body">
      <Fragment>
        <h1 className="title text-center my-3">My Profile</h1>
        <Container>
          <Form
            onSubmit={handleUpdate}
            style={{ margin: "auto", width: "65%" }}
          >
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                placeholder="Enter Name here"
                name="name"
                id="name"
                value={user.userName}
                onChange={(e) => {
                  setUsers({ ...users, userName: e.target.value });
                }}
              ></Input>
            </FormGroup>

            <FormGroup>
              <Label for="contactNumber">Contact No.</Label>
              <Input
                type="text"
                placeholder="Enter Contact No"
                name="contactNumber"
                id="contactNumber"
                value={user.contactNumber}
                onChange={(e) => {
                  setUsers({ ...users, contactNumber: e.target.value });
                }}
              ></Input>
            </FormGroup>

            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="text"
                placeholder="Enter email"
                name="email"
                id="email"
                value={user.email}
                onChange={(e) => {
                  setUsers({ ...users, email: e.target.value });
                }}
              ></Input>
            </FormGroup>

            <FormGroup>
              <Label for="age">Age</Label>
              <Input
                type="text"
                placeholder="Enter age"
                name="age"
                id="age"
                value={user.age}
                onChange={(e) => {
                  setUsers({ ...users, age: e.target.value });
                }}
              ></Input>
            </FormGroup>

            <FormGroup tag="fieldset">
              <Label>Gender</Label>
              <FormGroup check>
                <Label for="gender">
                  <Input
                    type="radio"
                    name="gender"
                    id="male"
                    value="Male"
                    onChange={(e) => {
                      setUsers({ ...users, gender: e.target.value });
                    }}
                    checked={user.gender === "Male"}
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
                      setUsers({ ...users, gender: e.target.value });
                    }}
                    checked={user.gender === "Female"}
                  />
                  Female
                </Label>
              </FormGroup>
            </FormGroup>

            <FormGroup>
              <Label for="weight">Weight</Label>
              <Input
                type="text"
                placeholder="Enter weight"
                name="weight"
                id="weight"
                value={user.weight}
                onChange={(e) => {
                  setUsers({ ...users, weight: e.target.value });
                }}
                pattern="^[1-9]$|^[1-9][0-9]$|^(100)$|^[1-3][0-9][0-9]$|^(300)$"
                title="Please enter valid integer digit(eg 1,300)"
                required
              ></Input>
            </FormGroup>
            <Container type="submit" className="text-center">
              <Button color="primary" onClick={handleTrackRecord}>
                My Track Record
              </Button>
              &nbsp;
              <Button color="success" onClick={handleUpdate}>
                Update
              </Button>
              &nbsp;
            </Container>
          </Form>
        </Container>
        <br />
        <br />
        {showRecord && (
          <div>
            <Table
              hover
              className="table"
              striped
              style={{ width: "75%", margin: "auto" }}
            >
              <thead>
                <tr>
                  <th style={{ width: "10%" }}>Date</th>
                  <th>Workout Performed</th>
                  <th>No. of exercises performed</th>
                  <th>Sets per exercise performed</th>
                  <th>Repetitions per set</th>
                  <th>Weight Recorded</th>
                  <th style={{ width: "25%" }}>Comments</th>
                </tr>
              </thead>
              <tbody>
                {records.length > 0
                  ? records.map((item) => (
                      <tr key={item.trackId}>
                        <td>{item.submitDate}</td>
                        <td>{item.workoutPlan}</td>
                        <td>{item.noOfExercise}</td>
                        <td>{item.setPerExercise}</td>
                        <td>{item.repPerSet}</td>
                        <td>{item.weight}</td>
                        <td>{item.comments}</td>
                      </tr>
                    ))
                  : "No TrackRecords Available"}
              </tbody>
            </Table>
          </div>
        )}
      </Fragment>
      <br />
      <br />
    </div>
  );
};

export default UserProfile;
