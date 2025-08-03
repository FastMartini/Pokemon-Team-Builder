import React, {useState} from 'react';
import { pokemonByArchetype } from '../image-box-select/pokeByArchetype';
import './Archetype.css';
import { StatBar } from '../StatBar/StatBar';

const archetypeToPokemon = {
    stall: 'toxapex',
    semiStall: 'avalugg',
    balance: 'armarouge',
    bulkyOff: 'annihilape',
    offense: 'baxcalibur',
    hyperOff: 'iron_valiant'
};

export default function Archetype(){

    const [arc, setArc] = useState('');

    const pokemonName = arc ? archetypeToPokemon[arc] : null;
    const pokemonImage = pokemonName ? pokemonByArchetype[pokemonName] : null

    return(
        <section id='Archetype' className='archetype'>
            <div>

            <StatBar />
            
            </div>
            <h3>Choose your archetype</h3>
            

            <div className = 'arcControls'>
                <select value = {arc} onChange = {e => setArc(e.target.value)}>
                    <option value = "">-- pick one --</option>
                    <option value = "stall">Stall</option>
                    <option value = "semiStall">Semi-Stall</option>
                    <option value = "balance">Balance</option>
                    <option value = "bulkyOff">Bulky-Offensive</option>
                    <option value = "offense">Offense</option>
                    <option value = "hyperOff">Hyper-Offensive</option>
                </select>
                <button className = 'btn' disabled = {!arc} onClick ={() => alert(`You chose ${arc}!`)}>
                    Select
                </button>
            </div>
        </section>
    );
}