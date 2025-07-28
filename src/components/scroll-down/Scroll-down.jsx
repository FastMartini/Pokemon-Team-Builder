import React, {useState} from 'react';
import './Scroll-down.css';

export default function corePokemon() {
    const [poke, setPoke] = useState('');

    return(
        <section id='core-pokemon' className='corePokemon'>
            <h2>Choose your core Pokemon</h2>
            <div className='preview'>
                <img></img>
            </div>

            <div className='controls'>
                <select value={poke} onChange={e => setPoke(e.target.value)}>
                    <option value="">-- pick one --</option>
                    <option value="sprigatito">Sprigatito</option>
                    <option value="fuecoco">Fuecoco</option>
                    <option value="quaxly">Quaxly</option>
                </select>
                <button disabled={!poke} onClick={() => alert(`You chose ${poke}!`)}>
                    Select
                </button>
            </div>
        </section>
    );
}
