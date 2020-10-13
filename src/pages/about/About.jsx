import React from 'react';
import './About.css';

const About = () => {
  return (
    <main className="About">
      <table className="About-table">
        <caption className="visually-hidden">제작자 정보</caption>
        <thead className="visually-hidden">
          <tr>
            <th scope="col">구분</th>
            <th scope="col">설명</th>
          </tr>
        </thead>
        <tbody>
          <tr className="About-traw">
            <th scope="row">이름</th>
            <td>박 병 민</td>
          </tr>
          <tr className="About-traw">
            <th scope="row">희망 직무</th>
            <td>프론트엔드 개발</td>
          </tr>
        </tbody>
      </table>
      {/* prettier-ignore */}
      <p className="About-further">
        본 프로젝트 관련 사항은 <a href="https://github.com/byungminpark/project-oneul" target="_blank" rel="noreferrer">깃헙 README</a>를 참고해주세요.
        <span className="About-hashs">#ES6+ #React #Webpack #Babel #IE11</span>
      </p>
    </main>
  );
};

export default About;
