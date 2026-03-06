import React, { useState } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "../containers/Header";
import Sidebar from "../components/Sidebar"; // Ensure this path matches where you saved Sidebar.tsx
import PlayerPage from "../page/PlayerPage";

// The wrapper ensures the sidebar and main content sit side-by-side below the header
const LayoutWrapper = styled.div`
  display: flex;
  height: calc(100vh - 64px);
  overflow: hidden;
  background-color: #030303;
`;

// This takes up the remaining space next to the sidebar and allows scrolling
const MainContent = styled.main`
  flex: 1;
  overflow-y: auto;
`;

const AppRouter = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <>
        {/* Pass the toggle function to the Header's hamburger icon */}
        <Header toggleSidebar={toggleSidebar} />

        <LayoutWrapper>
          {/* Pass the open/closed state to the Sidebar */}
          <Sidebar isOpen={isSidebarOpen} />

          <MainContent>
            <Switch>
              <Route path="/">
                <PlayerPage />
              </Route>
            </Switch>
          </MainContent>
        </LayoutWrapper>
      </>
    </Router>
  );
};

export default AppRouter;
