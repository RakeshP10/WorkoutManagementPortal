import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AllUsers from "./AllUsers";
import TextField from "@mui/material/TextField";
import base_url from "../../api/bootapi";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, Container, Table } from "reactstrap";
import { authHeader } from "../../App";
import { confirmAlert } from "react-confirm-alert";
import { deleteUser, searchUserByName } from "../../service/UserService";

const AllUserTrainer = () => {
  const [isShown, setIsShown] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [inputText, setInputText] = useState("");

  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
    if (inputText === "") {
      setIsShown(false);
    }
  };

  const handleClick = async () => {
    if (inputText === "") {
      setIsShown(false);
    } else {
      setIsShown(true);
      searchUserByName(inputText).then(
        (response) => {
          setUser(response.data);
        },
        (error) => {
          console.log(error);
          toast.error("Something went wrong");
        }
      );
    }
  };

  const handleViewTrackRecord = (userId) => {
    navigate("/trainer/view-track-record", { state: { userId: userId } });
  };

  //Reset Search Box
  const handleClear = (e) => {
    setInputText("");
    setIsShown(false);
  };

  const submit = (userId, e) => {
    e.stopPropagation();
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to delete the plan.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            deleteUser(userId).then(
              (response) => {
                toast.success("User Deleted");
                setUser(user.filter((c) => c.userId != userId));
              },
              (error) => {
                toast.error("User not deleted || Server Problem");
              }
            );
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <Container>
      <h1 className="text-center">All Users</h1>
      <div className="search">
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
          onClick={() => {
            navigate("/trainer/add-user");
          }}
          color="success"
          className="float-right"
          style={{ float: "right",marginRight:"15px" }}
        >
          Add User
        </Button>
      </div>
      <br />
      {isShown && (
        <div>
          {user.length === 0 ? (
            "No Such User"
          ) : (
            <Table hover>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Weight</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr key={user.userId}>
                  <td scope="row" key={user.userId}>
                    {user.userId}
                  </td>
                  <td>{user.userName}</td>
                  <td> {user.contactNumber}</td>
                  <td>{user.weight}</td>
                  <td>{user.age}</td>
                  <td> {user.gender}</td>
                  <td>
                    <Button
                      color="danger"
                      onClick={() => {
                        submit(user.userId);
                      }}
                    >
                      Delete
                    </Button>
                    &nbsp;
                    <Button
                      color="warning ml-3"
                      onClick={() => handleViewTrackRecord(user.userId)}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          )}
        </div>
      )}
      {!isShown && <AllUsers />}

      <div>
        <br />
        <Button
          onClick={() => {
            navigate("/");
          }}
          style={{ float: "right" }}
        >
          Back
        </Button>
      </div>
    </Container>
  );
};

export default AllUserTrainer;
