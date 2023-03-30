import React from "react";
import Template from "./templates/Template";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap-grid.css";
import "../components/Main/MainPageStyle.css";
import "../components/Template/TemplateStyle.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadMainPageProjects } from "../api/project";
import Toggle from "react-toggle";
import "react-toggle/style.css";

const Main = () => {
  //constants
  const START_AMOUNT_OF_ITEMS = 15;
  const INCREASE_AMOUNT_OF_ITEM = 4;

  //variables related to the fetching of projects
  const [data, setData] = useState([]);
  const [currentLength, setLength] = useState(0);

  //variables related to the filter process
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
    categoryFilter: ["Game", "Film", "Animation", "Web-Development", "Music"],
    showClosedProject: true,
  });

  //load the starting list when the page loads or the search filter changes
  useEffect(() => {
    getData(0, START_AMOUNT_OF_ITEMS);
  }, [searchFilter]);

  //directly after the data is changed, update the length
  useEffect(() => {
    setLength(data.length);
  }, [data]);

  //assign a scrolling event, if the scrollbar is at the end of the list, load a new set of projects
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

  //fetch projects in a interval from the database, use searchFilter as a parameter to filter
  //out undesired projects
  const getData = async (from, to) => {
    const result = await loadMainPageProjects(from, to, searchFilter);
    //add the newly fetched project to the list of currently stored projects
    setData([...data, ...result.data]);
  };

  //template for how projects will be displayed in the list
  function ProjectItem(props) {
    return (
      //allow user to visit a project's page simply by pressing it
      <Link to={`/project/${props.project.id}`} className="link">
        <div className="bg-white py-0 my-1 px-2">
          <h1>{props.project.projectName}</h1>
          <p>{props.project.description}</p>
        </div>
      </Link>
    );
  }

  //when the search field changes, update the search string (obs this won't be sent to the database util the filter is applied)
  const handleInputChange = (event) => {
    setSearchBarText(event.target.value);
  };

  //prevent wrong user input, if all users is are either enabled or disabled the show all user is
  //activated. It is also automatically deactivated if another search filter is enabled
  useEffect(() => {
    if (
      (showGames && showFilms && showMusic && showAnimation && showWeb) ||
      (!showGames && !showFilms && !showMusic && !showAnimation && !showWeb)
    ) {
      showAllHandler();
    } else if (
      showGames ||
      showFilms ||
      showMusic ||
      showAnimation ||
      showWeb
    ) {
      setShowAll(false);
    }
  }, [showGames, showAnimation, showFilms, showMusic, showWeb, showAll]);

  //activate show all filter and deactivate all other filters
  const showAllHandler = () => {
    setShowAll(true);
    setShowGames(false);
    setShowFilms(false);
    setShowAnimation(false);
    setShowWeb(false);
    setShowMusic(false);
  };

  //toggles for each buttons and the actual toggle
  const showGamesHandler = () => {
    setShowGames(!showGames);
  };
  const showMusicHandler = () => {
    setShowMusic(!showMusic);
  };
  const showFilmsHandler = () => {
    setShowFilms(!showFilms);
  };
  const showAnimationHandler = () => {
    setShowAnimation(!showAnimation);
  };
  const showWebHandler = () => {
    setShowWeb(!showWeb);
  };
  const handleHideFullProject = () => {
    setHideClosedProjects(!hideClosedProjects);
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
      showClosedProject: !hideClosedProjects,
    });

    // clear previously fetched data
    setData([]);
    setLength(0);
  };

  //allow user to type keywords and press enter to apply the search filter
  const handleQuickSearch = (event) => {
    if (event.key === "Enter") {
      applySearchFilters();
    }
  };

  //reusable colors
  const isShowingColor = "#b0cfab";
  const isNotShowingColor = "#d4d4d4";

  //make the filter static if the user scrolls below the header
  const [isSidebarFixed, setIsSidebarFixed] = useState(false);
  useEffect(() => {
   function handleScroll() {
     const headerHeight = 100;
     const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
     setIsSidebarFixed(scrollTop > headerHeight);
   }
   window.addEventListener('scroll', handleScroll);
   return () => window.removeEventListener('scroll', handleScroll);
 }, []);

  return (
    <Template
      mainContent={
        <>
          <div className="bg-container m-5">
            <div className="mx-4 py-2">
              {data.length >= 1 ? (
                <>
                  {/* generate list on displayable on the page of all projects   */}
                  {data.map((item, index) => (
                    <ProjectItem key={index} project={item} />
                  ))}
                </>
              ) : (
                <>
                <h2>
                  No project where found that matches your search filter!
                </h2>
                <h3>
                  Try to remove some filters, or if you think this is a connection error please refresh the page!
                </h3>
                </>
              )}
            </div>
          </div>
        </>
      }
      asideContent={
        <>
          <div className={`searchFilterContainer ${isSidebarFixed ? 'fixed' : ''}`}>
            <div id="search-field">
              <input
                type="text"
                placeholder="Search..."
                onChange={handleInputChange}
                onKeyDown={handleQuickSearch}
              ></input>
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
                  className="p-1 w-100"
                  style={{
                    backgroundColor: isNotShowingColor,
                  }}
                >
                  <colgroup>
                    <col className="w-75" />
                    <col className="w-25" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <td>
                        <span className="p-1">Hide closed projects:</span>
                      </td>
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
