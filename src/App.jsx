import React, { useState } from 'react';

import Nav from './components/Nav'
import SideMenu from './components/SideMenu'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Nav toggleSidebar={toggleSidebar}/>
      <SideMenu isSidebarOpen={isSidebarOpen} />
    </>
  )
}

export default App
