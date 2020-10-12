import React from 'react';
import PropTypes from 'prop-types';
import './HomeWeatherCurrent.css';

const HomeWeatherCurrent = ({ currentWeather }) => {
  const { temp, iconUrl, desc, time } = currentWeather;

  return Object.keys(currentWeather).length === 0 ? (
    <></>
  ) : (
    <div className="HomeWeatherCurrent minor-text">
      <h5 className="HomeWeatherCurrent-heading">({time} 기준)</h5>
      <span className="HomeWeatherCurrent-temp">{temp}℃</span>
      <img src={iconUrl} alt={desc} title={desc} width="24px" height="24px" />
    </div>
  );
};

HomeWeatherCurrent.propTypes = {
  currentWeather: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
};

export default HomeWeatherCurrent;
