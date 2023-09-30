import { Link, useLocation } from "react-router-dom";
import SingleLink from "./SingleLink";
import { useState, useEffect } from "react";

const MenuList = ({ LinkItems }) => {
  const [activeNav, setActiveNav] = useState(null);
  const location = useLocation();
  const handleActiveNavItem = (id) => {
    setActiveNav(id);
  };

  // Use useEffect to automatically set the activeNavItem based on the current route.
  useEffect(() => {
    const matchingNavItem = LinkItems.find((item) => item.to === location.pathname);
    if (matchingNavItem) {
      setActiveNav(matchingNavItem.id);
    }
  }, [location.pathname, LinkItems]);

  return (
    <ul className="nemu--container__menuItems">
      {LinkItems &&
        LinkItems.map((LinkItem) => (
          <li key={LinkItem.id} onClick={() => handleActiveNavItem(LinkItem.id)} className={activeNav === LinkItem.id ? "active" : ""}>
            <SingleLink label={LinkItem.label} path={LinkItem.to} icon={LinkItem.icon} />
          </li>
        ))}
    </ul>
  );
};

export default MenuList;
