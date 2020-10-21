import React from 'react';
import PropTypes from 'prop-types';
import './FilterList.scss';

// prettier-ignore
function FilterList({ filters, currentFilter, handleClick, listRef }) {
  return (
    <ul className='FilterList' ref={listRef}>
      {filters.map(name => {
        return (
          <li
            key={name}
            className={name === currentFilter ? 'FilterList-item active' : 'FilterList-item'}>
            <a className="FilterList-anchor" onClick={handleClick}>
              {name}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

FilterList.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentFilter: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  listRef: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default FilterList;
