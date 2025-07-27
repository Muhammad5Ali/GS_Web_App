import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Header.module.css';
import { FiLogOut, FiUser, FiHome, FiAlertCircle, FiUsers, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { FiPieChart } from 'react-icons/fi';

const Header = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const isActive = (path) => {
    return location.pathname === path ? styles.activeNavLink : '';
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!user) {
    return null;
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <span className={styles.title}>Admin Portal</span>
      </div>
      
      <nav className={styles.nav}>
        <Link to="/dashboard" className={`${styles.navLink} ${isActive('/dashboard')}`}>
          <FiHome className={styles.navIcon} /> Dashboard
        </Link>
        <Link to="/reports" className={`${styles.navLink} ${isActive('/reports')}`}>
          <FiAlertCircle className={styles.navIcon} /> Reports
        </Link>
        <Link to="/supervisors" className={`${styles.navLink} ${isActive('/supervisors')}`}>
          <FiUsers className={styles.navIcon} /> Supervisors
        </Link>
        <Link to="/workers" className={`${styles.navLink} ${isActive('/workers')}`}>
          <FiUsers className={styles.navIcon} /> Workers
        </Link>
        <Link to="/analytics" className={`${styles.navLink} ${isActive('/analytics')}`}>
          <FiPieChart className={styles.navIcon} /> Analytics
        </Link>
      </nav>
      
      <div className={styles.userInfo} ref={dropdownRef}>
        <div className={styles.userBadge} onClick={toggleDropdown}>
          {user.profileImage ? (
            <img 
              src={user.profileImage} 
              alt="Profile" 
              className={styles.profileImage} 
            />
          ) : (
            <div className={styles.profileFallback}>
              <FiUser className={styles.fallbackIcon} />
            </div>
          )}
          <div className={styles.userName}>{user.username}</div>
          {isDropdownOpen ? (
            <FiChevronUp className={styles.dropdownIcon} />
          ) : (
            <FiChevronDown className={styles.dropdownIcon} />
          )}
        </div>
        
        {isDropdownOpen && (
          <div className={styles.dropdownMenu}>
            <div className={styles.dropdownHeader}>
              {user.profileImage ? (
                <img 
                  src={user.profileImage} 
                  alt="Profile" 
                  className={styles.dropdownProfileImage} 
                />
              ) : (
                <div className={styles.dropdownProfileFallback}>
                  <FiUser className={styles.dropdownFallbackIcon} />
                </div>
              )}
              <div className={styles.dropdownUserInfo}>
                <div className={styles.dropdownUserName}>{user.username}</div>
                <div className={styles.dropdownUserEmail}>{user.email}</div>
                <div className={styles.dropdownUserRole}>Administrator</div>
              </div>
            </div>
            
            <div className={styles.dropdownDivider}></div>
            
            <button onClick={handleLogout} className={styles.dropdownItem}>
              <FiLogOut className={styles.dropdownItemIcon} /> Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;