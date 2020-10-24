import React from 'react';
import PropTypes from 'prop-types';
import './HomeWeatherList.scss';

function HomeWeatherList({ weathers }) {
  if (weathers === false)
    return <span className="HomeWeatherList-message">'결과 없음'</span>;

  return (
    <ul className="HomeWeatherList">
      {weathers.map(({ iconUrl, desc, temp, time, key }) => {
        return (
          <li key={key} className="HomeWeatherList-item">
            <p className="HomeWeatherList-time">
              {time}
              <span className="HomeWeatherList-unit">시</span>
            </p>

            <div className="HomeWeatherList-contents">
              <img
                className="HomeWeatherList-icon"
                src={iconUrl}
                alt={desc}
                title={desc}
                width="36px"
                height="36px"
              />

              <p className="HomeWeatherList-temp">
                {temp}
                <span className="HomeWeatherList-unit">℃</span>
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

HomeWeatherList.propTypes = {
  weathers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default HomeWeatherList;
