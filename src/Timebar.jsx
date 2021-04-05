import React, { useEffect, useState } from "react";

// Set StartGlobalTime getTime()
// Set Width To % startTime / totalTime

// Every 100 ms Get The Difference Between Start Time And Now Add To Track Progress 
// Get New Width


export const TimeBar = ({startTime, totalTime, getData, paused}) => {
    const [time, setTime] = useState(Date.now())
    const [timeInterval, setTimeInterval] = useState();
    const [progress, setProgress] = useState(startTime);
    const [perc, setPerc] = useState(0);

    useEffect(() => {
        
        const interval = setInterval(() => {
            let diff = Date.now() - time;
            if (!paused) {
                clearInterval(timeInterval);
                setProgress(progress+diff);
                setPerc((progress+diff)/totalTime*100);
            }
            else {
                setTimeInterval(setInterval(() => {
                    getData();
                }, 500));
            }
            setTime(Date.now());
        }, 10);

        return  () => {
            clearInterval(interval);
            clearInterval(timeInterval);
        }
    }, []);

    let rounded = Math.round(perc*100) / 100;
    if (rounded % 10.01 === 0) getData();

    const style = {
        width: perc,
        backgroundColor: "red"
    }
    
    return(
        <div style={style}>{perc}</div>
    )
}