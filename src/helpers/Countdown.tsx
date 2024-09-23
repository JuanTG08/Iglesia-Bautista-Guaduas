import React, { type FC, useState, useEffect } from "react";

const Countdown = ({ targetDate }: { targetDate: string }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft]: any = useState(calculateTimeLeft());
  const timerComponents: any[] = [];
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);

    return () => clearTimeout(timer);
  }, []);
  if (!hydrated) return null;

  Object.keys(timeLeft).forEach((interval) => {
    timerComponents.push(
      <div key={interval}>
        <h3 className="text-white text-5xl text-center">
          {!timeLeft[interval]
            ? "00"
            : timeLeft[interval] < 10
              ? `0${timeLeft[interval]}`
              : timeLeft[interval]}
        </h3>
        <p className="text-center">
          {interval === "days"
            ? "Días"
            : interval === "hours"
              ? "Horas"
              : interval === "minutes"
                ? "Minutos"
                : "Segundos"}
        </p>
      </div>,
    );
    if (interval != "seconds")
      timerComponents.push(
        <span key={interval + ":"} className="text-slate-300 text-3xl">
          :
        </span>,
      );
  });

  return (
    <div className="flex flex-row items-center justify-center gap-5 text-white border-2 rounded-lg py-4">
      {timerComponents.length ? timerComponents : <h2 className="text-white">¡¡Nos encontramos en el evento!!</h2>}
    </div>
  );
};

export default Countdown;
