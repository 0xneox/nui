import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaHome, FaTrophy, FaGift, FaCog } from 'react-icons/fa';

const NavContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  background: ${props => props.theme.colors.primary};
  padding: 10px 0;
`;

const NavItem = styled(motion.div)`
  color: ${props => props.theme.colors.text};
  font-size: 24px;
`;

const Navigation = () => {
  const location = useLocation();

  return (
    <NavContainer>
      <Link to="/">
        <NavItem whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <FaHome color={location.pathname === '/' ? '#fff' : '#ccc'} />
        </NavItem>
      </Link>
      <Link to="/leaderboard">
        <NavItem whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <FaTrophy color={location.pathname === '/leaderboard' ? '#fff' : '#ccc'} />
        </NavItem>
      </Link>
      <Link to="/quest">
        <NavItem whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <FaGift color={location.pathname === '/quest' ? '#fff' : '#ccc'} />
        </NavItem>
      </Link>
      <Link to="/settings">
        <NavItem whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <FaCog color={location.pathname === '/settings' ? '#fff' : '#ccc'} />
        </NavItem>
      </Link>
    </NavContainer>
  );
};

export default Navigation;