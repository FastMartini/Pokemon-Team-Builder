import React, {useState} from 'react';
import PokeImg from '../image-box-select/PokeImg';
import './CorePokemon.css';

export default function CorePokemon({pokemon, setPokemon}) {


    return(
        <section id = 'core-pokemon' className = 'corePokemon'>
            
            <PokeImg pokemon={pokemon} />

            <h2>Choose your core Pokemon</h2>

            

            <div className ='coreControls'>
                <select value = {pokemon} onChange = {e => setPokemon(e.target.value)}>
                    <option value = "">-- pick one --</option>
                    <option value = "sprigatito">Sprigatito</option>
                    <option value = "fuecoco">Fuecoco</option>
                    <option value = "quaxly">Quaxly</option>
                </select>
                <button className='btn' disabled={!pokemon} onClick={() => {
                    alert(`You chose ${pokemon}!`);
                    document.getElementById('Archetype')?.scrollIntoView({ behavior: 'smooth' });}}>
                        Select
                </button>
            </div>
        </section>
    );
}
