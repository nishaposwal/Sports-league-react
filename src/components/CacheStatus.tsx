import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getCacheInfo, clearApiCache } from '../utils/cache';

const CacheStatusContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px 15px;
  border-radius: 8px;
  font-size: 12px;
  z-index: 1000;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const CacheInfo = styled.div`
  margin-bottom: 8px;
`;

const ClearButton = styled.button`
  background: rgba(229, 9, 20, 0.8);
  color: white;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 10px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(229, 9, 20, 1);
  }
`;

const CacheStatus: React.FC = () => {
  const [cacheInfo, setCacheInfo] = useState({ totalItems: 0, totalSize: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateCacheInfo = () => {
      const info = getCacheInfo();
      setCacheInfo(info);
    };

    // Update cache info every 5 seconds
    updateCacheInfo();
    const interval = setInterval(updateCacheInfo, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleClearCache = () => {
    clearApiCache();
    setCacheInfo({ totalItems: 0, totalSize: 0 });
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Only show if there are cached items
  if (cacheInfo.totalItems === 0) return null;

  return (
    <CacheStatusContainer
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <CacheInfo>
        📦 Cache: {cacheInfo.totalItems} items (
        {formatBytes(cacheInfo.totalSize)})
      </CacheInfo>
      {isVisible && (
        <ClearButton onClick={handleClearCache}>Clear Cache</ClearButton>
      )}
    </CacheStatusContainer>
  );
};

export default CacheStatus;
