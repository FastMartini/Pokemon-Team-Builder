import { useState, useMemo } from 'react'
import Navbar from './components/Navbar/Navbar'
import Corepokemon from './components/CorePokemon/CorePokemon'
import Archetype from './components/Archetype/Archetype'
import FinalTeam from './components/FinalTeam/FinalTeam'
import Hero from './components/Hero/Hero';
import Playstyle from './components/Archetype/Playstyle'
import './components/App.css'
import './components/slider.css'

function App() {

  const [pokemon, setPokemon] = useState('');
  const [lockedArc, setLockedArc] = useState('');
  const [selectedPlaystyle, setSelectedPlaystyle] = useState('');
  const [selectedNature, setSelectedNature] = useState('');
  const sliderClass = lockedArc ? 'slider show-playstyle' : 'slider';
  
  return (
    <>
      <Hero />

      <Corepokemon pokemon={pokemon} setPokemon={setPokemon}/>

      <div id="main-content">
        <Navbar />
        <div className="sections">
          <div className={sliderClass}>
            <div className="panel">
              <Archetype lockedArc={lockedArc} setLockedArc={setLockedArc} />
            </div>

            <div className="panel">
              <Playstyle
                archetype={lockedArc}
                selectedPlaystyle={selectedPlaystyle}
                setSelectedPlaystyle={setSelectedPlaystyle}
                selectedNature={selectedNature}
                setSelectedNature={setSelectedNature}
              />
            </div>
          </div>
        </div>

        <FinalTeam corePokemon={pokemon} lockedArc={lockedArc} selectedNature={selectedNature}/>
        <p className="read-the-docs">
        Pokémon are registered trademarks of Nintendo and Game Freak.
        </p>
      </div>

     

    </>
  )
}

export default App
