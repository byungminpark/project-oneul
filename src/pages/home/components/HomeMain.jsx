import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Clock from '../../../common/components/Clock';
import PlaceList from '../../../common/components/PlaceList';
import './HomeMain.scss';
import HomeIntro from './HomeIntro';
import HomeArticle from './HomeArticle';
import HomeWeatherList from './HomeWeatherList';

// prettier-ignore
function HomeMain({ didFirstRequest, onAddPlace, onRemovePlace, weathers, places, checkIsAdded, searchMore, isMorePlaces }) {
  const [isLoading, setIsLoading] = useState();

  const onSearchMore = async () => {
    setIsLoading(true); // loading: true
    await searchMore();
    setIsLoading(false); // loading: false
  }
  
  if (!didFirstRequest) return <HomeIntro />;
  if (places === false) return <span className="HomeMain-message">위치를 올바르게 입력하세요.</span>; // prettier-ignore
  if (places.length === 0) return <span className="HomeMain-message">검색결과가 없습니다.</span>; // prettier-ignore
  return (
    <section className="HomeMain">
      <h3 className="visually-hidden">결과</h3>

      <HomeArticle title="날씨" source="Open Weather">
        <Clock />
        <HomeWeatherList weathers={weathers} />
      </HomeArticle>

      <HomeArticle title="장소" source="Foursquare">
        <PlaceList places={places} checkIsAdded={checkIsAdded} onAdd={onAddPlace} onRemove={onRemovePlace} />
        {isMorePlaces && (isLoading 
          ? <button className="HomeArticle-moreButton bg_spinner" type="button" /> 
          : <button className='HomeArticle-moreButton' onClick={onSearchMore} type="button">More</button>)}
      </HomeArticle>
    </section>
    
  );
}

HomeMain.propTypes = {
  didFirstRequest: PropTypes.bool.isRequired,
  onAddPlace: PropTypes.func.isRequired,
  onRemovePlace: PropTypes.func.isRequired,
  weathers: PropTypes.arrayOf(PropTypes.object).isRequired,
  places: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.bool]).isRequired, // prettier-ignore
  checkIsAdded: PropTypes.func.isRequired,
  searchMore: PropTypes.func.isRequired,
  isMorePlaces: PropTypes.bool.isRequired,
};

export default HomeMain;
