import React, { useRef, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Nav from "./components/Nav";
import SideMenu from "./components/SideMenu";
import Settings from "./components/pages/Settings";
import Profile from "./components/pages/Profile";
import Help from "./components/pages/Help";
import Forum from "./components/pages/Forum";
import Contact from "./components/pages/Contact";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const CloseSideBarRef = useRef(null);

  const handleCloseSidebar = (e) => {
    if (CloseSideBarRef.current && !CloseSideBarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleCloseSidebar);
    return () => {
      document.removeEventListener("mousedown", handleCloseSidebar);
    };
  }, [handleCloseSidebar]);

  return (
    <>
      <SideMenu isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} CloseSideBarRef={CloseSideBarRef} />
      <Nav setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
