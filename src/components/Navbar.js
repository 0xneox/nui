// components/Navbar.js
import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaSyncAlt, FaChartBar, FaUser, FaUsers, FaCog, FaUserFriends } from 'react-icons/fa';

const NavbarContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(to right, #071665, #0348B2, #0870DE);
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  z-index: 1000;
`;

const NavbarIcon = styled.div`
  color: ${props => (props.active ? '#ffffff' : 'rgba(255, 255, 255, 0.6)')};
  font-size: 20px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    color: #ffffff;
    transform: translateY(-3px);
  }
`;

const NavbarLabel = styled.div`
  font-size: 12px;
  margin-top: 4px;
`;

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/home', icon: FaHome, label: 'Home' },
    { path: '/quest', icon: FaSyncAlt, label: 'Quest' },
    { path: '/leaderboard', icon: FaChartBar, label: 'Leaderboard' },
    {path:   '/invite', icon: FaUserFriends, label: 'Invite'},
    { path: '/profile', icon: FaUser, label: 'Profile' },

  ];

  return (
    <NavbarContainer>
      {navItems.map(item => (
        <NavbarIcon 
          key={item.path}
          active={location.pathname === item.path} 
          onClick={() => navigate(item.path)}
        >
          <item.icon />
          <NavbarLabel>{item.label}</NavbarLabel>
        </NavbarIcon>
      ))}
    </NavbarContainer>
  );
};

export default Navbar;