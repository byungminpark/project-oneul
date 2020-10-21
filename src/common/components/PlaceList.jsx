import React from 'react';
import PropTypes from 'prop-types';
import './PlaceList.scss';
// constants
const googleUrl = 'https://www.google.com';

// prettier-ignore
const PlaceList = ({places, addedPlaceIds, onAdd, onRemove, className }) => {
  const renderAddressAnchor = address => {
    // if address is not valid.
    if (address.split(' ').length === 1) return <a href="#" onClick={e => e.preventDefault()}>{address}</a>; // prettier-ignore
    return <a href={`${googleUrl}/maps/place/${address}`} target="_blank" rel="noreferrer">{address}</a>; // prettier-ignore
  };

  return places === false ? null : (
    <ul className={className}>
      {places.map(place => {
        const { id, name, address, category, iconUrl } = place;
        const isAlreadyAdded = addedPlaceIds && addedPlaceIds.some(item => item === id);
        return (
          // make <PlaceListItem />.

          <li key={id} className="PlaceList-item">
            <p className="PlaceList-name">
              <a
                href={`${googleUrl}/search?q=${address} ${name}`}
                target="_blank"
                rel="noreferrer">
                {name}
              </a>
            </p>

            <p className="PlaceList-address">
              <span className="minor-text">주소<br /></span>
              {renderAddressAnchor(address)}
            </p>

            <img
              className="PlaceList-icon"
              src={iconUrl}
              alt={category}
              width="36px"
              height="36px"
            />

            {/* if (onAdd, onRemove) */}
            {}
            {(onAdd && onRemove) && (
              <button
                className={`PlaceList-btn ${isAlreadyAdded ? 'bg_added' : 'bg_add'}`}
                onClick={() => isAlreadyAdded ? onRemove(place) : onAdd(place)}
                type="button"
                aria-label={isAlreadyAdded ? '리스트에서 제거' : '리스트에 추가'}
                />
                )}
            {/* if (only onRemove) */}
            {(!onAdd && onRemove) && (
              <button
                className='PlaceList-btn bg_remove'
                onClick={() => onRemove(place)}
                type="button"
                aria-label='리스트에서 제거'
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

PlaceList.defaultProps = {
  // places
  addedPlaceIds: undefined,
  onAdd: undefined,
  onRemove: undefined,
  className: 'PlaceList',
};

PlaceList.propTypes = {
  places: PropTypes.arrayOf(PropTypes.object).isRequired,
  addedPlaceIds: PropTypes.arrayOf(PropTypes.string),
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
  className: PropTypes.string,
};

export default PlaceList;
