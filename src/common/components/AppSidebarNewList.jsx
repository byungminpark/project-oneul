import React from 'react';
import PropTypes from 'prop-types';
import './AppSidebarNewList.css';
// components
import PlaceList from './PlaceList';

// prettier-ignore
const AppSidebarNewList = ({ listName, addedPlaces, handleListName, onRemovePlace, onSaveList }) => {
  const handleEnterDown = e => e.key === 'Enter' && onSaveList();


  return (
    <div className="AppSidebarNewList">
      <input
        className="AppSidebarNewList-input"
        onChange={handleListName}
        onKeyDown={handleEnterDown}
        value={listName}
        placeholder="ex) 이태원동 맛집 리스트"
        type="text"
      />

      <PlaceList
        className="PlaceList no-scrollbar"
        places={addedPlaces}
        onRemove={onRemovePlace}
      />

      <button className="AppSidebarNewList-button textButton" onClick={onSaveList} type="button">
        저장하기
        {addedPlaces.length ? <span className="textButton-sub">{addedPlaces.length}</span> : ''} 
      </button>
    </div>
  );
};

AppSidebarNewList.propTypes = {
  listName: PropTypes.string.isRequired,
  addedPlaces: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleListName: PropTypes.func.isRequired,
  onRemovePlace: PropTypes.func.isRequired,
  onSaveList: PropTypes.func.isRequired,
};

export default AppSidebarNewList;
