import { useState } from 'react'
import mainLogo from '/logo.png'
import './components/App.css'
import Navbar from './components/Navbar/Navbar'


function App() {
  return (
    <>
      <div>
        <Navbar />
        {/* Other components */}
      </div>
    
      <h1>Welcome to the Pokelab! Choose from a variety of Paldea's pokemon to create a team with.</h1>
      
      <div className="card">
        <button>
          Forge your team
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

    </>
  )
}

export default App
