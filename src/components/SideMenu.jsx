

const SideMenu = ({ isSidebarOpen }) => {

  return (
    <>
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
      
      <ul className="menu-items">
        <li>Menu Item 1</li>
        <li>Menu Item 2</li>
        <li>Menu Item 3</li>
        {/* Add more menu items as needed */}

        
      </ul>
    </aside>
    </>
  )
}

export default SideMenu