import React, { useEffect, useState } from "react";
import axios from "axios";
import sporty from "../assets/image/download.png"
import search from "../assets/image/search.png"
import home from "../assets/image/home.png"
import "../assets/Style/music.css"
const Sportify = () => {
  const endPoint = "https://accounts.spotify.com/api/token";
  const clientId = "79fd583f06ef413894d717d99a8d34d4";
  const clientSecret = "d31db27ad9b84a998492699463a124bf";
  const playlistId = "37i9dQZF1DWYkaDif7Ztbp"; // Replace with the actual playlist ID

  const [playlistInfo, setPlaylistInfo] = useState(null);
  const [currentAudio, setCurrentAudio] = useState(new Audio()); // Initialize with an empty Audio object

  const getToken = () => {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };
    const data = new URLSearchParams();
    data.append("client_id", clientId);
    data.append("client_secret", clientSecret);
    data.append("grant_type", "client_credentials");

    // Send POST request to get access token
    axios
      .post(endPoint, data, { headers })
      .then((response) => {
        const accessToken = response.data.access_token;

        // Set the headers for the playlist request
        const playlistHeaders = {
          Authorization: `Bearer ${accessToken}`,
        };

        // Send GET request to get playlist information
        axios
          .get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
            headers: playlistHeaders,
          })
          .then((playlistResponse) => {
            // Handle the playlist response
            setPlaylistInfo(playlistResponse.data);
            console.log(playlistResponse.data);
          })
          .catch((playlistError) => {
            // Handle playlist errors
            console.error("Error fetching playlist:", playlistError);
          });
      })
      .catch((error) => {
        // Handle errors
        console.error("Error fetching token:", error);
      });
  };

  useEffect(() => {
    getToken();
  }, []);

  const playAudio = (previewUrl) => {
    currentAudio.pause();
    currentAudio.src = previewUrl;
    currentAudio.play();
  };

  return (
    <main>

      <center>
        <div className="flex1">
          <h1>SPORTIFY</h1>
          <div className="image">
            <img src={sporty} alt="" />
          </div>
        </div>
      </center>
      <center>
        <div className="flex-cover">
          <div className="cover">
            <div className="flex">
              <div className="cheout">
                <div className="dip-me">
                  <div className="home">
                    <h3>Home</h3>
                  </div>
                  <div className="home-img">
                    <img src={home} alt="" />
                  </div>
                </div>
                <center className="search ">
                  <input type="text" placeholder="Search for your music" />
                  <div className="sear">
                    <img src={search} alt="" />
                  </div>
                </center>
              </div>
            </div>
            <div className="flex-sub"></div>
          </div>
          <div className="flex2">
            {playlistInfo && (

              <div class="card">
                <div className='disp' >
                  {playlistInfo.tracks.items.map((track, i) => (
                    <div className="flexus">
                      <div class="playing">
                        <div class="greenline line-1"></div>
                        <div class="greenline line-2"></div>
                        <div class="greenline line-3"></div>
                        <div class="greenline line-4"></div>
                        <div class="greenline line-5"></div>
                      </div>
                      <div key={i} onClick={() => playAudio(track.track.preview_url)}>
                        <p> <span>Title:</span> {track.track.name}</p>
                        <p><span>Artist(s)</span> : {track.track.artists.map(artist => artist.name).join(', ')}</p>
                      </div>
                    </div>

                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </center>

      <div className="control">
        <audio controls ref={(audio) => { setCurrentAudio(audio); }}></audio>
      </div>
    </main>
  );
};

export default Sportify;
