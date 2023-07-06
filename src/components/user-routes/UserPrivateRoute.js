import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { getRole } from "../../auth";
import { Row } from "reactstrap";
import Footer from "../Footer";

const UserRivateRoute = () => {
  return getRole() !== 0 && getRole() === 2 && getRole() !== 1 ? (
    <div>
      <Row>
        <Outlet />
      </Row>
      <Row>
        <Footer />
      </Row>
    </div>
  ) : (
    <Navigate to={"/login"} />
  );
};

export default UserRivateRoute;
