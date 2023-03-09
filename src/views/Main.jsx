import React from "react";
import Template from "./templates/Template";
import "bootstrap/dist/css/bootstrap.min.css";

import "bootstrap/dist/css/bootstrap-grid.css";
import "../components/Main/MainPageStyle.css";
import "../components/Template/TemplateStyle.css";
import { useEffect, useState } from "react";
import { FakeDB } from "../components/_Temp/FakeDataBase";
import { Link } from "react-router-dom";

const Main = () => {
  //TODO: replace this with data fetched from the server!
  const [database, editDataBase] = FakeDB();
  const MAX_DESCRIPTION_LENGTH = 150; //TODO: static class for every constant value?
  const START_AMOUNT_OF_ITEMS = 15;
  const INCREASE_AMOUNT_OF_ITEM = 4;
  const [currentlyDisplayedAmount, setCurrentDisplayedAmount] = useState(
    START_AMOUNT_OF_ITEMS
  );
  const [displayItem, setDisplayItem] = useState(
    database.slice(0, currentlyDisplayedAmount)
  );

  useEffect(() => {
    //Create an event to look if user scroll on page, if the user is at the bottom, fetch more projects
    window.addEventListener("scroll", () => {
      const scrollingElement = document.scrollingElement;
      const isAtBottom =
        scrollingElement.scrollTop + scrollingElement.clientHeight + 1 >=
        scrollingElement.scrollHeight;

      if (isAtBottom) {
        //increase the amount of items visible
        setCurrentDisplayedAmount(
          currentlyDisplayedAmount + INCREASE_AMOUNT_OF_ITEM
        );
        setDisplayItem(database.slice(0, currentlyDisplayedAmount));
      }
    });
  }, [currentlyDisplayedAmount, database]);

  function ProjectItem(props) {
    //trim description to be shorter to fit a certain size of the project item
    let shorterDescription = props.project.description;
    if (shorterDescription.length > MAX_DESCRIPTION_LENGTH) {
      shorterDescription =
        shorterDescription.substring(0, MAX_DESCRIPTION_LENGTH - 3).trim() +
        "...";
    }

    //return the one item in a given format
    return (
      <Link to={`/project/${props.project.id}`} className="link">
        <div className="bg-white py-0 my-1 px-2">
          <h1>{props.project.name}</h1>
          <p>{shorterDescription}</p>

          {/* <Link to={`/project/${props.project.id}`}> View Project </Link> */}
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
          {displayItem.map((project) => (
            <ProjectItem key={project.id} project={project} />
          ))}
        </div>
      </div>
    </Template>
  );
};
export default Main;
