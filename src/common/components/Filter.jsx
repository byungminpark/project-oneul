import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import useIsFirstRender from '../hooks/useIsFirstRender';
import './Filter.scss';
import FilterList from './FilterList';

function Filter({ filters, currentFilter, handleClick }) {
  const listRef = useRef(null);
  const underbarRef = useRef(null);
  const isFirstRender = useIsFirstRender();

  // preventing first transition.
  useEffect(() => {
    if (!isFirstRender) underbarRef.current.style.transition = '0.2s ease-out';
  }, [isFirstRender]);

  // underbar positioning.
  useEffect(() => {
    const currentIndex = filters.indexOf(currentFilter);
    const listItemWidth = listRef.current.children[currentIndex].clientWidth;
    const listItemLeft = listRef.current.children[currentIndex].offsetLeft;
    underbarRef.current.style.width = `${listItemWidth}px`;
    underbarRef.current.style.transform = `translateX(${listItemLeft}px)`;
  }, [currentFilter, filters]);

  return (
    <div className="Filter">
      <FilterList
        listRef={listRef}
        filters={filters}
        currentFilter={currentFilter}
        handleClick={handleClick}
      />
      <span className="Filter-underbar" ref={underbarRef} />
    </div>
  );
}

Filter.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentFilter: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Filter;
