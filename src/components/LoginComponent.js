import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  Label,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Row,
  Button,
} from "reactstrap";
import axios from "axios";
import { doLogin } from "../auth";
import { useNavigate } from "react-router-dom";
import "../css/loginstyle.css";
import { getCurrentUserDetail, getRole } from "../auth";
import { Hidden } from "@mui/material";
import { loginService } from "../service/authService";

const LoginComponent = ({ history, location }) => {
  const navigate = useNavigate();

  const user = getCurrentUserDetail();
  const userRole = getRole();

  const [loginDetail, setLoginDetail] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event, field) => {
    let actualValue = event.target.value;
    setLoginDetail({
      ...loginDetail,
      [field]: actualValue,
    });
  };

  const handleReset = () => {
    setLoginDetail({
      username: "",
      password: "",
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(loginDetail);
    //validation
    if (
      loginDetail.username.trim() === "" ||
      loginDetail.password.trim() === ""
    ) {
      toast.error("Username or Password  is required !!");
      return;
    }

    //submit the data to server to generate token
      loginService(loginDetail)
      .then((data) => {
        console.log(data);

        //save the data to localstorage
        doLogin(data, () => {
          console.log("login detail is saved to localstorage");
        });

        //redirect to dashboard page

        if (getRole() === 1) {
          navigate("/trainer/home");
          window.location.reload();
        } else if (getRole() === 2) {
          navigate("/user/home");
          window.location.reload();
        } else {
          navigate("/");
          window.location.reload();
        }
        toast.success("Login Success");
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 400 || error.response.status === 404) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Something went wrong  on sever !!");
        }
      });
  };

  useEffect(() => {
    if (userRole == 1) {
      window.location = "/trainer/home";
    } else if (userRole == 2) {
      window.location = "/user";
    }
  }, [userRole]);

  return (
    <div className="jumbotron">
      <div className="d-lg-flex half">
        <img
          className="bg order-1 order-md-2"
          style={{ backgroundImage: 'url("img/a6.gif")' }}
        ></img>
        <div className="contents order-2 order-md-1">
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="col-md-7">
                <h3>
                  Login to <strong>Workout Portal</strong>
                </h3>
                <p className="mb-4">Every workout counts.</p>
                <form onSubmit={handleFormSubmit} method="post">
                  <div className="form-group first">
                    <label htmlFor="username">Username <span className="asterisk">*</span></label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="your-email@gmail.com"
                      id="email"
                      value={loginDetail.username}
                      onChange={(e) => handleChange(e, "username")}
                      // pattern="/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{6,16}$/"
                      // title="Please Enter a Valid Email"
                      required
                    />
                  </div>
                  <br />
                  <div className="form-group last mb-3">
                    <label htmlFor="password">Password <span className="asterisk">*</span></label> <br />
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Your Password"
                      id="password"
                      value={loginDetail.password}
                      onChange={(e) => handleChange(e, "password")}
                      required
                    />
                  </div>
                  <br />

                  <div>
                    <input
                      type="submit"
                      value="Log In"
                      className="btn btn-block btn-primary"
                    />
                    &nbsp;&nbsp;
                    <Button
                      type="submit"
                      value="Sign Up"
                      className="btn btn-success"
                      onClick={() => navigate("/signup")}
                    >
                      Signup
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <script src="js/jquery-3.3.1.min.js"></script>
      <script src="js/popper.min.js"></script>
      <script src="js/bootstrap.min.js"></script>
      <script src="js/main.js"></script>
    </div>
  );
};

export default LoginComponent;
