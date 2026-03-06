import React from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import Avatar from "@material-ui/core/Avatar";

const StyledHeader = styled.header`
  height: 64px;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) =>
    theme.color?.headerBackground || "#030303"};
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;

  .menu-icon {
    color: #ffffff;
    cursor: pointer;
    margin-right: 24px;
  }

  .logo {
    img {
      display: block;
      height: 24px;
    }
  }
`;

const StyledSearch = styled.div`
  display: flex;
  align-items: center;
  background-color: #212121;
  border-radius: 8px;
  padding: 10px 16px;
  width: 100%;
  max-width: 520px;
  border: 1px solid #333333;

  svg {
    color: #ffffff80;
    margin-right: 16px;
  }

  input {
    background: transparent;
    border: none;
    color: #ffffff;
    font-size: 16px;
    width: 100%;
    outline: none;

    &::placeholder {
      color: #ffffff80;
      font-size: 16px;
    }
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
`;

// Added '?' to make it optional so it doesn't break your router
interface HeaderProps {
  toggleSidebar?: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <StyledHeader>
      <LeftSection>
        {/* Only call toggleSidebar if it was passed down */}
        <MenuIcon
          className="menu-icon"
          onClick={() => toggleSidebar && toggleSidebar()}
        />
        <div className="logo">
          <img alt="logo" src={Logo} />
        </div>
      </LeftSection>
      <StyledSearch>
        <SearchIcon />
        <input placeholder="Search songs, albums, artists, podcasts" />
      </StyledSearch>
      <RightSection>
        <Avatar style={{ backgroundColor: "#5f7a82" }}>A</Avatar>
      </RightSection>
    </StyledHeader>
  );
};

export default Header;
