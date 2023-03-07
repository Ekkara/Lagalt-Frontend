const Main = () => {
  //TODO: replace this with data fetched from the server!
  let tempHolder = [
    {
      projectName: "Atlas",
      projectDescription: "bananas apple duck duck cow shoe train hello world!",
    },
    {
      projectName: "Btlas",
      projectDescription: "bananas apple duck duck cow shoe train hello world!",
    },
    {
      projectName: "Ctlas",
      projectDescription: "bananas apple duck duck cow shoe train hello world!",
    },
    {
      projectName: "Atlas",
      projectDescription: "bananas apple duck duck cow shoe train hello world!",
    },
    {
      projectName: "Atlas",
      projectDescription: "bananas apple duck duck cow shoe train hello world!",
    },
    {
      projectName: "Atlas",
      projectDescription: "bananas apple duck duck cow shoe train hello world!",
    },
    {
      projectName: "Atlas",
      projectDescription: "bananas apple duck duck cow shoe train hello world!",
    },
    {
      projectName: "Atlas",
      projectDescription: "bananas apple duck duck cow shoe train hello world!",
    },
    {
      projectName: "Atlas",
      projectDescription: "bananas apple duck duck cow shoe train hello world!",
    },
    {
      projectName: "Atlas",
      projectDescription: "bananas apple duck duck cow shoe train hello world!",
    },
    {
      projectName: "Atlas",
      projectDescription: "bananas apple duck duck cow shoe train hello world!",
    },
    {
      projectName: "Atlas",
      projectDescription: "bananas apple duck duck cow shoe train hello world!",
    },
    {
      projectName: "Atlas",
      projectDescription: "bananas apple duck duck cow shoe train hello world!",
    },
    {
      projectName: "Atlas",
      projectDescription: "bananas apple duck duck cow shoe train hello world!",
    },
    {
      projectName: "Atlas",
      projectDescription: "bananas apple duck duck cow shoe train hello world!",
    },
    {
      projectName: "Atlas",
      projectDescription: "bananas apple duck duck cow shoe train hello world!",
    },
  ];
  
  function Project(props) {
    return (
      <div>
        <h1>{props.project.projectName}</h1>
        <p>{props.project.projectDescription}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Main view</h1>
      <div className="collectionOfProjects">
        {tempHolder.map(project =>(
            <Project project = {project}/>
        ))}
      </div>
    </div>
  );
};
export default Main;
