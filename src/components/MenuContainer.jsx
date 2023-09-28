import React from "react";
import MenuList from "./MenuList";

const MenuContainer = ({ title, LinkItems }) => {
  return (
    <div className="nemu--container">
      <p className="nemu--container__title">{title}</p>
      <MenuList LinkItems={LinkItems} />
    </div>
  );
};

export default MenuContainer;
