import React, { useState, useEffect, useRef } from 'react';
import './Clock.scss';

const Clock = () => {
  const [date, setDate] = useState(new Date());
  const colonRef = useRef(null);
  // constants
  const krDate = new Intl.DateTimeFormat('ko-KR', { month: 'long', day: '2-digit' }).format(date); // prettier-ignore

  useEffect(() => {
    const timer = setInterval(() => {
      const isVisible = colonRef.current.style.visibility === 'visible';
      colonRef.current.style.visibility = isVisible ? 'hidden' : 'visible';
      setDate(new Date());
    }, 700);
    return function cleanup() { clearInterval(timer) }; // prettier-ignore
  }, []);

  const prefixZero = num => {
    const prefix = num.toString().length === 1 ? '0' : '';
    return prefix + num;
  };

  return (
    <aside className="Clock">
      <p className="Clock-date">{krDate}</p>

      <p className="Clock-time">
        {prefixZero(date.getHours())}
        {/* prettier-ignore */}
        <span ref={colonRef} style={{ visibility: 'visible' }}>:</span>
        {prefixZero(date.getMinutes())}
      </p>
    </aside>
  );
};

export default Clock;
