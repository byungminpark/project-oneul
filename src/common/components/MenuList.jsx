import React from 'react';
import PropTypes from 'prop-types';
import './MenuList.scss';

// prettier-ignore
function MenuList({ menus, currentMenu, handleClick }) {
  return (
    <ul className="MenuList">
      {menus.map(name => {
        // <MenuListItem />
        return (
          <li
            key={name}
            className={name === currentMenu ? 'MenuList-item_active' : 'MenuList-item'}>
            <button onClick={handleClick} type="button">
              {name}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

MenuList.propTypes = {
  menus: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentMenu: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default MenuList;
