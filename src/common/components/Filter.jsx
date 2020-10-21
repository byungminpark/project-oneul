import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import useFirstRenderStatus from '../hooks/useFirstRenderStatus';
import './Filter.scss';
import FilterList from './FilterList';

function Filter({ filters, currentFilter, handleClick }) {
  const listRef = useRef(null);
  const underbarRef = useRef(null);
  const isFirstRender = useFirstRenderStatus();

  // underbar positioning
  useEffect(() => {
    const currentIndex = filters.indexOf(currentFilter);
    const listItemWidth = listRef.current.children[currentIndex].clientWidth;
    const listItemLeft = listRef.current.children[currentIndex].offsetLeft;
    underbarRef.current.style.width = `${listItemWidth}px`;
    underbarRef.current.style.transform = `translateX(${listItemLeft}px)`;
    // preventing first transition
    if (!isFirstRender) underbarRef.current.style.transition = '0.18s ease-out';
  }, [currentFilter, filters, isFirstRender]);

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
