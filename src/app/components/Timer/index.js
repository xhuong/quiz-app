import React, { useState, useEffect } from "react";

function Timer({ isActiveTimer, handleCompletedQuiz }) {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(isActiveTimer);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }

    return () => {
      handleCompletedQuiz(seconds);
      clearInterval(interval);
    };
  }, [isActive, seconds]);

  return (
    <div className="mb-2">
      <h1>Time: {seconds}s</h1>
    </div>
  );
}

export default Timer;
