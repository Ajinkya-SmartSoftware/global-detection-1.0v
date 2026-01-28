import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from '../public/Navbar';
import Footer from '../public/Footer';
import useResponsive from '../../hooks/useResponsive';

const PublicLayout = () => {
  const { isMobile } = useResponsive();
  
  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      overflowX: 'hidden'
    }}>
      <Navbar />
      <Box 
        component="main" 
        sx={{ 
          flex: 1,
          p: isMobile ? 0 : 0,
          width: '100%',
          maxWidth: '100vw'
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default PublicLayout;