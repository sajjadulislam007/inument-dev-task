import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import useFetch from "../Hooks/useFetch";
import { useState } from "react";
import MenuContainer from "./MenuContainer";
import { Link } from "react-router-dom";

const SideMenu = ({ isSidebarOpen, setIsSidebarOpen, CloseSideBarRef }) => {
  const [url, setUrl] = useState("http://localhost:3000/menuItems");
  const { data, isLoading, error } = useFetch(url);

  return (
    <>
      <div className={`overlay ${isSidebarOpen ? "active" : ""}`}>
        <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`} ref={CloseSideBarRef}>
          <div className="logo">
            <Link to="/">Your Logo</Link>
          </div>
          {data && data.map((menuHeaders) => <MenuContainer key={menuHeaders.id} title={menuHeaders.title} LinkItems={menuHeaders.items} />)}
          <button
            className="close"
            onClick={() => {
              setIsSidebarOpen(false);
            }}
          >
            <svg viewBox="0 0 448 512">
              <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
            </svg>
          </button>
        </aside>
      </div>
    </>
  );
};

export default SideMenu;
