import React, { useEffect, useState } from "react";
import { NavBarData } from "./data";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

const NavigationSidebar = () => {
  const [active, setActive] = useState();
  const history = useLocation();
  useEffect(() => {
    setActive(window.location.pathname);
  }, [history]);
  return (
    <div className="list-group center-text">
      <Link to={""} className="list-group-item" onClick={() => setActive("")}>
        <i className={`fab fa-magento position-relative me-1`}></i>
      </Link>
      {NavBarData.map((navItem) => (
        <Link
          to={navItem.path}
          className={`list-group-item ${
            window.location.pathname.includes(navItem.path) &&
            navItem.path !== "/"
              ? "active"
              : window.location.pathname === "/" && navItem.path === "/"
              ? "active"
              : ""
          }`}
          onClick={() => setActive(navItem.name)}
        >
          <i className={`fas ${navItem.icon} position-relative me-1`}></i>
          <div className="d-xl-inline d-lg-none d-md-none d-sm-none">
            {" "}
            {navItem.name}
          </div>
        </Link>
      ))}
    </div>
  );
};
export default NavigationSidebar;
