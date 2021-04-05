import React, { useState, useEffect } from "react";
import axios from "axios";

export const Player = ({token}) => {
    const [songName, setSongName] = useState("Charlies Awesome Beats");
    const [artist, setArtist] = useState("");
    const [imgURL, setImgURL] = useState("https://play-lh.googleusercontent.com/IeNJWoKYx1waOhfWF6TiuSiWBLfqLb18lmZYXSgsH1fvb8v1IYiZr5aYWe0Gxu-pVZX3");
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();
    const [paused, setPaused] = useState(false);

    const GetData = () => {
        axios.get("https://api.spotify.com/v1/me/player", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(res => {
            setData(res);
            console.log(res);
            setImgURL(res.data.item.album.images[1].url);
            setSongName(res.data.item.name);
            setArtist(res.data.item.artists[0].name);
            setLoading(false);
            setPaused(!res.data.is_playing);
        })
        .catch(err => console.log(err));
    }

    const ResumePlay = () => {
        axios.put("https://api.spotify.com/v1/me/player/play", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(res => {
            setPaused(false);
            GetData();
        })
        .catch(err => console.log(err));
    }

    const PausePlay = () => {
        axios.put("https://api.spotify.com/v1/me/player/pause", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(res => {
            setPaused(true);
            GetData();
        })
    }

    useEffect(() => {
        const updateInfo = setInterval(() => {
            GetData();
        }, 1000);
        
        return () => {
            clearInterval(updateInfo);
        }

    }, [])

    if (loading) return(
        <div>
            <h1>Loading...</h1>
        </div>
    )
    
    let pauseClassname = "";
    let playClassname = "";
    if (paused) {
        playClassname = "MediaIcon Off";
        pauseClassname = "MediaIcon On";
    }
    else {
        playClassname = "MediaIcon On";
        pauseClassname = "MediaIcon Off";
    }

    return(
        <div className="Player">
            <div className="SongCorner">
                <div className="SongName">
                    <marquee className="SongMarquee">
                        <span className="SongTitle">{songName}</span><br /><span className="SongArtist">{artist}</span>
                    </marquee>
                </div>
            </div>
            <div className="AlbumCorner">
                <div className="AlbumCover">
                    <img src={imgURL} />
                </div>
            </div>
            <div className="MediaControl">
                <div className="Play">
                    <button className="MediaButton" onClick={ResumePlay}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={playClassname} fill="none" viewBox="0 0 24 24">
                            <path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                </div>
                <div className="Pause">
                    <button className="MediaButton" onClick={PausePlay}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={pauseClassname} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                </div>
                <div className="FastForward">
                    <button className="MediaButton">
                        <svg xmlns="http://www.w3.org/2000/svg" className="MediaIcon Off" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z" />
                        </svg>
                    </button>
                </div>
                <div className="FastBackwards">
                    <button className="MediaButton">
                        <svg xmlns="http://www.w3.org/2000/svg" className="MediaIcon Off" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="Cassette">
                <div className="RightBlackBox" />
                <div className="LeftWheel">
                    <div className="InnerWheel">
                        <div className="SmallWheel">
                            <div className="SmallCross">
                                <div className="CrossArmUp" />
                                <div className="CrossArmAcross" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="RightWheel">
                    <div className="InnerWheel">
                        <div className="SmallWheel">
                            <div className="SmallCross">
                                <div className="CrossArmUp" />
                                <div className="CrossArmAcross" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

/* 
<div className="PlayButtons">
                    <div className="WhiteTriangle" />
                    <div className="WhiteOutlineTriagnle" />
                </div>
*/