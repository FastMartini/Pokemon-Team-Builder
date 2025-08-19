import { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Corepokemon from './components/CorePokemon/CorePokemon'
import Archetype from './components/Archetype/Archetype'
import FinalTeam from './components/FinalTeam/FinalTeam'
import Hero from './components/Hero/Hero';
import './components/App.css'

function App() {

  const [pokemon, setPokemon] = useState('');
  const [lockedArc, setLockedArc] = useState('');
  
  return (
    <>
      <Hero />

      <Corepokemon pokemon={pokemon} setPokemon={setPokemon}/>

      <div id="main-content">
        <Navbar />
        <Archetype lockedArc={lockedArc} setLockedArc={setLockedArc} />
        <FinalTeam corePokemon={pokemon} lockedArc={lockedArc}/>
        <p className="read-the-docs">
        Pokémon are registered trademarks of Nintendo and Game Freak.
        </p>
      </div>

     

    </>
  )
}

export default App
