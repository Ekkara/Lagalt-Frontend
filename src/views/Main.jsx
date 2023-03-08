import "bootstrap/dist/css/bootstrap.min.css";
import "../components/Main/MainPageStyle.css";
import { useEffect, useState } from "react";

const Main = () => {
  //TODO: replace this with data fetched from the server!
  let [database, updateDataBase] = useState([
    {
      name: "Some name",
      description:
        "1 Some description bananas apple duck duck cow shoe train hello world!" +
        " 2 Some description bananas apple duck duck cow shoe train hello world!" +
        " 3 Some description bananas apple duck duck cow shoe train hello world!" +
        " 4 Some description bananas apple duck duck cow shoe train hello world!" +
        " 5 Some description bananas apple duck duck cow shoe train hello world!" +
        " 6 Some description bananas apple duck duck cow shoe train hello world!" +
        " 7 Some description bananas apple duck duck cow shoe train hello world!",
    },
    {
      name: "Some name",
      description: "2",
    },
    {
      name: "Some name",
      description: "3",
    },
    {
      name: "Some name",
      description: "4",
    },
    {
      name: "Some name",
      description: "5",
    },
    {
      name: "Some name",
      description: "6",
    },
    {
      name: "Some name",
      description: "7",
    },
    {
      name: "Some name",
      description: "8",
    },
    {
      name: "Some name",
      description: "9",
    },
    {
      name: "Some name",
      description: "10",
    },
    {
      name: "Some name",
      description: "11",
    },
    {
      name: "Some name",
      description: "12",
    },
    {
      name: "Some name",
      description: "13",
    },
    {
      name: "Some name",
      description: "14",
    },
    {
      name: "Some name",
      description: "15",
    },
    {
      name: "Some name",
      description: "16",
    },
    {
      name: "Some name",
      description: "17",
    },
    {
      name: "Some name",
      description: "18",
    },
    {
      name: "Some name",
      description: "19",
    },
    {
      name: "Some name",
      description: "20",
    },
    {
      name: "Some name",
      description: "21",
    },
    {
      name: "Some name",
      description: "22",
    },
    {
      name: "Some name",
      description: "23",
    },
    {
      name: "Some name",
      description: "24",
    },
    {
      name: "Some name",
      description: "25",
    },
    {
      name: "Some name",
      description: "26",
    },
    {
      name: "Some name",
      description: "27",
    },
    {
      name: "Some name",
      description: "28",
    },
    {
      name: "Some name",
      description: "29",
    },
    {
      name: "Some name",
      description: "30",
    },
    {
      name: "Some name",
      description: "31",
    },
    {
      name: "Some name",
      description: "32",
    },
    {
      name: "Some name",
      description: "33",
    },
    {
      name: "Some name",
      description: "34",
    },
    {
      name: "Some name",
      description: "35",
    },
    {
      name: "Some name",
      description: "36",
    },
    {
      name: "Some name",
      description: "37",
    },
    {
      name: "Some name",
      description: "38",
    },
    {
      name: "Some name",
      description: "39",
    },
    {
      name: "Some name",
      description: "40",
    },
    {
      name: "Some name",
      description: "41",
    },
    {
      name: "Some name",
      description: "42",
    },
    {
      name: "Some name",
      description: "43",
    },
    {
      name: "Some name",
      description: "44",
    },
    {
      name: "Some name",
      description: "45",
    },
    {
      name: "Some name",
      description: "46",
    },
    {
      name: "Some name",
      description: "47",
    },
    {
      name: "Some name",
      description: "48",
    },
    {
      name: "Some name",
      description: "49",
    },
    {
      name: "Some name",
      description: "50",
    },
    {
      name: "Some name",
      description: "51",
    },
    {
      name: "Some name",
      description: "52",
    },
    {
      name: "Some name",
      description: "53",
    },
    {
      name: "Some name",
      description: "54",
    },
    {
      name: "Some name",
      description: "55",
    },
    {
      name: "Some name",
      description: "56",
    },
    {
      name: "Some name",
      description: "57",
    },
    {
      name: "Some name",
      description: "58",
    },
    {
      name: "Some name",
      description: "59",
    },
    {
      name: "Some name",
      description: "60",
    },
    {
      name: "Some name",
      description: "61",
    },
    {
      name: "Some name",
      description: "62",
    },
    {
      name: "Some name",
      description: "63",
    },
    {
      name: "Some name",
      description: "64",
    },
    {
      name: "Some name",
      description: "65",
    },
    {
      name: "Some name",
      description: "66",
    },
    {
      name: "Some name",
      description: "67",
    },
    {
      name: "Some name",
      description: "68",
    },
    {
      name: "Some name",
      description: "69",
    },
    {
      name: "Some name",
      description: "70",
    },
    {
      name: "Some name",
      description: "71",
    },
    {
      name: "Some name",
      description: "72",
    },
    {
      name: "Some name",
      description: "73",
    },
    {
      name: "Some name",
      description: "74",
    },
    {
      name: "Some name",
      description: "75",
    },
    {
      name: "Some name",
      description: "76",
    },
    {
      name: "Some name",
      description: "77",
    },
    {
      name: "Some name",
      description: "78",
    },
    {
      name: "Some name",
      description: "79",
    },
    {
      name: "Some name",
      description: "80",
    },
    {
      name: "Some name",
      description: "81",
    },
    {
      name: "Some name",
      description: "82",
    },
    {
      name: "Some name",
      description: "83",
    },
    {
      name: "Some name",
      description: "84",
    },
    {
      name: "Some name",
      description: "85",
    },
    {
      name: "Some name",
      description: "86",
    },
    {
      name: "Some name",
      description: "87",
    },
    {
      name: "Some name",
      description: "88",
    },
    {
      name: "Some name",
      description: "89",
    },
    {
      name: "Some name",
      description: "90",
    },
    {
      name: "Some name",
      description: "91",
    },
    {
      name: "Some name",
      description: "92",
    },
    {
      name: "Some name",
      description: "93",
    },
    {
      name: "Some name",
      description: "94",
    },
    {
      name: "Some name",
      description: "95",
    },
    {
      name: "Some name",
      description: "96",
    },
    {
      name: "Some name",
      description: "97",
    },
    {
      name: "Some name",
      description: "98",
    },
    {
      name: "Some name",
      description: "99",
    },
    {
      name: "Some name",
      description: "100",
    },
  ]);

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
        setCurrentDisplayedAmount(currentlyDisplayedAmount + INCREASE_AMOUNT_OF_ITEM);
        setDisplayItem(database.slice(0, currentlyDisplayedAmount));
      }
    });
  },[currentlyDisplayedAmount, database]);

  function Project(props) {
    //trim description to be shorter to fit a certain size of the project item
    let shorterDescription = props.project.description;
    if (shorterDescription.length > MAX_DESCRIPTION_LENGTH) {
      shorterDescription =
        shorterDescription.substring(0, MAX_DESCRIPTION_LENGTH - 3).trim() +
        "...";
    }

    //return the one item in a given format
    return (
      <div className="bg-white py-0 my-0 px-2">
        <h1>{props.project.name}</h1>
        <p>{shorterDescription}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Main view</h1>
       {/* holder for the main stream content */}
      <div className="bg-dark">
        <div className="mx-4 py-2">
          {/* generate list on displayable on the page of all projects   */}
          {displayItem.map((project, index) => (
            <Project key={index} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Main;
