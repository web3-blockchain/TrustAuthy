import React, { useState } from 'react';
import { useTimer } from 'react-timer-hook';

const Timer = ({ datetime }) => {
  const convertJSTtoUTC = (jstDatetime) => {
    const jstDate = new Date(jstDatetime);
    return new Date(jstDate.getTime() - 0 * 60 * 60 * 1000);
  };
  const expiryTimestamp = convertJSTtoUTC(datetime);
  const { days, hours, minutes, seconds } = useTimer({
    expiryTimestamp,
    onExpire: () => {},
  });
  const formatTime = (time) => String(time).padStart(2, '0');

  return (
    <>
      <p className="p-buy-area__period-text">
        LAST {days}day{days > 1 && 's'}
      </p>
      <p className="p-buy-area__period-time">
        {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
      </p>
    </>
  );
};

export default Timer;
