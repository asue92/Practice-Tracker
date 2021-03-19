import { useState, useRef } from "react";
import axios from "axios";

// SECOND VALUE IS TIMER

const useTimer = (initialState = 0) => {
  const [timer, setTimer] = useState(initialState);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const countRef = useRef(null);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(true);
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };

  const handlePause = () => {
    clearInterval(countRef.current);
    setIsPaused(false);
    // const writeTimer = {
    //   seconds: timer + priorTime,
    // };
    // const userData = {
    //   email: email,
    //   password: password,
    // };
    // const newToken = await axios.post(
    //   "http://localhost:5000/practice-tracker-80315/us-central1/api/login",
    //   userData
    // );
    // localStorage.setItem("AuthToken", `Bearer ${newToken.data.userIdToken}`);
    // axios.defaults.headers.common = {
    //   Authorization: `Bearer ${newToken.data.userIdToken}`,
    // };

    // await axios.post(
    //   "http://localhost:5000/practice-tracker-80315/us-central1/api/user",
    //   writeTimer
    // );
    // handleReset();
  };

  const handleLog = async (priorTime, email, password) => {
    const writeTimer = {
      seconds: timer + priorTime,
    };
    const userData = {
      email: email,
      password: password,
    };
    const newToken = await axios.post(
      "http://localhost:5000/practice-tracker-80315/us-central1/api/login",
      userData
    );
    localStorage.setItem("AuthToken", `Bearer ${newToken.data.userIdToken}`);
    axios.defaults.headers.common = {
      Authorization: `Bearer ${newToken.data.userIdToken}`,
    };

    await axios.post(
      "http://localhost:5000/practice-tracker-80315/us-central1/api/user",
      writeTimer
    );
    handleReset();
  };

  const handleResume = () => {
    setIsPaused(true);
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };

  const handleReset = () => {
    clearInterval(countRef.current);
    setIsActive(false);
    setIsPaused(false);
    setTimer(0);
  };

  return {
    timer,
    isActive,
    isPaused,
    handleStart,
    handlePause,
    handleResume,
    handleReset,
    handleLog,
  };
};

export default useTimer;
