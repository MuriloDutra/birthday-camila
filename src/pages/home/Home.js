import React, { useEffect } from 'react'
import MainImage from '../../assets/MainImage.jpg'
import '../../global.scss'
import './Home.scss'
import Footer from '../../components/footer/Footer';
import song from '../../assets/juice.mp3'
import Consumer from '../../context/ApplicationContext';
import { withRouter } from 'react-router-dom';


function Home() {
  useEffect(() => {
    document.title = 'Camila Araújo'

    setTimeout(() => {
      if(window.location.pathname === '/'){
        const songPlayer = document.getElementById('song-player')
        songPlayer.play();
        songPlayer.muted = false;
        songPlayer.currentTime = 80
      }
    }, 5000)
  }, [])
  

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