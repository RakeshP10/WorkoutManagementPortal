import React, { useState, useEffect } from "react";
import { Container, Table } from "reactstrap";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { getUserTrackRecord } from "../../service/UserService";

const AllUserTrackRecord = () => {
  const location = useLocation();
  const { userId } = location.state;
  const [trackrecords, setTrackRecords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "View TrackRecords";
    getUserTrackRecord(userId).then(
      (response) => {
        setTrackRecords(response.data);
      },
      (error) => {
        console.log(error);
        toast.error("Something went wrong");
      }
    );
  }, []);

  return (
    <Container>
      <h1 className="h1_tag">All TrackRecords</h1>
      <Table hover className="table" striped>
        <thead>
          <tr>
            <th style={{ width: "13%" }}>Date</th>
            <th>Workout Performed</th>
            <th>No. of exercises performed</th>
            <th>Sets per exercise performed</th>
            <th>Repetitions per set</th>
            <th>Weight Recorded</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          {trackrecords.length > 0
            ? trackrecords.map((item) => (
                // <UserTrackRecord key={item.trackId} usertrackrecord={item} update={updateTrackRecords}/>
                <tr key={item.trackId}>
                  <td>{item.submitDate}</td>
                  <td>{item.workoutPlan}</td>
                  <td>{item.noOfExercise}</td>
                  <td>{item.setPerExercise}</td>
                  <td>{item.repPerSet}</td>
                  <td>{item.weight}</td>
                  <td>{item.comments}</td>
                </tr>
              ))
            : "No TrackRecords Available"}
        </tbody>
      </Table>
      <div>
        <Button
          onClick={() => {
            navigate("/trainer/view-users-trainer");
          }}
          style={{ float: "right" }}
        >
          Back
        </Button>
      </div>
    </Container>
  );
};

export default AllUserTrackRecord;
