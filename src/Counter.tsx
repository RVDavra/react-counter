import React, { useCallback, useState } from "react";

type AppState = "START" | "PAUSE";

const Counter = () => {
  const [count, setCount] = useState(0);
  const [counter, setCounter] = useState<number | null>(null);
  const [currentState, setCurrentState] = useState<AppState>("PAUSE");

  const startInterval = useCallback(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);
    setCounter(interval);
  }, [setCount, setCounter]);

  const stopInterval = useCallback(() => {
    clearInterval(counter as number);
    setCounter(null);
  }, [counter, setCounter]);

  const reset = () => {
    stopInterval();
    setCount(0);
  };

  const pause = () => {
    setCurrentState("PAUSE");
    stopInterval();
  };

  const start = () => {
    setCurrentState("START");
    startInterval();
  };

  const currentButton =
    currentState === "START" ? (
      <button onClick={pause}> PAUSE </button>
    ) : (
      <button onClick={start}> START </button>
    );

  return (
    <>
      <div> Counter: {count}</div>
      <div className="buttonsContainer">
        <div>{currentButton}</div>
        <div>
          <button onClick={reset}> RESET </button>
        </div>
      </div>
    </>
  );
};

export default Counter;
