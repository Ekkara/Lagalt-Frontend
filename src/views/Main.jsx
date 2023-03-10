import React from "react";
import Template from "./templates/Template";
import "bootstrap/dist/css/bootstrap.min.css";

import "bootstrap/dist/css/bootstrap-grid.css";
import "../components/Main/MainPageStyle.css";
import "../components/Template/TemplateStyle.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { async } from "q";


const Main = () => {
  //TODO: replace this with data fetched from the server!
  const [data, setData] = useState([])

  const MAX_DESCRIPTION_LENGTH = 150; //TODO: static class for every constant value?

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios.get('https://localhost:7132/api/Projects')
      .then((result) =>{
        setData(result.data)
        console.log(result.data.length);
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function ProjectItem(props) {
 //trim description to be shorter to fit a certain size of the project item
 let shorterDescription = props.project.projectDescription;
 if (shorterDescription.length > MAX_DESCRIPTION_LENGTH) {
  shorterDescription =
    shorterDescription.substring(0, MAX_DESCRIPTION_LENGTH - 3).trim() +
    "...";
}
      //return the one item in a given format
    return (
      <Link to={`/project/${props.project.id}`} className="link">
        <div className="bg-white py-0 my-1 px-2">
          <h1>{props.project.projectName}</h1>
          <p>{shorterDescription}</p>     
        </div>
      </Link>
    );
  }

  return (
    <Template>
      {/* holder for the main stream content */}
      <div className="bg-container m-5">
        <div className="mx-4 py-2">
          {/* generate list on displayable on the page of all projects   */}
          {data.map((item, index) => (
            <ProjectItem key={index} project={item} />
          ))}
        </div>
      </div>
    </Template>
  );
};
export default Main;
