import React, { useEffect } from 'react'
import Header from './components/header/Header';


function App() {
  useEffect(() => {
    document.title = 'Camila Araújo'
  }, [])


  return (
    <div className="App">
      <Header />
    </div>
  );
}


export default App;