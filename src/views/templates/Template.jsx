import React from "react";
import "../../components/Template/TemplateStyle.css";

const Template = ({ children }) => {
    return (
      <div className="site-container">
        <header>
          <div id="search-field">
          <input type='text' placeholder='Search...'>

          </input>
          </div>
        </header>
        <div className="d-flex same-height">
          <aside></aside>
          <main>{children}</main>
        </div>
      </div>
    );
};
export default Template;
