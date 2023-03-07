import "bootstrap/dist/css/bootstrap.min.css";
import "../components/Main/MainPageStyle.css";

const Main = () => {
  //TODO: replace this with data fetched from the server!
  let tempHolder = [
    {
      name: "Some name",
      description:
        "1 Some description bananas apple duck duck cow shoe train hello world!" + 
        " 2 Some description bananas apple duck duck cow shoe train hello world!" +
        " 3 Some description bananas apple duck duck cow shoe train hello world!"+ 
        " 4 Some description bananas apple duck duck cow shoe train hello world!"+ 
        " 5 Some description bananas apple duck duck cow shoe train hello world!"+ 
        " 6 Some description bananas apple duck duck cow shoe train hello world!"+ 
        " 7 Some description bananas apple duck duck cow shoe train hello world!"
    },
    {
      name: "Some name",
      description:
        "2 Some description bananas apple duck duck cow shoe train hello world!",
    },
    {
      name: "Some name",
      description:
        "3 Some description bananas apple duck duck cow shoe train hello world!",
    },
    {
      name: "Some name",
      description:
        "4 Some description bananas apple duck duck cow shoe train hello world!",
    },
    {
      name: "Some name",
      description:
        "5 Some description bananas apple duck duck cow shoe train hello world!",
    },
    {
      name: "Some name",
      description:
        "6 Some description bananas apple duck duck cow shoe train hello world!",
    },
    {
      name: "Some name",
      description:
        "7 Some description bananas apple duck duck cow shoe train hello world!",
    },
    {
      name: "Some name",
      description:
        "8 Some description bananas apple duck duck cow shoe train hello world!",
    },
    {
      name: "Some name",
      description:
        "9 Some description bananas apple duck duck cow shoe train hello world!",
    },
    {
      name: "Some name",
      description:
        "10 Some description bananas apple duck duck cow shoe train hello world!",
    },
    {
      name: "Some name",
      description:
        "11 Some description bananas apple duck duck cow shoe train hello world!",
    },
    {
      name: "Some name",
      description:
        "12 Some description bananas apple duck duck cow shoe train hello world!",
    },
    {
      name: "Some name",
      description:
        "13 Some description bananas apple duck duck cow shoe train hello world!",
    },
  ];
  const MAX_DESCRIPTION_LENGTH = 150; //TODO: static class for every constant value?
  const MAX_ITEMS_PER_PAGE = 3;
  let currentPage = 1;


  function Project(props) {
    let shorterDescription = props.project.description;
    if (shorterDescription.length > MAX_DESCRIPTION_LENGTH){
      shorterDescription = shorterDescription
      .substring(0,MAX_DESCRIPTION_LENGTH - 3)
      .trim() + '...';
    }

    return (
      <div className= "bg-white py-0 my-0 px-2">
        <h1>{props.project.name}</h1>
        <p>{shorterDescription}</p>
      </div>
    );
  }

  let displayItem = tempHolder.slice(currentPage * MAX_ITEMS_PER_PAGE, currentPage * MAX_ITEMS_PER_PAGE + MAX_ITEMS_PER_PAGE);

  return (
    <div>
      <h1>Main view</h1>
      
      <div className="bg-dark"> {/* holder for the main stream content */}
        <div className="m-4 py-2">
          {displayItem.map((project, index) => (
            <Project key={index} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Main;
