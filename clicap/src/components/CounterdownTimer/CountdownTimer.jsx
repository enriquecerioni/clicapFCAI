import {useState, useEffect} from 'react';
import { Loader } from '../Loader/Loader';
import './CountdownTimer.css';
import {getRemainingTimeUntilMsTimestamp} from './Utils/CountdownTimerUtils';

const defaultRemainingTime = {
    seconds: '00',
    minutes: '00',
    hours: '00',
    days: '00'
}

const CountdownTimer = ({countdownTimestampMs}) => {
    const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);
    const [loader,setLoader] = useState(true);

    useEffect(() => {
        const intervalId = setInterval(() => {
            updateRemainingTime(countdownTimestampMs);
            setLoader(false);
        }, 1000);
        return () => clearInterval(intervalId);
    },[countdownTimestampMs]);

    function updateRemainingTime(countdown) {
        setRemainingTime(getRemainingTimeUntilMsTimestamp(countdown));
    }

    return(
        <div className="countdown-timer">
            <div className='counter'>
                { !loader ? <> 
                    <span className='numberCounter'>{remainingTime.days}</span>
                    <span>días</span>
                    </>
                    : <Loader />
                }
            </div>
            <div className='counter'>
                { !loader ? <> 
                    <span className="two-numbers numberCounter">{remainingTime.hours}</span>
                    <span>horas</span>
                    </>
                    : <Loader />
                }
            </div>
            <div className='counter'>
            { !loader ? <>
                <span className="two-numbers numberCounter">{remainingTime.minutes}</span>
                <span>minutos</span>
                </>
                : <Loader />
            }
            </div>
            <div className='counter'>
            { !loader ? <>
                <span className="two-numbers numberCounter">{remainingTime.seconds}</span>
                <span>segundos</span>
                </>
                : <Loader />
            }
            </div>
        </div>
    );
}

export default CountdownTimer;