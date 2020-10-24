import React from 'react';
import PropTypes from 'prop-types';
import './PlaceList.scss';

const googleUrl = 'https://www.google.com';

function PlaceList({ places, checkIsAlreadyAdded, onAdd, onRemove, className }) {
  const renderAddressAnchor = address => {
    if (address.split(' ').length === 1) return <a href="#" onClick={e => e.preventDefault()}>{address}</a>; // prettier-ignore
    return <a href={`${googleUrl}/maps/place/${address}`} target="_blank" rel="noreferrer">{address}</a>; // prettier-ignore
  };

  return places === false ? (
    'asd'
  ) : (
    <ul className={className}>
      {places.map(place => {
        const { id, name, address, category, iconUrl } = place;
        const isAlreadyAdded = checkIsAlreadyAdded && checkIsAlreadyAdded(id);
        // <PlaceListItem />
        return (
          <li key={id} className="PlaceList-item">
            <p className="PlaceList-title">
              <a
                href={`${googleUrl}/search?q=${address} ${name}`}
                target="_blank"
                rel="noreferrer">
                {name}
              </a>
            </p>

            <p className="PlaceList-address">
              <span>주소</span>
              {renderAddressAnchor(address)}
            </p>

            <img
              className="PlaceList-icon"
              src={iconUrl}
              alt={category}
              width="36px"
              height="36px"
            />

            {/* onAdd, onRemove */}
            {}
            {onAdd && onRemove && (
              <button
                type="button"
                aria-label={isAlreadyAdded ? '리스트에서 제거' : '리스트에 추가'}
                onClick={() => (isAlreadyAdded ? onRemove(place) : onAdd(place))}
                className={`PlaceList-btn ${isAlreadyAdded ? 'bg_added' : 'bg_add'}`}
              />
            )}

            {/* only onRemove */}
            {!onAdd && onRemove && (
              <button
                type="button"
                aria-label="리스트에서 제거"
                onClick={() => onRemove(place)}
                className="PlaceList-btn bg_remove"
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}

PlaceList.defaultProps = {
  checkIsAlreadyAdded: undefined,
  onAdd: undefined,
  onRemove: undefined,
  className: 'PlaceList',
};

PlaceList.propTypes = {
  places: PropTypes.arrayOf(PropTypes.object).isRequired,
  checkIsAlreadyAdded: PropTypes.func,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
  className: PropTypes.string,
};

export default React.memo(PlaceList);
