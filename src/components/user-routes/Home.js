import React from "react";
import { Button, Card, CardImg, Container, Row } from "react-bootstrap";
import { CardText, CardBody, CardTitle, CardSubtitle } from "reactstrap";

function Home() {
  return (
    <div>
      {/* <!-- ======= Image Section ======= --> */}
      <section id="home" className="d-flex align-items-center">
        <Container>
          <h1>Welcome to Workout</h1>
          <h2>We are team of trainers to help you out with your workout</h2>
        </Container>
      </section>
      {/* <!-- Image Hero --> */}

      {/* <!-- ======= Plans ======= --> */}
      <section id="plans" className="plans">
        <Container>
          <Row>
            <div className="col-lg-12 d-flex align-items-stretch">
              <div className="icon-boxes d-flex flex-column justify-content-center">
                <div className="row">
                  <div className="col-xl-4 d-flex align-items-stretch">
                    <div className="icon-box mt-4 mt-xl-0">
                      <img src="../img/home-bg.png" className="image"></img>
                      <h3>Beginner</h3>
                      <p>
                        Consequuntur sunt aut quasi enim aliquam quae harum
                        pariatur laboris nisi ut aliquip
                      </p>
                    </div>
                  </div>
                  <div className="col-xl-4 d-flex align-items-stretch">
                    <div className="icon-box mt-4 mt-xl-0">
                      <img src="../img/home-bg.png" className="image"></img>
                      <h3>Intermediate</h3>
                      <p>
                        Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt
                      </p>
                    </div>
                  </div>
                  <div className="col-xl-4 d-flex align-items-stretch">
                    <div className="icon-box mt-4 mt-xl-0">
                      <a href="#">
                        <img src="../img/home-bg.png" className="image"></img>
                        {/* <i className="bx bx-images"></i>/ */}
                        <h3>Advanced</h3>
                      </a>
                      <p>
                        Aut suscipit aut cum nemo deleniti aut omnis. Doloribus
                        ut maiores omnis facere
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- End .content--> */}
            </div>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default Home;
