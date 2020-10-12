import React from 'react';
import PropTypes from 'prop-types';
import './HomeWeather.css';
import HomeWeatherCurrent from './HomeWeatherCurrent';
import HomeWeatherHourly from './HomeWeatherHourly';

const HomeWeather = ({ weathers }) => {
  return (
    <div className="HomeWeather">
      {weathers === false ? (
        '결과없음'
      ) : (
        <>
          <HomeWeatherCurrent currentWeather={weathers.current} />
          <HomeWeatherHourly hourlyWeather={weathers.hourly} />
        </>
      )}
    </div>
  );
};

HomeWeather.propTypes = {
  weathers: PropTypes.shape({ current: PropTypes.object, hourly: PropTypes.array }).isRequired, // prettier-ignore
};

export default HomeWeather;
