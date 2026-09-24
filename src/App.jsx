import { useState } from 'react'
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
  const [showPlaystyles, setShowPlaystyles] = useState(false);
  const sliderClass = showPlaystyles ? 'slider show-playstyle' : 'slider';

  const selectArchetype = (archetype) => {
    if (archetype !== lockedArc) {
      setSelectedPlaystyle('');
      setSelectedNature('');
    }
    setLockedArc(archetype);
    setShowPlaystyles(true);
  };
  
  return (
    <>
      <Hero />

      <Corepokemon pokemon={pokemon} setPokemon={setPokemon}/>

      <div id="main-content">
        <Navbar />
        <div className="sections">
          <div className={sliderClass}>
            <div className="panel">
              <Archetype lockedArc={lockedArc} setLockedArc={selectArchetype} />
            </div>

            <div className="panel">
              <Playstyle
                archetype={lockedArc}
                selectedPlaystyle={selectedPlaystyle}
                setSelectedPlaystyle={setSelectedPlaystyle}
                selectedNature={selectedNature}
                setSelectedNature={setSelectedNature}
                onBack={() => setShowPlaystyles(false)}
              />
            </div>
          </div>
        </div>

        <FinalTeam corePokemon={pokemon} lockedArc={lockedArc} selectedPlaystyle={selectedPlaystyle} selectedNature={selectedNature}/>
        <p className="read-the-docs">
        Pokémon are registered trademarks of Nintendo and Game Freak.
        </p>
      </div>

     

    </>
  )
}

export default App
