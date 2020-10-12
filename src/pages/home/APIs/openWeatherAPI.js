/* eslint-disable no-alert */
import axios from 'axios';

const apiUrl = 'https://api.openweathermap.org/data/2.5';
const key = '755f1b1d9db1f85ae0fc9271008f1ccc';
const optionToExclude = 'minutely,daily';

const openWeatherAPI = {
  async fetch(searchTerm) {
    const [locationTerm] = searchTerm.split(' ');
    const locationTermCode = encodeURIComponent(locationTerm);

    try {
      const { lon, lat } = await this.locationToCoor(locationTermCode);
      const urlToFetch = `${apiUrl}/onecall?lat=${lat}&lon=${lon}&exclude=${optionToExclude}&appid=${key}&lang=kr&&units=metric`;
      let { data: { current, hourly } } = await axios.get(urlToFetch); // prettier-ignore

      current = this.formatCurrent(current);
      hourly = this.formatHourly(hourly);
      return { current, hourly };
    } catch (e) {
      console.error('에러', e);
      if (e.response.status === 400) return false;
      return { current: {}, hourly: [] };
    }
  },

  // HELPERS of fetch Method.
  async locationToCoor(location) {
    try {
      const urlToFetch = `${apiUrl}/weather?q=${location}&appid=755f1b1d9db1f85ae0fc9271008f1ccc`;
      const { data: { coord } } = await axios.get(urlToFetch); // prettier-ignore
      return coord;
    } catch (e) {
      console.error(e);
    }
    return {};
  },

  formatCurrent(current) {
    return {
      main: this.translateMain(current.weather[0].main),
      temp: Math.round(current.temp),
      iconUrl: `http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`,
      desc: current.weather[0].description,
      time: Intl.DateTimeFormat('en-GB', { hour: 'numeric', minute: 'numeric' }).format(new Date(current.dt * 1000)) // prettier-ignore
    };
  },

  formatHourly(hourly) {
    const todayHourly = this.filterNoToday(hourly);
    return todayHourly.map(item => {
      return {
        time: new Date(item.dt * 1000).getHours(),
        iconUrl: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
        desc: item.weather[0].description,
        temp: Math.round(item.temp),
        key: item.dt,
      };
    });
  },

  // HELPERS of format Methods.
  translateMain(main) {
    switch (main) {
      case 'Clear':
        return '맑음';
      case 'Clouds':
        return '흐림';
      case 'Drizzle':
        return '이슬비';
      case 'Rain':
        return '비';
      case 'Thunderstorm':
        return '뇌우';
      case 'Snow':
        return '눈';
      case 'Mist':
        return '박무';
      default:
        return main;
    }
  },
  filterNoToday(hourly) {
    return hourly.filter(item => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      const todayDate = new Date().toLocaleDateString();

      return date === todayDate;
    });
  },
};

export default openWeatherAPI;
