import React from 'react';
import DashboardLayout from './DashboardLayout';
import useResponsive from '../../hooks/useResponsive';
import Footer from '../public/Footer';

const UserLayout = () => {
  const { isMobile } = useResponsive();
  
  return (
    <>
      <DashboardLayout role="USER" />
      <Footer />
    </>
  );
};

export default UserLayout;