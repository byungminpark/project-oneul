import React from 'react';
import PropTypes from 'prop-types';
import './HomeSearchBar.css';

const HomeSearchBar = ({ title, input, handleInput, isUserInputValid, handleClick }) => {
  const handleEnterDown = e => e.key === 'Enter' && handleClick();

  return (
    <form className="HomeSearchBar" onSubmit={e => e.preventDefault()}>
      <legend className="visually-hidden">{title}</legend>
      <input
        className={isUserInputValid ? 'HomeSearchBar-input' : 'HomeSearchBar-input HomeSearchBar-input_warn'} // prettier-ignore
        onChange={handleInput}
        onKeyDown={handleEnterDown}
        value={input}
        type="text"
      />

      <button
        className="HomeSearchBar-button bg_search"
        onClick={handleClick}
        type="button"
        aria-label="검색"
      />
    </form>
  );
};

HomeSearchBar.propTypes = {
  title: PropTypes.string.isRequired,
  input: PropTypes.string.isRequired,
  handleInput: PropTypes.func.isRequired,
  isUserInputValid: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default HomeSearchBar;
