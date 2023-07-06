import React from "react";
import { MDBFooter, MDBContainer, MDBCol, MDBRow } from "mdb-react-ui-kit";
import { alignPropType } from "react-bootstrap/esm/types";

function Footer() {
  return (
    <div>
      <MDBFooter className="text-white bg-dark">
        <MDBContainer className="p-4">
          <MDBRow>
            <MDBCol
              lg="6"
              md="12"
              className="mb-4 mb-md-0"
              style={{ marginLeft: "10px" }}
            >
              <h5 className="text-uppercase">Fitnessmantra</h5>

              <p>
                The key to beauty to health is fitness. We can help you to make
                your winter workout effective and strong. Contact us to make
                that possible. Raise the bar of your fitness and achieve new
                heights this winter.
              </p>
            </MDBCol>

            {/* <MDBCol lg='3' md='6' className='mb-4 mb-md-0' style={{ marginLeft: "310px"}}>
            <h5 className='text-uppercase'>Quick Links</h5>

            <ul className='list-unstyled mb-0'>
              <li>
                <a href='#!' className='text-white'>
                  Plans
                </a>
              </li>
              <li>
                <a href='#!' className='text-white'>
                  Exercises
                </a>
              </li>
              <li>
                <a href='#!' className='text-white'>
                 User Track Records
                </a>
              </li>
            </ul>
          </MDBCol> */}
          </MDBRow>
        </MDBContainer>

        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          &copy; {new Date().getFullYear()} Copyright:{" "}
        </div>
      </MDBFooter>
    </div>
  );
}

export default Footer;
