import { useEffect } from "react";
import { useState } from "react";
import { NavLink as ReactLink, useNavigate } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";
import { doLogout, getCurrentUserDetail, getRole, isLoggedIn } from "../auth";

const CustomNavbar = ({ login }) => {
  let navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const [loginUser, setLoginUser] = useState(false);
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    setUser(getCurrentUserDetail());
  }, []);

  const logout = () => {
    doLogout(() => {
      setLoginUser(false);
      navigate("/");
    });
  };
  console.log(login);
  return (
    <>
      <Navbar
        light
        expand="md"
        fixed="true"
        className="px-5 sticky-top navbar-dark bg-dark"
      >
        <NavbarBrand>FitnessZone</NavbarBrand>
        <NavbarToggler onClick={() => setIsOpen(!isOpen)} />

        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar></Nav>

          <Nav navbar>
            {login && getRole() === 1 && (
              <>
                <UncontrolledDropdown inNavbar nav>
                  <DropdownToggle caret nav>
                    Hello {login.userName} !
                  </DropdownToggle>
                  <DropdownMenu end>
                    <DropdownItem tag={ReactLink} to="/trainer/my-profile">
                      My Profile
                    </DropdownItem>
                    <DropdownItem onClick={logout}>Logout</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </>
            )}

            {login && getRole() === 2 && (
              <>
                <NavItem>
                  <NavLink tag={ReactLink} to="/user/home">
                    Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={ReactLink} to="/user/add-track-record">
                    Add TrackRecord
                  </NavLink>
                </NavItem>

                <UncontrolledDropdown inNavbar nav>
                  <DropdownToggle caret nav>
                    {user.email}
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem tag={ReactLink} to="/user/my-profile">
                      My Profile
                    </DropdownItem>
                    <DropdownItem onClick={logout}>Logout</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </>
            )}

            {!login && (
              <>
                <NavItem>
                  <NavLink dark tag={ReactLink} to="/">
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={ReactLink} to="/signup">
                    Signup
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
      {/* )} */}
    </>
  );
};

export default CustomNavbar;
