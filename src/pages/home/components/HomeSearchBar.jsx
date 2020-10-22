import React from 'react';
import PropTypes from 'prop-types';
import './HomeSearchBar.scss';

const HomeSearchBar = ({ input, isInputValid, handleChange, handleSubmit }) => {
  return (
    <form className="HomeSearchBar" onSubmit={handleSubmit}>
      <legend className="visually-hidden">관심있는 장소 검색</legend>
      <input
        type="text"
        value={input}
        placeholder="ex)  마포구 맛집"
        onChange={handleChange}
        className={isInputValid ? 'HomeSearchBar-input' : 'HomeSearchBar-input_warning'} // prettier-ignore
      />
      <button
        type="submit"
        aria-label="검색하기"
        disabled={!input}
        className="HomeSearchBar-button bg_search"
      />
    </form>
  );
};

HomeSearchBar.propTypes = {
  input: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  isInputValid: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default HomeSearchBar;
