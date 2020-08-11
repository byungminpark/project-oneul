import React from 'react';
import './App.css';
import Image from './circle.jpg';

const App = () => {
  // ES6+ 테스트
  (function test() {
    /* eslint-disable prefer-object-spread */
    console.log(
      new Promise(() => 'I am a Promise.'),
      Object.assign({}, { name: 'Park' })
    );
  })();

  return (
    <>
      <section className="App">
        'I am a section.'
        <img src={Image} alt="" />
      </section>
    </>
  );
};

export default App;
