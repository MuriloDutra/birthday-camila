import React, { useEffect, useState } from 'react'
import MainImage from '../../assets/MainImage.jpg'
import '../../global.scss'
import './Home.scss'
import Footer from '../../components/footer/Footer';
import song from '../../assets/juice.mp3'
import Consumer from '../../context/ApplicationContext';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'


function Home() {
  const [isSongPlaying, setIsSongPlaying] = useState(false)

  useEffect(() => {
    document.title = 'Camila Araújo'
  }, [])


  function toggleThemeSong(value){
    const songPlayer = document.getElementById('song-player')
    
    if(value){
      songPlayer.play();
      songPlayer.muted = false;
      songPlayer.currentTime = 80
    }else{
      songPlayer.pause();
      songPlayer.currentTime = 80
    }

    setIsSongPlaying(value)
  }
  

  return (
    <Consumer>
      { context => {
        const { homePage } = context.language
        
        return (
          <div id="app" className="App">
            <div className="main-content">
              <div className="main-photo-container">
                <img alt="Harry Styles" src={MainImage} className="main-image"/>
              </div>
              <div className="main-text-container">
                <h1>{homePage.firstTitle}</h1>
                <h3>{homePage.secondTitle}</h3>
                <h1>{homePage.thirdTitle}</h1>
              </div>
            </div>

            <div className="player-container">
              <h1>{homePage.themeSong}</h1>
              <p>Lizzo ft. Harry Styles - Juice [LIVE @ The Fillmore Miami Beach] | SiriusXM</p>
              <FontAwesomeIcon className="player" onClick={() => toggleThemeSong(isSongPlaying ? false : true)} icon={isSongPlaying ? faPause : faPlay} />
            </div>

            <div className="main-video-container">
              <iframe
                title="A Harry Styles video"
                className='main-video'
                src="https://www.youtube-nocookie.com/embed/P3cffdsEXXw"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <audio id="song-player" src={song} muted />
            <Footer />
          </div>
        )
      }}
    </Consumer>
  );
}


export default withRouter(Home);