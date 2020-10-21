import React from 'react';
import './HomeIntro.scss';

function HomeIntro() {
  return (
    <div className="HomeIntro">
      <dl>
        <dt>1. 검색어 입력</dt>
        <dd className="HomeIntro-dd">'가락동' or '이태원동 맛집', '마포구 카페'</dd>
        <br />

        <dt>2. 필터 지정</dt>
        <dd className="HomeIntro-dd">'인기순' or '거리순'</dd>
      </dl>
    </div>
  );
}

export default HomeIntro;
