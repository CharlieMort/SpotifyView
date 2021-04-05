import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { TimeBar } from "./Timebar";


export const Player = ({token}) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();

    const GetData = () => {
        axios.get("https://api.spotify.com/v1/me/player", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(res => {
            setData(res);
            setLoading(false);
        })
        .catch(err => console.log(err));
    }

    useEffect(() => {
        GetData();
    }, [])

    if (loading) return(
        <div>
            <h1>Loading...</h1>
        </div>
    )

    console.log(data);

    return(
        <div>
            <h1>Whos Logged In... YOU ARE</h1>
            <img src={data.data.item.album.images[1].url} />
            <h1>{data.data.item.name}</h1>
            <TimeBar startTime={parseInt(data.data.progress_ms)} totalTime={parseInt(data.data.item.duration_ms)} getData={GetData} paused={!data.data.is_playing} />
        </div>
    )
}