import React, {useState} from 'react';
import './Archetype.css';
import { 
    HpBar, AttackBar, DefenseBar,
    SpatkBar, SpdefBar, SpeedBar
} from '../StatBar/StatBar';

const statsByArchetype = {
    empty: {
      hp: 0, attack: 0, defense: 0, spatk: 0, spdef: 0, speed: 0
    },
    stall: {
      hp: 90,       
      attack: 25,  
      defense: 100,  
      spatk: 30,    
      spdef: 100,    
      speed: 20     
    },
    SemiStall: {
      hp: 75,       
      attack: 35,   
      defense: 80,  
      spatk: 40,    
      spdef: 80,    
      speed: 35     
    },
    Balanced: {
      hp: 60,       
      attack: 60,   
      defense: 60,  
      spatk: 60,    
      spdef: 60,    
      speed: 60     
    },
    BulkyOffense: {
      hp: 65,       
      attack: 90,   
      defense: 55,  
      spatk: 85,    
      spdef: 50,    
      speed: 45     
    },
    Offense: {
      hp: 60,       
      attack: 95,   
      defense: 30,  
      spatk: 95,    
      spdef: 30,    
      speed: 75     
    },
    HyperOffense: {
      hp: 55,      
      attack: 100,  
      defense: 25,  
      spatk: 100,   
      spdef: 25,    
      speed: 100    
    }
  };

const LABEL_TO_STATS_KEY = {
  "Stall": "stall",
  "Semi-Stall": "SemiStall",
  "Balance": "Balanced",
  "Bulky Offense": "BulkyOffense",
  "Offense": "Offense",
  "Hyper Offense": "HyperOffense",
};
  

export default function StatSection({ lockedArc, setLockedArc }) {
  const [arc, setArc] = useState("empty");
  const statsKey = LABEL_TO_STATS_KEY[arc] ?? arc;
  const currentStats = statsByArchetype[statsKey] || null;

    return(
        <section id='Archetype' className="archetype">

          <div className="archetype-inner">

            {arc && currentStats && (
              <div className="stat-bars-wrapper">
                  <HpBar completed={currentStats.hp} />
                  <AttackBar completed={currentStats.attack} />
                  <DefenseBar completed={currentStats.defense} />
                  <SpatkBar completed={currentStats.spatk} />
                  <SpdefBar completed={currentStats.spdef} />
                  <SpeedBar completed={currentStats.speed} />
              </div>
            )}

            <h3>Choose your archetype</h3>
            
            <div className = 'arcControls'>
                <select value = {arc} onChange = {e => setArc(e.target.value)}>
                    <option value = "empty">-- pick one --</option>
                    <option value = "stall">Stall</option>
                    <option value = "SemiStall">Semi-Stall</option>
                    <option value = "Balanced">Balance</option>
                    <option value = "BulkyOffense">Bulky-Offensive</option>
                    <option value = "Offense">Offense</option>
                    <option value = "HyperOffense">Hyper-Offensive</option>
                </select>

                <button
                    className="btn"
                    disabled={!arc}
                    onClick={() => {setLockedArc(arc)}}
                >
                    Select
                </button>
            </div>

            {lockedArc && (
                <p className="locked-message">
                    You locked in: <strong>{lockedArc}</strong>
                </p>
            )}

          </div>
            
        </section>
    );
};


