import { Link } from "react-router-dom";

const SingleLink = ({ path, label, icon }) => {
  return (
    <Link to={path}>
      <span dangerouslySetInnerHTML={{ __html: icon }} /> {label}
    </Link>
  );
};

export default SingleLink;
