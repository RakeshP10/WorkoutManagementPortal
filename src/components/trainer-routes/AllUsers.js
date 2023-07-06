import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  Container,
} from "reactstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { confirmAlert } from "react-confirm-alert";
import { deleteUser, getUsers } from "../../service/UserService";

const AllUser = ({ pageSize }) => {
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
    document.title = "View User";
    getUserFromServer();
  }, []);

  const getUserFromServer = async (pageNumber = 0, pageSize = 8) => {
    if (pageNumber > user.pageNumber && user.lastPage) {
      return;
    }
    if (pageNumber < user.pageNumber && user.pageNumber == 0) {
      return;
    }
    getUsers(pageNumber, pageSize).then(
      (response) => {
        setUser(response.data);
        window.scroll(0, 0);
      },
      (error) => {
        console.log(error);
        toast.error("Something went Wrong");
      }
    );
  };

  const handleViewTrackRecord = (userId) => {
    navigate("/trainer/view-track-record", { state: { userId: userId } });
  };

  const updateUser = (userId) => {
    setUser(user.filter((c) => c.userId != userId));
  };

  const handleDelete = (userId, e) => {
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
                getUserFromServer();
              },
              (error) => {
                // toast.error("User not deleted || Server Problem")
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
    <div>
      <Container>
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
            {user.content.map((item) => (
              // <User key={item.userId} user={item} update={updateUser}/>

              <tr key={item.userId}>
                <td scope="row" key={item.userId}>
                  {item.userId}
                </td>
                <td>{item.userName}</td>
                <td> {item.contactNumber}</td>
                <td>{item.weight}</td>
                <td>{item.age}</td>
                <td> {item.gender}</td>
                <td>
                  <Button
                    color="warning ml-3"
                    onClick={() => handleViewTrackRecord(item.userId)}
                  >
                    <i className="fas fa-eye"></i>
                  </Button>
                  <Button
                    color="danger"
                    onClick={() => {
                      handleDelete(item.userId);
                    }}
                    style={{ marginLeft: "10px" }}
                  >
                    <DeleteIcon fontSize="small" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination className="mt-3" style={{ marginLeft: "23rem" }}>
          <PaginationItem
            onClick={() => getUserFromServer(user.pageNumber - 1)}
            disabled={user.pageNumber == 0}
          >
            <PaginationLink previous></PaginationLink>
          </PaginationItem>

          {[...Array(user.totalPages)].map((item, index) => (
            <PaginationItem
              onClick={() => getUserFromServer(index)}
              active={index == user.pageNumber}
              key={index}
            >
              <PaginationLink>{index + 1}</PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem
            onClick={() => getUserFromServer(user.pageNumber + 1)}
            disabled={user.lastPage}
          >
            <PaginationLink next></PaginationLink>
          </PaginationItem>
        </Pagination>
      </Container>
    </div>
  );
};

export default AllUser;
