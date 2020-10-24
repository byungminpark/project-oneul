/* eslint-disable no-unused-expressions */
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Filter from '../../common/components/Filter';
import './Home.scss';
import HomeSearchBar from './components/HomeSearchBar';
import HomeMain from './components/HomeMain';

import openWeatherAPI from './APIs/openWeatherAPI';
import fourSquareAPI from './APIs/fourSquareAPI';
import FILTERS from './constants/FILTERS.json';

const FILTERS_NAMES = Object.keys(FILTERS);
const { offsetGap } = fourSquareAPI;

function Home({ onAddPlace, onRemovePlace, checkIsAlreadyAdded }) {
  // for conditional rendering
  const [didFirstRequest, setDidFirstRequest] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // for fetch
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState(FILTERS_NAMES[0]);
  const [isMorePlaces, setIsMorePlaces] = useState();
  const offset = useRef(0);
  // for data
  const [weathers, setWeathers] = useState([]);
  const [places, setPlaces] = useState([]);

  // Side effect functions for handlers
  const onSearchEffect = placesLength => {
    setDidFirstRequest(true);
    offset.current = offsetGap;
    placesLength < offsetGap ? setIsMorePlaces(false) : setIsMorePlaces(true);
  };

  const searchMoreEffect = placesLength => {
    offset.current += offsetGap;
    if (placesLength < offsetGap) setIsMorePlaces(false);
  };

  // Handlers
  const handleChange = e => setInput(e.target.value);
  const handleFilter = e => setFilter(e.target.innerText);

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true); // loading: true
    const fetchedWeathers = await openWeatherAPI.fetch(input);
    const fetchedPlaces = await fourSquareAPI.fetch(input, filter, 0);
    setWeathers(fetchedWeathers);
    setPlaces(fetchedPlaces);
    onSearchEffect(fetchedPlaces.length); // side-effect
    setIsLoading(false); // loading: false
  };

  const searchMore = async () => {
    const morePlaces = await fourSquareAPI.fetch(input, filter, offset.current);
    if (morePlaces.length === 0) return setIsMorePlaces(false); // if return
    setPlaces(places.concat(morePlaces));
    searchMoreEffect(morePlaces.length); // side-effect
  };

  return (
    <main className="Home">
      {/* Header */}
      <header className="Home-header">
        <h2 className="visually-hidden">장소 검색</h2>
        <HomeSearchBar
          input={input}
          isInputValid={places !== false}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
        <Filter
          filters={FILTERS_NAMES}
          currentFilter={filter}
          handleClick={handleFilter}
        />
      </header>

      {/* Contents */}
      {isLoading ? (
        <div className="Home-loader bg_spinner" />
      ) : (
        <HomeMain
          didFirstRequest={didFirstRequest}
          weathers={weathers}
          places={places}
          checkIsAlreadyAdded={checkIsAlreadyAdded}
          onAddPlace={onAddPlace}
          onRemovePlace={onRemovePlace}
          searchMore={searchMore}
          isMorePlaces={isMorePlaces}
        />
      )}
    </main>
  );
}

Home.propTypes = {
  onAddPlace: PropTypes.func.isRequired,
  onRemovePlace: PropTypes.func.isRequired,
  checkIsAlreadyAdded: PropTypes.func.isRequired,
};

export default Home;
