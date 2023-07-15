import React, { useState, useEffect } from 'react';


//https://blog.greenroots.info/how-to-create-a-countdown-timer-using-react-hooks Thanks!!!
const Countdown = ({ dateString }) => {
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const remainingTime = new Date(dateString).getTime() - new Date().getTime();
      
      if (remainingTime <= 0) {
        clearInterval(interval);
        setCountdown('Countdown ended!');
      } else {
        const remaining = new Date(remainingTime);
        const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
        const hours = remaining.getUTCHours();
        const minutes = remaining.getUTCMinutes();
        const seconds = remaining.getUTCSeconds();

        const countdownString = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        setCountdown(countdownString);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [dateString]);

  return <div>{countdown}</div>;
};

export default Countdown;