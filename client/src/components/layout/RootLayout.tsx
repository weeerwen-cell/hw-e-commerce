import { Outlet } from 'react-router-dom';

import { Footer } from './Footer';
import { Navbar } from '../../features/navbar/Navbar';
import { useState } from 'react';

const RootLayout = () => {

  const[searchQuery, setSearchQuery] = useState("")

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Navbar onSearch={setSearchQuery} />
      <main style={{ flex: 1 }}>
        <Outlet context={{searchQuery}}/>
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
