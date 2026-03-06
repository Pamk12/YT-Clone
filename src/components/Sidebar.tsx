import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import ExploreIcon from "@material-ui/icons/Explore";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import AddIcon from "@material-ui/icons/Add";
import BookmarksIcon from "@material-ui/icons/Bookmarks";

const SidebarContainer = styled.aside<{ isOpen: boolean }>`
  width: ${({ isOpen }) => (isOpen ? "240px" : "72px")};
  background-color: #030303;
  height: calc(100vh - 64px);
  overflow-y: auto;
  overflow-x: hidden; /* Prevents ugly scrolling while animating */
  transition: width 0.2s ease-in-out;
  flex-shrink: 0;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #717171;
    border-radius: 4px;
  }
`;

const NavList = styled.ul`
  list-style: none;
  padding: 12px;
  margin: 0;
`;

// Pass isOpen here to dynamically style the links
const NavItem = styled.li<{ active?: boolean; isOpen: boolean }>`
  margin-bottom: 4px;

  a {
    display: flex;
    align-items: center;
    /* Center the icon when closed, align left when open */
    justify-content: ${({ isOpen }) => (isOpen ? "flex-start" : "center")};
    padding: ${({ isOpen }) => (isOpen ? "0 16px" : "0")};
    height: 48px;
    text-decoration: none;
    color: #ffffff;
    border-radius: 8px;
    background-color: ${({ active }) => (active ? "#ffffff1a" : "transparent")};
    transition: background-color 0.2s;

    &:hover {
      background-color: #ffffff1a;
    }

    svg {
      /* Remove margin when closed to perfectly center */
      margin-right: ${({ isOpen }) => (isOpen ? "24px" : "0")};
      font-size: 24px;
      flex-shrink: 0;
    }

    span {
      /* Hide the text when the sidebar is collapsed */
      display: ${({ isOpen }) => (isOpen ? "block" : "none")};
      font-size: 14px;
      font-weight: 500;
      white-space: nowrap;
    }
  }
`;

// A wrapper for everything below the main nav to hide it entirely when collapsed
const ExtendedContent = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
`;

const Divider = styled.div`
  height: 1px;
  background-color: #ffffff33;
  margin: 12px 24px;
`;

const NewPlaylistButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #212121;
  color: #ffffff;
  border: none;
  border-radius: 24px;
  padding: 8px 16px;
  height: 36px;
  margin: 12px 24px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;

  &:hover {
    background-color: #3d3d3d;
  }

  svg {
    margin-right: 8px;
    font-size: 20px;
  }
`;

const PlaylistSection = styled.div`
  padding: 12px 24px;
`;

const PlaylistItem = styled.div`
  margin-bottom: 16px;
  cursor: pointer;

  h4 {
    color: #ffffff;
    margin: 0 0 4px 0;
    font-size: 14px;
    font-weight: 500;
    white-space: nowrap;
  }

  p {
    color: #aaaaaa;
    margin: 0;
    font-size: 12px;
    display: flex;
    align-items: center;
    white-space: nowrap;

    svg {
      font-size: 12px;
      margin-right: 4px;
    }
  }
`;

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const location = useLocation();

  return (
    <SidebarContainer isOpen={isOpen}>
      <NavList>
        <NavItem active={location.pathname === "/"} isOpen={isOpen}>
          <Link to="/">
            <HomeIcon />
            <span>Home</span>
          </Link>
        </NavItem>
        <NavItem active={location.pathname === "/explore"} isOpen={isOpen}>
          <Link to="/explore">
            <ExploreIcon />
            <span>Explore</span>
          </Link>
        </NavItem>
        <NavItem active={location.pathname === "/library"} isOpen={isOpen}>
          <Link to="/library">
            <LibraryMusicIcon />
            <span>Library</span>
          </Link>
        </NavItem>
        <NavItem active={location.pathname === "/upgrade"} isOpen={isOpen}>
          <Link to="/upgrade">
            <PlayCircleOutlineIcon />
            <span>Upgrade</span>
          </Link>
        </NavItem>
      </NavList>

      {/* Hide all the extra stuff when collapsed */}
      <ExtendedContent isOpen={isOpen}>
        <Divider />

        <NewPlaylistButton>
          <AddIcon />
          New playlist
        </NewPlaylistButton>

        <PlaylistSection>
          <PlaylistItem>
            <h4>Liked Music</h4>
            <p>
              <BookmarksIcon /> Auto playlist
            </p>
          </PlaylistItem>
          <PlaylistItem>
            <h4>Episodes for Later</h4>
            <p>Auto playlist</p>
          </PlaylistItem>
        </PlaylistSection>
      </ExtendedContent>
    </SidebarContainer>
  );
};

export default Sidebar;
