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
import { loadMainPageProjects } from "../api/project";
import Toggle from "react-toggle";
import "react-toggle/style.css";

const Main = () => {
  const START_AMOUNT_OF_ITEMS = 10;
  const INCREASE_AMOUNT_OF_ITEM = 4;
  const [data, setData] = useState([]);
  const [currentLength, setLength] = useState(0);

  const [showAll, setShowAll] = useState(true);
  const [showGames, setShowGames] = useState(false);
  const [showFilms, setShowFilms] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [showWeb, setShowWeb] = useState(false);
  const [showMusic, setShowMusic] = useState(false);
  const [hideClosedProjects, setHideClosedProjects] = useState(false);
  const [searchBarText, setSearchBarText] = useState("");
  const [searchFilter, setSearchFilter] = useState({
    searchString: "",
    categoryFilter: [
      "Game",
      "Film",
      "Animation",
      "Web-Development",
      "Music",
    ],
    showClosedProject: true,
  });

  useEffect(() => {
      initList();
  }, [searchFilter]);

  const initList = () => {
    getData(0, START_AMOUNT_OF_ITEMS);
  };

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
    const result = await loadMainPageProjects(from, to, searchFilter);
    setData([...data, ...result.data]);
    setLength(currentLength + INCREASE_AMOUNT_OF_ITEM); //should this be + increase amount? i mean on init it is a different value...
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

   const handleInputChange = (event) => {
    setSearchBarText(event.target.value);
  };
  useEffect(() => {
    preventEmptySearch();
  }, [showGames, showAnimation, showFilms, showMusic, showWeb, showAll]);

  const showAllHandler = () => {
    setShowAll(true);
    setShowGames(false);
    setShowFilms(false);
    setShowAnimation(false);
    setShowWeb(false);
    setShowMusic(false);
  };
  const preventEmptySearch = () => {
    if (showGames && showFilms && showMusic && showAnimation && showWeb) {
      showAllHandler();
    } else if (
      showGames ||
      showFilms ||
      showMusic ||
      showAnimation ||
      showWeb
    ) {
      setShowAll(false);
    } else if (
      !showGames &&
      !showFilms &&
      !showMusic &&
      !showAnimation &&
      !showWeb
    ) {
      showAllHandler();
    }
  };
  const showGamesHandler = () => {
    setShowGames((prevState) => !prevState);
  };
  const showMusicHandler = () => {
    setShowMusic((prevState) => !prevState);
  };
  const showFilmsHandler = () => {
    setShowFilms((prevState) => !prevState);
  };
  const showAnimationHandler = () => {
    setShowAnimation((prevState) => !prevState);
  };
  const showWebHandler = () => {
    setShowWeb((prevState) => !prevState);
  };

  const handleHideFullProject = () => {
    setHideClosedProjects((prevState) => !prevState);
  };

  const applySearchFilters = () => {
    //build new filter settings
    const filter = [];
    if (showGames || showAll) filter.push("Game");
    if (showFilms || showAll) filter.push("Film");
    if (showAnimation || showAll) filter.push("Animation");
    if (showMusic || showAll) filter.push("Music");
    if (showWeb || showAll) filter.push("Web-Development");

    setSearchFilter({
      searchString: searchBarText,
      categoryFilter: filter,    
      showClosedProject: !hideClosedProjects
    })

    // clear previously fetched data
    setData([]);
    setLength(0);
  };

  const isShowingColor = "#b0cfab";
  const isNotShowingColor = "#d4d4d4";
  return (
    <Template
      mainContent={
        <>
          <div className="bg-container m-5">
            <div className="mx-4 py-2">
              {/* generate list on displayable on the page of all projects   */}
              {data.map((item, index) => (
                <ProjectItem key={index} project={item} />
              ))}
            </div>
          </div>
        </>
      }
      asideContent={
        <>
          <div id="searchFilterContainer">
            <div id="search-field">
              <input type="text" placeholder="Search..." onChange={handleInputChange}></input>
            </div>

            <div>
              <div className="row">
                <div className="col text-center">
                  <button
                    className="categoryButton mb-2"
                    style={{
                      backgroundColor: showAll
                        ? isShowingColor
                        : isNotShowingColor,
                    }}
                    onClick={showAllHandler}
                  >
                    Show all
                  </button>
                </div>
                <div className="col text-center">
                  <button
                    className="categoryButton mb-2"
                    style={{
                      backgroundColor: showGames
                        ? isShowingColor
                        : isNotShowingColor,
                    }}
                    onClick={showGamesHandler}
                  >
                    Games
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="col text-center">
                  <button
                    className="categoryButton mb-2"
                    style={{
                      backgroundColor: showFilms
                        ? isShowingColor
                        : isNotShowingColor,
                    }}
                    onClick={showFilmsHandler}
                  >
                    Films
                  </button>
                </div>
                <div className="col text-center">
                  <button
                    className="categoryButton mb-2"
                    style={{
                      backgroundColor: showAnimation
                        ? isShowingColor
                        : isNotShowingColor,
                    }}
                    onClick={showAnimationHandler}
                  >
                    Animation
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="col text-center">
                  <button
                    className="categoryButton mb-2"
                    style={{
                      backgroundColor: showWeb
                        ? isShowingColor
                        : isNotShowingColor,
                    }}
                    onClick={showWebHandler}
                  >
                    Web dev
                  </button>
                </div>
                <div className="col text-center">
                  <button
                    className="categoryButton mb-2"
                    style={{
                      backgroundColor: showMusic
                        ? isShowingColor
                        : isNotShowingColor,
                    }}
                    onClick={showMusicHandler}
                  >
                    Music
                  </button>
                </div>
              </div>
              <div>
                <table
                  className="p-1"
                  style={{
                    backgroundColor: isNotShowingColor,
                  }}
                >
                  <colgroup>
                    <col style={{ width: "75%" }} />
                    <col style={{ width: "25%" }} />
                  </colgroup>
                  <tbody>
                    <tr>
                      <td>Hide closed projects:</td>
                      <td>
                        <div className="pt-1">
                          <Toggle
                            checked={hideClosedProjects}
                            onChange={handleHideFullProject}
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <button id="findProjectButton" onClick={applySearchFilters}>
                Find projects
              </button>
            </div>
          </div>
        </>
      }
    />
  );
};
export default Main;
