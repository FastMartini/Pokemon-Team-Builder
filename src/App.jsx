import { useState } from 'react'
import mainLogo from '/logo.png'
import Navbar from './components/Navbar/Navbar'
import Corepokemon from './components/scroll-down/Scroll-down'
import './components/App.css'




function App() {
  return (
    <>
      <div>
        <Navbar />
        {/* Other components */}
      </div>
    
      <h1>Welcome to the Pokelab! Choose from a variety of Paldea's pokemon to create a team with.</h1>
      
      <div className="card">
        <a href="#core-pokemon" className='forge-btn'>
          Forge your team
        </a>
        
        
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>

      <Corepokemon />

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

    </>
  )
}

export default App
