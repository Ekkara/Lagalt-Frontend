import React from "react";
import { Link } from "react-router-dom";
import "../../components/Template/TemplateStyle.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../components/Profile/Profile.css";
import "../../components/Template/TemplateStyle.css";
import { Row, Col } from "react-bootstrap";
import "../../components/Profile/Profile.css";
import "../../components/Template/TemplateStyle.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ProjectUtils from "../../components/Utils/ProjectUtils";

const ProjectLoggedIn = (props) => {
    const navigate = useNavigate();

  return (
    <div>
        Logged in
    </div>
  );
};
export default ProjectLoggedIn;
