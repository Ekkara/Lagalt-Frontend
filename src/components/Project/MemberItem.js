export default function MemberItem({ member }) {
    return (
      //  <Link to={`/project/${props.project.id}`} className="link">
      <div className="border border-dark bg-container rounded-10 px-2">
        <h4> {member.userName}</h4>
      </div>
      //  </Link>
    );
  }