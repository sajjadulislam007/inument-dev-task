
import React, { useState, useEffect, useRef } from 'react';

const Nav = ({ toggleSidebar }) => {
  
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const headerRef = useRef(null); // Create a ref for the header element
  const [headerHeight, setHeaderHeight] = useState(0); // State to store the header height
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {

    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };

    // Calculate and set the initial header height
    updateHeaderHeight();

    console.log(headerHeight)
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      if (currentScrollPos > headerHeight) {
        // Scrolling down, hide the header
        setIsHeaderVisible(false);
      }

      if (currentScrollPos < prevScrollPos) {
        // Show the header if we're near the top of the page
        setIsHeaderVisible(true);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos, headerHeight]);
  return (
    <div className={`floating-header ${isHeaderVisible ? 'visible' : 'hidden'}`} ref={headerRef}>
      <div className="left-section">
        <div className="logo">Logo</div>
        <button className="toggle-button" onClick={toggleSidebar}>
        Toggle Sidebar
      </button>
      </div>
      <div className="right-section">
        <div className="notification-icon">Notification Icon</div>
        <button className="header-button">Button</button>
      </div>
    </div>
  )
}

export default Nav;


