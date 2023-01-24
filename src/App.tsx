import { useState, useEffect } from "react";
import { CgPlayButtonO, CgPlayPauseO } from "react-icons/cg";
import { BsArrowUp, BsArrowDown } from "react-icons/bs";
import { VscDebugRestart } from "react-icons/vsc";
import "./styles/app.css";

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(1500);
  const [timingType, setTimingType] = useState("SESSION");
  const [play, setPlay] = useState(false);
  let title = timingType === "SESSION" ? "Session" : "Break";
  const audio: HTMLAudioElement | any = document.getElementById("beep");

  const timeout = setTimeout(() => {
    if (timeLeft && play === true) {
      setTimeLeft(timeLeft - 1);
    }
  }, 1000);

  const handleBreakIncrease = () => {
    if (breakLength < 60) {
      setBreakLength((prevState) => prevState + 1);
    }
  };

  const handleBreakDecrease = () => {
    if (breakLength > 1) {
      setBreakLength((prevState) => prevState - 1);
    }
  };

  const handleSessionIncrease = () => {
    if (sessionLength < 60) {
      setSessionLength((prevState) => prevState + 1);
    }
  };

  const handleSessionDecrease = () => {
    if (sessionLength > 1) {
      setSessionLength((prevState) => prevState - 1);
    }
  };

  const handleReset = () => {
    clearTimeout(timeout);
    setPlay(false);
    setTimeLeft(1500);
    setBreakLength(5);
    setSessionLength(25);
    setTimingType("SESSION");
    audio.pause();
    audio.currentTime = 0;

    setTimeout(() => {
      checkValues();
    }, 600);
  };

  const checkValues = () => {
    if (timeLeft != 1500) {
      setTimeLeft(25 * 60);
      return;
    }
  };

  const timeFormatter = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft - minutes * 60;
    return `${formatTimeDigit(minutes)}:${formatTimeDigit(seconds)}`;
  };

  const formatTimeDigit = (time: number | string) => {
    return time < 10 ? `0${time}` : time;
  };

  const handlePlay = () => {
    clearTimeout(timeout);
    setPlay(!play);
  };

  const resetTimer = () => {
    if ((timeLeft <= 0 || !timeLeft) && timingType === "SESSION") {
      setTimeLeft(breakLength * 60);
      setTimingType("BREAK");
      audio.play();
    } else if ((timeLeft <= 0 || !timeLeft) && timingType === "BREAK") {
      setTimeLeft(sessionLength * 60);
      setTimingType("SESSION");
      audio.pause();
      audio.currentTime = 0;
    }
  };

  const clock = () => {
    if (play === true) {
      timeout;
      resetTimer();
      return;
    }
    clearTimeout(timeout);
  };

  useEffect(() => {
    setTimeLeft(sessionLength * 60);
  }, [sessionLength]);

  useEffect(() => {
    clock();
    return () => {
      clearTimeout(timeout);
    };
  }, [play, timeLeft, timeout]);

  return (
    <div className="app">
      <div className="wrapper">
        <h2 className="main-title">25 + 5 Clock</h2>
        <div className="break-session-length">
          <div className="length-control">
            <h3 id="break-label">Break Length</h3>
            <div>
              <button
                disabled={play}
                onClick={handleBreakDecrease}
                className="icon-btn"
                id="break-decrement"
              >
                <BsArrowDown />
              </button>
              <strong id="break-length">{breakLength}</strong>
              <button
                disabled={play}
                onClick={handleBreakIncrease}
                className="icon-btn"
                id="break-increment"
              >
                <BsArrowUp />
              </button>
            </div>
          </div>
          <div className="length-control">
            <h3 id="session-label">Session Length</h3>
            <div>
              {/*disabled={play} onClick={}*/}
              <button
                disabled={play}
                onClick={handleSessionDecrease}
                className="icon-btn"
                id="session-decrement"
              >
                <BsArrowDown />
              </button>
              <strong id="session-length">{sessionLength}</strong>
              <button
                disabled={play}
                onClick={handleSessionIncrease}
                className="icon-btn"
                id="session-increment"
              >
                <BsArrowUp />
              </button>
            </div>
          </div>
        </div>
        <div className="timer-wrapper">
          <h2 id="timer-label">{title}</h2>
          <h3 id="time-left">{timeFormatter()}</h3>
        </div>
        <div id="timer-control">
          <button onClick={handlePlay} className="icon-btn" id="start_stop">
            {play ? <CgPlayPauseO /> : <CgPlayButtonO />}
          </button>
          <button onClick={handleReset} className="icon-btn" id="reset">
            <VscDebugRestart />
          </button>
        </div>
        <div className="author">
          <span>Coded by</span>
          <a href="https://github.com/Gustavo-Victor" target="_blank">
            Gustavo Victor
          </a>
        </div>
      </div>
      <audio
        id="beep"
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        preload="auto"
      />
    </div>
  );
}

export default App;
