import { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Corepokemon from './components/CorePokemon/CorePokemon'
import Archetype from './components/Archetype/Archetype'
import FinalTeam from './components/FinalTeam/FinalTeam'
import './components/App.css'


function App() {

  const [pokemon, setPokemon] = useState('');
  const [lockedArc, setLockedArc] = useState('');
  
  return (
    <>
      <div>
        <Navbar />
        {/* Other components */}
      </div>

      <div className="intro-container">

        <h1>Welcome to the Pokelab! Choose from a variety of Paldea's pokemon to create a team with.</h1>
      
        <div className="card">
          <a href="#core-pokemon" className='forge-btn'>
            Forge your team
          </a>
        </div>

      </div>


      <div>
        <Corepokemon pokemon={pokemon} setPokemon={setPokemon}/>
      </div>

      <div>
        <Archetype lockedArc={lockedArc} setLockedArc={setLockedArc} />

      </div>

      <div>
        <FinalTeam corePokemon={pokemon} lockedArc={lockedArc}/>

      </div>

      <p className="read-the-docs">
        Click on the 'About Us' tab to learn more
      </p>

    </>
  )
}

export default App
