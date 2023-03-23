import React from "react";
import Template from "./templates/Template";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap-grid.css";
import "../components/Main/MainPageStyle.css";
import "../components/Template/TemplateStyle.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { async } from "q";

const Main = () => {
  const START_AMOUNT_OF_ITEMS = 10;
  const INCREASE_AMOUNT_OF_ITEM = 4;
  const [data, setData] = useState([]);
  const [currentLength, setLength] = useState(0);

  useEffect(() => {
    getData(0, START_AMOUNT_OF_ITEMS);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollingElement = document.scrollingElement;
      const isAtBottom =
        scrollingElement.scrollTop + scrollingElement.clientHeight + 1 >=
        scrollingElement.scrollHeight;

      if (isAtBottom) {
        getData(currentLength, currentLength + INCREASE_AMOUNT_OF_ITEM);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentLength]);

  const getData = async (from, to) => {
    await axios
      .get(
        `https://localhost:7132/api/Projects/ProjectsForMainPage?start=${from}&range=${
          to - from
        }`
      )
      .then((result) => {
        setData([...data, ...result.data]);
        setLength(currentLength + INCREASE_AMOUNT_OF_ITEM);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function ProjectItem(props) {
    //return the one item in a given format
    return (
      <Link to={`/project/${props.project.id}`} className="link">
        <div className="bg-white py-0 my-1 px-2">
          <h1>{props.project.projectName}</h1>
          <p>{props.project.description}</p>
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
