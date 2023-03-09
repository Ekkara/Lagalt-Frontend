import React from "react";
import "../../components/Template/TemplateStyle.css";

const Template = ({ children }) => {
    return (
      <div className="site-container">
        <header>header</header>
        <div className="d-flex same-height">
          <aside>aside</aside>
          <main>{children}</main>
        </div>
      </div>
    );
};
export default Template;
