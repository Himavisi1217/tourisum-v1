import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, userData, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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
          Sri Lanka Travels
        </Link>
        
        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </div>

        <ul className={isOpen ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={toggleMenu}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/vehicles" className="nav-links" onClick={toggleMenu}>
              Vehicles
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/destinations" className="nav-links" onClick={toggleMenu}>
              Destinations
            </Link>
          </li>
          
          {currentUser ? (
            <>
              {userData?.role === 'driver' && (
                <li className="nav-item">
                  <Link to="/driver-dashboard" className="nav-links" onClick={toggleMenu}>
                    Driver Dashboard
                  </Link>
                </li>
              )}
              <li className="nav-item" style={{ display: 'flex', alignItems: 'center', marginLeft: '1rem' }}>
                <button onClick={() => { handleLogout(); toggleMenu(); }} className="btn-secondary nav-btn" style={{ padding: '0.5rem 1rem' }}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link to="/login" className="btn-primary nav-btn" onClick={toggleMenu}>
                Book now / Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
