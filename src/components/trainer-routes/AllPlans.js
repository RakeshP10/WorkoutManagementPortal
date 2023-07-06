import React, { useState, useEffect, useRef } from "react";
import Plan from "./Plan";
import base_url from "../../api/bootapi";
import axios from "axios";
import { toast } from "react-toastify";
import { authHeader } from "../../App";
import TextField from "@mui/material/TextField";
import { getAllPlansService } from "../../service/planService";

const AllPlans = () => {
  const [plans, setPlans] = useState([]);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    document.title = "View Plans";
    getAllPlansFromServer();
  }, []);

  const getAllPlansFromServer = () => {
    getAllPlansService()
    .then(
      (response) => {
        setPlans(response.data);
      },
      (error) => {
        console.log(error);
        toast.error("Something went wrong");
      }
    );
  };

  const updatePlans = (planId) => {
    setPlans(plans.filter((c) => c.planId != planId));
  };

  const filteredData = plans.filter((el) => {
    if (inputText === "") {
      return el;
    } else {
      return el.planName.toLowerCase().includes(inputText);
    }
  });

  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };
  return (
    <section id="trainerplans" className="trainerplans">
      <div className="row">
        <div className="search">
          <TextField
            id="outlined-basic"
            onChange={inputHandler}
            variant="outlined"
            size="small"
            label="Search"
            style={{ float: "left" }}
          />
        </div>
        <br />
        <div className="row mt-5">
          {filteredData.map((item) => (
            <Plan key={item.planId} plan={item} update={updatePlans} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllPlans;
