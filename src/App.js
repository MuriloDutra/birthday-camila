import React, { useEffect } from 'react'
import Header from './components/header/Header';
import MainImage from './Assets/MainImage.jpg'
import './global.scss'
import './App.scss'
import Footer from './components/footer/Footer';
import song from './Assets/WatermelonSugar.mp3'

function App() {
  const songUrl = 'http://streaming.tdiradio.com:8000/house.mp3'
  const audio = new Audio(song)


  useEffect(() => {
    document.title = 'Camila Araújo'
    //audio.play()
  }, [])


  return (
    <div className="App">
      <Header />

      <div className="main-content">
        <div className="main-photo-container">
          <img alt="Main image" src={MainImage} className="main-image"/>
        </div>
        <div className="main-text-container">
          <h1>Lip sync</h1>
          <h3>The new anniversary by Camila</h3>
          <h1>#LoveOn30</h1>
        </div>
      </div>

      <div className="main-video-container">
        <iframe
          className='main-video'
          src="https://www.youtube-nocookie.com/embed/P3cffdsEXXw"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          onCanPlay
        />
      </div>

      <Footer />
    </div>
  );
}


export default App;