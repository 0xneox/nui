import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getLeaderboard } from '../services/api';
import useApi from '../hooks/useApi';
import LoadingSpinner from '../components/LoadingSpinner';

const LeaderboardWrapper = styled.div`
  padding: 20px;
  color: ${props => props.theme.colors.text};
`;

const LeaderboardItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const Leaderboard = () => {
  const { execute: fetchLeaderboard, data: leaderboardData, loading, error } = useApi(getLeaderboard);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div>Error loading leaderboard. Please try again later.</div>;

  return (
    <LeaderboardWrapper>
      <h1>Leaderboard</h1>
      {leaderboardData && leaderboardData.map((item, index) => (
        <LeaderboardItem key={item.id || index}>
          <span>{index + 1}. {item.username}</span>
          <span>{item.score}</span>
        </LeaderboardItem>
      ))}
    </LeaderboardWrapper>
  );
};

export default Leaderboard;