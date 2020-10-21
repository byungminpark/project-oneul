import React from 'react';
import PropTypes from 'prop-types';
import './HomeArticle.scss';

const HomeArticle = ({ title, source, children }) => {
  return (
    <article className="HomeArticle">
      <h4>{title}</h4>
      {children}
      <footer className="HomeArticle-footer copyright">Data from ®{source}</footer>
    </article>
  );
};

HomeArticle.propTypes = {
  title: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.elementType, PropTypes.array]).isRequired,
};

export default HomeArticle;
