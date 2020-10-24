import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './AppHeader.scss';
import Logo from './Logo';

function AppHeader({ isSidebarOpen, onToggleSidebar, addedPlacesLength }) {
  return (
    <header className="AppHeader">
      <h1 className="visually-hidden">
        관심있는 지역을 검색하고, 오늘 갈 곳을 계획하세요.
      </h1>

      <button
        className={`AppHeader-button iconButton bg_${isSidebarOpen ? 'close' : 'menu'}`} // prettier-ignore
        onClick={onToggleSidebar}
        type="button"
        aria-label={isSidebarOpen ? '사이드바 닫기' : '사이드바 열기'}>
        {isSidebarOpen || addedPlacesLength === 0 ? null : (
          <span className="iconButton-sub">{addedPlacesLength}</span> // prettier-ignore
        )}
      </button>

      <div className="AppHeader-logo">
        <Link to="/">
          <Logo />
        </Link>
      </div>

      <nav className={isSidebarOpen ? 'AppHeader-nav_invisible' : 'AppHeader-nav'}>
        <Link to="/about" className="bg_info" aria-label="사이트 정보" />
      </nav>
    </header>
  );
}

AppHeader.defaultProps = {
  isSidebarOpen: false,
  // onToggleSidebar
  addedPlacesLength: 0,
};

AppHeader.propTypes = {
  isSidebarOpen: PropTypes.bool,
  onToggleSidebar: PropTypes.func.isRequired,
  addedPlacesLength: PropTypes.number,
};

export default AppHeader;
