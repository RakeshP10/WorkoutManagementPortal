import React, { useState } from "react";
import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaRegChartBar,
  FaCommentAlt,
  FaShoppingBag,
  FaThList,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "../css/sidebar.css";

const Sidebar = () => {
  const menuItem = [
    {
      path: "/trainer/home",
      name: "Home",
      icon: <FaTh />,
    },
    {
      path: "/trainer/view-plan-trainer",
      name: "Manage Workout Plans",
      icon: <FaThList />,
    },
    {
      path: "/trainer/view-users-trainer",
      name: "All Members",
      icon: <FaUserAlt />,
    },
    {
      path: "/trainer/my-profile",
      name: "My Profile",
      icon: <FaUserAlt />,
    },
  ];
  return (
    <div className="sidebar sticky-top" >
      <div style={{fontSize:"100px",textAlign:"center"}}><i className="fas fa-user-circle sidebardiv"></i></div>
      {menuItem.map((item, index) => (
        <NavLink
          to={item.path}
          key={index}
          className="link sidebarLink"
          activeclassName="active"
        >
          <div className="icon">{item.icon}</div>
          <div className="link_text">{item.name}</div>
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
