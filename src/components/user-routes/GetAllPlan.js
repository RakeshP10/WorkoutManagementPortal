import React, { useState, useEffect, useRef } from "react";
import base_url from "../../api/bootapi";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { authHeader } from "../../App";
import PlanCards from "./PlanCards";
import TextField from "@mui/material/TextField";
import { getAllPlansByLevel, getAllPlansByLevelService } from "../../service/planService";
const GetAllPlan = () => {
  const [plans, setPlans] = useState([]);
  const [inputText, setInputText] = useState("");
  const shouldLog = useRef(true);
  const location = useLocation();
  const { level } = location.state;
  console.log({ level });

  const getAllPlansFromServer = () => {
      getAllPlansByLevelService(level)
      .then((res) => {
        // console.log(res.data)
        toast.success("Data has been loaded", {
          position: "bottom-center",
        });

        setPlans(res.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong");
      });
  };

  useEffect(() => {
    if (shouldLog.current) {
      shouldLog.current = false;
      getAllPlansFromServer();
    }
  }, []);

  const filteredData = plans.filter((el) => {
    console.log(el);
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
    <section id="services" className="services">
      <div className="container">
        <div className="section-title">
          <h2> Plans </h2>
        </div>
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
          <div className="row mt-5">
            {plans.length > 0
              ? filteredData.map((item) => (
                  <PlanCards key={item.planId} plans={item} />
                ))
              : "No Plan Available"}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetAllPlan;
