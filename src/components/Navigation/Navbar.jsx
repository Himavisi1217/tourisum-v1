import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const { currentUser, userData, logout } = useAuth();
  const navigate = useNavigate();
  const canViewAnnouncements = userData?.role === 'admin' || userData?.role === 'super_admin';

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenus = () => {
    setIsOpen(false);
    setShowServices(false);
    setShowAbout(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container container">
        <Link to="/" className="navbar-logo">
          Serendib Travels
        </Link>
        
        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </div>

        <ul className={isOpen ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={closeMenus}>
              Home
            </Link>
          </li>
          <li
            className="nav-item nav-item-dropdown"
            onMouseEnter={() => setShowServices(true)}
            onMouseLeave={() => setShowServices(false)}
          >
            <button
              type="button"
              className="nav-links nav-dropdown-trigger"
              onClick={() => setShowServices((prev) => !prev)}
            >
              Services <ChevronDown size={16} style={{ marginLeft: 6 }} />
            </button>
            <div className={`services-dropdown ${showServices ? 'show' : ''}`}>
              <Link to="/vehicles" className="dropdown-link" onClick={closeMenus}>
                Vehicles
              </Link>
              <Link to="/book-journey" className="dropdown-link" onClick={closeMenus}>
                Book a Journey
              </Link>
              <Link to="/rent-driver-with-vehicle" className="dropdown-link" onClick={closeMenus}>
                Rent Driver with Vehicle
              </Link>
            </div>
          </li>
          <li className="nav-item">
            <Link to="/destinations" className="nav-links" onClick={closeMenus}>
              Destinations
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/pricing" className="nav-links" onClick={closeMenus}>
              Pricing
            </Link>
          </li>
          <li
            className="nav-item nav-item-dropdown"
            onMouseEnter={() => setShowAbout(true)}
            onMouseLeave={() => setShowAbout(false)}
          >
            <button
              type="button"
              className="nav-links nav-dropdown-trigger"
              onClick={() => setShowAbout((prev) => !prev)}
            >
              About Us <ChevronDown size={16} style={{ marginLeft: 6 }} />
            </button>
            <div className={`services-dropdown ${showAbout ? 'show' : ''}`}>
              <Link to="/about-us" className="dropdown-link" onClick={closeMenus}>
                About Us
              </Link>
              <Link to="/contact" className="dropdown-link" onClick={closeMenus}>
                Contact Us
              </Link>
            </div>
          </li>
          <li className="nav-item">
            <Link to="/blogs" className="nav-links" onClick={closeMenus}>
              Blogs
            </Link>
          </li>
          {canViewAnnouncements ? (
            <li className="nav-item">
              <Link to="/announcements" className="nav-links" onClick={closeMenus}>
                Announcements
              </Link>
            </li>
          ) : null}
          
          {currentUser ? (
            <>
              {userData?.role === 'driver' && (
                <li className="nav-item">
                  <Link to="/driver-dashboard" className="nav-links" onClick={closeMenus}>
                    Driver Dashboard
                  </Link>
                </li>
              )}
              {userData?.role === 'super_admin' && (
                <li className="nav-item">
                  <Link to="/admin/dashboard" className="nav-links" onClick={closeMenus}>
                    Admin Dashboard
                  </Link>
                </li>
              )}
              {userData?.role === 'admin' && (
                <li className="nav-item">
                  <Link to="/admin/panel" className="nav-links" onClick={closeMenus}>
                    Admin Panel
                  </Link>
                </li>
              )}
              <li className="nav-item" style={{ display: 'flex', alignItems: 'center', marginLeft: '1rem' }}>
                <button onClick={() => { handleLogout(); closeMenus(); }} className="btn-secondary nav-btn" style={{ padding: '0.5rem 1rem' }}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="btn-primary nav-btn" onClick={closeMenus}>
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
