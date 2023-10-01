'use client';

import React from 'react';
import {useState, useEffect} from 'react';

const Timer = () => {
    const INITIAL_TIME = 25 * 60;
    const WORK_DURATION = 25 * 60;
    const SHORT_BREAK = 5 * 60;
    const LONG_BREAK = 15 * 60;


    const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
    const [isActive, setIsActive] = useState(false);
    const [completedCycles, setCompletedCycles] = useState(0);
    const [currentPhase, setCurrentPhase] = useState('work');


    useEffect(() => {
        if (isActive && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);

            return() => clearInterval(timer);
        } else if (timeLeft === 0) {
            if (currentPhase === 'work') {
                if (completedCycles % 4 === 0) {
                    setCurrentPhase('longBreak');
                    setTimeLeft(LONG_BREAK);
                } else {
                    setCurrentPhase('shortBreak');
                    setTimeLeft(SHORT_BREAK);
                }
            } else {
                setCurrentPhase('work');
                setTimeLeft(WORK_DURATION);
            }
            setCompletedCycles((prev) => prev + 1);
        }
    }, [
        isActive,
        timeLeft,
        currentPhase,
        completedCycles,
        LONG_BREAK,
        SHORT_BREAK,
        WORK_DURATION
    ]);


    const startTimer = () => setIsActive(true);
    const stopTimer = () => setIsActive(false);
    const resetTimer = () => setTimeLeft(INITIAL_TIME);

    return (

        <div>

            <div className="flex min-h-1/2 h-max-1/2 md:h-1/2 flex-col md:flex-row justify-center items-center bg-gradient-to-l sm:bg-gradient-to-t from-[#88adf1] to-[#374b9c]">

                <div className="relative">
                    <div className='relative text-white left-11 text-2xl font-semibold flex flex-col w-24 h-20"'>
                        Phase: {
                        currentPhase.charAt(0).toUpperCase() + currentPhase.slice(1)
                    } </div>
                    <svg className="-rotate-90 h-48 w-48">
                        <circle r="70" cx="90" cy="90" className="fill-transparent stroke-[#88adf1] stroke-[8px]"/>
                        <circle r="70" cx="90" cy="90"
                            style={
                                {
                                    strokeDasharray: "440px"
                                }
                            }
                            className="fill-transparent stroke-white  stroke-[8px]"/>
                    </svg>
                    <div className="text-white relative  left-11 text-2xl font-semibold flex flex-col items-center w-24 h-20">
                        <span className="text-center">
                            {
                            Math.floor(timeLeft / 60).toString().padStart(2, '0')
                        }
                            : {
                            (timeLeft % 60).toString().padStart(2, '0')
                        } </span>

                    </div>
                </div>
            </div>
            <div>
                <button type="button" className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    onClick={startTimer}>Démarrer</button>

                <button type="button" className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    onClick={stopTimer}>Arrêter</button>
                <button type="button" className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    onClick={resetTimer}>Réinitialiser</button>
            </div>
        </div>
    );


};

export default Timer;
