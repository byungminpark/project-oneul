import React from 'react';
import PropTypes from 'prop-types';
import './AppSidebarNewList.scss';
// components
import PlaceList from './PlaceList';

// prettier-ignore
function AppSidebarNewList({ listName, addedPlaces, handleListName, onRemovePlace, onSaveList }) {
  return (
    <div className="AppSidebarNewList">
      <input
        className="AppSidebarNewList-input"
        onChange={handleListName}
        value={listName}
        placeholder="ex)  이태원 카페 리스트"
        type="text"
      />

      <PlaceList
        className="PlaceList"
        places={addedPlaces}
        onRemove={onRemovePlace}
      />

      <button className="AppSidebarNewList-button" onClick={onSaveList} type="button">
        Save
        {addedPlaces.length ? <span className="textButton-sub">{addedPlaces.length}</span> : ''} 
      </button>
    </div>
  );
}

AppSidebarNewList.propTypes = {
  listName: PropTypes.string.isRequired,
  addedPlaces: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleListName: PropTypes.func.isRequired,
  onRemovePlace: PropTypes.func.isRequired,
  onSaveList: PropTypes.func.isRequired,
};

export default AppSidebarNewList;
