import React from 'react';
import PropTypes from 'prop-types';
import './AppSidebarMyLists.css';
import PlaceList from './PlaceList';

const AppSidebarMyLists = ({ myLists, removeList }) => {
  return (
    <div className="AppSidebarMyLists">
      <ul className="AppSidebarMyLists-list no-scrollbar">
        {myLists.map(({ id, name, places, date }) => {
          return (
            <li key={id} className="AppSidebarMyLists-item">
              <p className="AppSidebarMyLists-name">
                {name} <span>({date})</span>
              </p>

              <button
                className="MyList-button"
                onClick={() => removeList(id, name)}
                type="button">
                삭제
              </button>
              <PlaceList className="AppSidebarMyLists-PlaceList" places={places} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

AppSidebarMyLists.propTypes = {
  myLists: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeList: PropTypes.func.isRequired,
};

export default AppSidebarMyLists;
