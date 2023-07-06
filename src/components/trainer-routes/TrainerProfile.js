import React, { Fragment, useEffect, useState } from "react";
import { Form, FormGroup, Label, Input, Container } from "reactstrap";
import axios from "axios";
import base_url from "../../api/bootapi";
import { toast } from "react-toastify";
import { getCurrentUserDetail } from "../../auth";
import { authHeader } from "../../App";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const MyProfile = () => {
  const user = getCurrentUserDetail();
  const userId = user.userId;

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [modal, setModal] = useState(false);

  useEffect(() => {
    document.title = "My Profile";
    axios
      .get(`${base_url}/user/get/${userId}`, authHeader)
      .then((res) => {
        console.log(res.data);
        setName(res.data.userName);
        setContact(res.data.contactNumber);
        setEmail(res.data.email);
        setAge(res.data.age);
        setWeight(res.data.weight);
        setGender(res.data.gender);
        setPassword(res.data.password);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  //Form Handler Function
  const handleUpdate = (e) => {
    e.preventDefault();
    console.log(name + " " + contact + " " + age);
    axios
      .put(
        `${base_url}/user/update/${userId}`,
        {
          userName: name,
          contactNumber: contact,
          email: email,
          password: password,
          age: age,
          weight: weight,
          gender: gender,
        },
        authHeader
      )
      .then((res) => {
        console.log(res.data);
        toast.success("Profile Updated Successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggle = () => {
    setModal({
      modal: !modal,
    });
  };

  const handleClose = () => {
    setModal(false);
  };

  const handleSave = () => {
    setModal(false);
    changePassword();
  };

  const changePassword = (e) => {
    axios
      .put(
        `${base_url}/user/${userId}/changePassword/${oldPassword}/${newPassword}`,
        {
          params: {
            oldPassword: oldPassword,
            newPassword: newPassword,
          },
        },
        authHeader
      )
      .then((res) => {
        console.log(res.data);
        if (res.data === "Success") {
          toast.success("Password Updated Successfully");
        } else {
          toast.error("Incorrect Details");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleShow = () => {
    toggle();
  };

  return (
    <Fragment>
      <Container style={{ width: "55%", float: "left" }}>
        <h1 className="text-center my-3">My Profile</h1>
        <Form onSubmit={handleUpdate}>
          <FormGroup>
            <Label for="name">Name <span className="asterisk">*</span></Label>
            <Input
              type="text"
              placeholder="Enter Name here"
              name="name"
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              pattern="[a-zA-Z]+ [a-zA-Z]+"
              title="Enter Full Name (First Name + Last Name)"
              required
            ></Input>
          </FormGroup>

          <FormGroup>
            <Label for="contact">Contact No. <span className="asterisk">*</span></Label>
            <Input
              type="text"
              placeholder="Enter Contact No"
              name="contact"
              id="contact"
              value={contact}
              onChange={(e) => {
                setContact(e.target.value);
              }}
              pattern="(7|8|9)\d{9}"
              title="Enter a valid 10-digit no"
              required
            ></Input>
          </FormGroup>

          <FormGroup>
            <Label for="email">Email <span className="asterisk">*</span></Label>
            <Input
              type="text"
              placeholder="Enter email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            ></Input>
          </FormGroup>

          <FormGroup>
            <Label for="age">Age <span className="asterisk">*</span></Label>
            <Input
              type="text"
              placeholder="Enter age"
              name="age"
              id="age"
              value={age}
              onChange={(e) => {
                setAge(e.target.value);
              }}
              pattern="^[1-9]$|^[1-9][0-9]$|^(100)$"
              title="Enter valid age between 1-100"
              required
            ></Input>
          </FormGroup>

          <FormGroup tag="fieldset">
            <Label>Gender <span className="asterisk">*</span></Label>
            <FormGroup check>
              <Label for="gender">
                <Input
                  type="radio"
                  name="gender"
                  id="male"
                  value="Male"
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                  checked={gender === "Male"}
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
                    setGender(e.target.value);
                  }}
                  checked={gender === "Female"}
                />
                Female
              </Label>
            </FormGroup>
          </FormGroup>

          <FormGroup>
            <Label for="weight">Weight <span className="asterisk">*</span></Label>
            <Input
              type="text"
              placeholder="Enter weight"
              name="weight"
              id="weight"
              value={weight}
              onChange={(e) => {
                setWeight(e.target.value);
              }}
              pattern="^[1-9]$|^[1-9][0-9]$|^(100)$|^[1-3][0-9][0-9]$|^(300)$"
              title="Please enter valid integer digit(eg 1,300)"
              required
            ></Input>
          </FormGroup>

          <Container type="submit" className="text-center">
            <Button color="primary" onClick={handleShow}>
              Change Password
            </Button>
            &nbsp;
            <Button color="success">Update</Button>
          </Container>
        </Form>
      </Container>
      <div>
        <img
          src="/img/profile4.jpg"
          style={{
            width: "400px",
            margin: "160px 0 0 20px",
            backgroundColor: "#2d2d39",
          }}
        />
      </div>

      <Modal isOpen={modal}>
        <ModalHeader toggle={handleShow}>Change Password</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="oldPassword">Enter Old Password</Label>
            <Input
              type="password"
              placeholder="Enter Old Password here"
              name="oldPassword"
              id="oldPassword"
              onChange={(e) => {
                setOldPassword(e.target.value);
              }}
              required
            ></Input>
          </FormGroup>

          <FormGroup>
            <Label for="newPassword">Enter New Password</Label>
            <Input
              type="password"
              placeholder="Enter New Password here"
              name="newPassword"
              id="newPassword"
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
              required
            ></Input>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSave}>
            Do Something
          </Button>{" "}
          <Button color="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

export default MyProfile;
