import { Link } from "react-router-dom";
import SingleLink from "./SingleLink";

const MenuList = ({ LinkItems }) => {
  return (
    <ul className="nemu--container__menuItems">
      {LinkItems &&
        LinkItems.map((LinkItem) => (
          <li key={LinkItem.label} className="active">
            {/* <span dangerouslySetInnerHTML={{ __html: LinkItem.icon }} /> */}
            <SingleLink label={LinkItem.label} path={LinkItem.to} icon={LinkItem.icon} />
          </li>
        ))}
    </ul>
  );
};

export default MenuList;
