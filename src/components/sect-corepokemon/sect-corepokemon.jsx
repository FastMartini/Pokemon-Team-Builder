import React, {useState} from 'react';
import './sect-corepokemon.css';

export default function CorePokemon() {
    const [poke, setPoke] = useState('');

    return(
        <section id = 'core-pokemon' className = 'corePokemon'>
            <h2>Choose your core Pokemon</h2>
            <div className ='corePreview'>
                <img>{/*add image here*/}</img>
            </div>

            <div className ='coreControls'>
                <select value = {poke} onChange = {e => setPoke(e.target.value)}>
                    <option value = "">-- pick one --</option>
                    <option value = "sprigatito">Sprigatito</option>
                    <option value = "fuecoco">Fuecoco</option>
                    <option value = "quaxly">Quaxly</option>
                </select>
                <button className='btn' disabled={!poke} onClick={() => {
                    alert(`You chose ${poke}!`);
                    document.getElementById('Archetype')?.scrollIntoView({ behavior: 'smooth' });}}>
                        Select
                </button>
            </div>
        </section>
    );
}
