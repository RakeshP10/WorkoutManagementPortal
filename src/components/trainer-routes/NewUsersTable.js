import React, { useState, useEffect } from "react";
import { Table, Container } from "reactstrap";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../service/UserService";
import { toast } from "react-toastify";

const NewUsersTable = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    content: [],
    totalPages: "",
    totalELements: "",
    pageSize: "",
    lastPage: false,
    pageNumber: "",
  });

  useEffect(() => {
    getUserFromServer();
  }, []);

  const getUserFromServer = async (pageNumber = 0, pageSize = 4) => {
    getUsers(pageNumber, pageSize).then(
      (response) => {
        setUser(response.data);
        window.scroll(0, 0);
      },
      (error) => {
        console.log(error);
        toast.error("Something went wrong");
      }
    );
  };

  return (
    <div>
      <Container>
        <h4 className="mt-4 mb-3">Recent New Users..</h4>
        <Table hover style={{ width: "78%" }}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Weight</th>
              <th>Age</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            {user.content.map((item) => (
              // <User key={item.userId} user={item} update={updateUser}/>

              <tr key={item.userId}>
                <td scope="row" key={item.userId}>
                  {item.userId}
                </td>
                <td className="text-primary">{item.userName}</td>
                <td> {item.contactNumber}</td>
                <td className="text-danger">{item.weight}</td>
                <td>{item.age}</td>
                <td> {item.gender}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button
          variant="dark"
          style={{ marginLeft: "35%" }}
          onClick={() => navigate("/trainer/view-users-trainer")}
        >
          View All Users
        </Button>
      </Container>
    </div>
  );
};

export default NewUsersTable;
