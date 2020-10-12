import React from 'react';
import PropTypes from 'prop-types';
import './HomeWeatherHourly.css';
import prefixZero from '../../../common/utils/prefixZero';

const HomeWeatherHourly = ({ hourlyWeather }) => {
  return hourlyWeather.length === 0 ? (
    <></>
  ) : (
    <>
      <h5 className="HomeWeatherHourly-heading">시간대별</h5>
      <ul className="HomeWeatherHourly">
        {hourlyWeather.map(({ iconUrl, desc, temp, time, key }) => {
          return (
            <li key={key} className="HomeWeatherHourly-item">
              <p className="HomeWeatherHourly-time">
                {prefixZero(time)}
                <span>시</span>
              </p>

              <div className="HomeWeatherHourly-contents">
                <img
                  className="HomeWeatherHourly-icon"
                  src={iconUrl}
                  alt={desc}
                  title={desc}
                  width="42px"
                  height="42px"
                />

                <p className="HomeWeatherHourly-temp">
                  {temp}
                  <span>℃</span>
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

HomeWeatherHourly.propTypes = {
  hourlyWeather: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default HomeWeatherHourly;
