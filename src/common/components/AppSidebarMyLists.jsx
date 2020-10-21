import React from 'react';
import PropTypes from 'prop-types';
import './AppSidebarMyLists.scss';
import PlaceList from './PlaceList';

function AppSidebarMyLists({ myLists, removeList }) {
  return (
    <div className="AppSidebarMyLists">
      <ul className="AppSidebarMyLists-list">
        {myLists.map(({ id, name, places, date }) => {
          return (
            <li key={id} className="AppSidebarMyLists-item">
              <p className="AppSidebarMyLists-name">
                {name} <span>({date})</span>
              </p>

              <button
                className="AppSidebarMyLists-removeBtn bg_remove"
                onClick={() => removeList(id, name)}
                type="button">
                {/* &times; */}
              </button>
              <PlaceList className="AppSidebarMyLists-PlaceList" places={places} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

AppSidebarMyLists.propTypes = {
  myLists: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeList: PropTypes.func.isRequired,
};

export default AppSidebarMyLists;
