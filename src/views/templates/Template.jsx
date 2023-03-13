import React from "react";
import { Link } from "react-router-dom";
import "../../components/Template/TemplateStyle.css";

const Template = ({ children }) => {
  return (
    <div className="site-container">
      <header>
        <Link to="/Main" className="btn btn-primary">
          home
        </Link>
        <div id="search-field">
          <input type="text" placeholder="Search..."></input>
        </div>
        <Link to="/Profile/[user]" className="btn btn-primary">
          Profile
        </Link>
      </header>
      <div className="d-flex same-height">
        <aside></aside>
        <main>{children}</main>
      </div>
    </div>
  );
};
export default Template;
