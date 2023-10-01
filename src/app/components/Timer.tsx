'use client';

import React from 'react';
import {useState, useEffect} from 'react';

const Timer = () => {
    const INITIAL_TIME = 25 * 60; // 25 minutes en secondes

    const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
    const [isActive, setIsActive] = useState(false);
    const [completedCycles, setCompletedCycles] = useState(0);

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);

            return() => clearInterval(timer);
        } else if (timeLeft === 0) { // Gérer la fin du cycle et passer à la pause ou au prochain cycle
        }
    }, [isActive, timeLeft]);

    const startTimer = () => setIsActive(true);
    const stopTimer = () => setIsActive(false);
    const resetTimer = () => setTimeLeft(INITIAL_TIME);

    return (
        <div>
            <div> {
                Math.floor(timeLeft / 60).toString().padStart(2, '0')
            }: {
                (timeLeft % 60).toString().padStart(2, '0')
            } </div>
            <button onClick={startTimer}>Démarrer</button>
            <button onClick={stopTimer}>Arrêter</button>
            <button onClick={resetTimer}>Réinitialiser</button>
        </div>
    );
};

export default Timer;
