import React, { useState } from 'react'
import MainImage from '../../assets/MainImage.jpg'
import '../../global.scss'
import './Home.scss'
import Footer from '../../components/footer/Footer';
import song from '../../assets/juice.mp3'
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'

function Home() {
  //STATE
  const [isSongPlaying, setIsSongPlaying] = useState(false)
  //OTHERS
  const { t } = useTranslation();

  function toggleThemeSong(value) {
    const songPlayer = document.getElementById('song-player')

    if (value) {
      songPlayer.play();
      songPlayer.muted = false;
      songPlayer.currentTime = 80
    } else {
      songPlayer.pause();
      songPlayer.currentTime = 80
    }

    setIsSongPlaying(value)
  }

  return (
    <div id="app" className="App">
      <Helmet>
        <title>Camila Styles - A birthday website based on Harry Style's website</title>
        <meta
          name="description"
          content="Camila Styles - Here you can see photos and informations about Camila's birthday party. A birthday website based on Harry Styles website."
        />
      </Helmet>

      <div className="main-content">
        <div className="main-photo-container">
          <img alt="Harry Styles" src={MainImage} className="main-image" />
        </div>
        <div className="main-text-container">
          <h1>{t("homePage.firstTitle")}</h1>
          <h3>{t("homePage.secondTitle")}</h3>
          <h1>{t("homePage.thirdTitle")}</h1>
        </div>
      </div>

      <div className="player-container">
        <h1>{t("homePage.themeSong")}</h1>
        <p>Lizzo ft. Harry Styles - Juice [LIVE @ The Fillmore Miami Beach] | SiriusXM</p>
        <FontAwesomeIcon
          className="player"
          onClick={() => toggleThemeSong(isSongPlaying ? false : true)}
          icon={isSongPlaying ? faPause : faPlay}
        />
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
}


export default withRouter(Home);