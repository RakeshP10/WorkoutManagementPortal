import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { getRole } from "../../auth";
import Sidebar from "../SideBar";
import Footer from "../Footer";
const TrainerRivateRoute = () => {
  return getRole() != 0 && getRole() == 1 && getRole() != 2 ? (
    <div>
      <Row>
        <Col md={3}>
          <Sidebar />
        </Col>
        <Col md={9}>
          <Outlet />
        </Col>
      </Row>
      <Row>
        <Footer />
      </Row>
    </div>
  ) : (
    <Navigate to={"/login"} />
  );
};

export default TrainerRivateRoute;
