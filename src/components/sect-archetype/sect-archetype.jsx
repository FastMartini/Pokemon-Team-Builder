import React, {useState} from 'react';
import './sect-archetype.css';

export default function Archetype(){

    const [arc, setArc] = useState('');

    return(
        <section id='Archetype' className='archetype'>
            <h3>Choose your archetype</h3>
            <div className='arcPreview'>
                <img>{/*add image here*/}</img>
            </div>

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