import React from "react";
import './StatBar.css';

export const HpBar = ({completed}) => {
    return (
        <div className="stat-row">
            <span className="stat-label">HP</span>
            <div className="hp-bar-container">
            <div 
                className="hp-bar-filler" 
                style={{ width: `${completed}%` }} 
            />
            </div>
        </div>
    )
}
export const AttackBar = ({completed}) => {
    return (
        <div className="stat-row">
            <span className="stat-label">Attack</span>
            <div className="attack-bar-container">
            <div 
                className="attack-bar-filler" 
                style={{ width: `${completed}%` }} 
            />
            </div>
        </div>
    )
}
export const DefenseBar = ({completed}) => {
    return (
        <div className="stat-row">
            <span className="stat-label">Defense</span>
            <div className="defense-bar-container">
            <div 
                className="defense-bar-filler" 
                style={{ width: `${completed}%` }} 
            />
            </div>
        </div>
    )
}
export const SpatkBar = ({completed}) => {
    return (
        <div className="stat-row">
            <span className="stat-label">Sp.Atk</span>
            <div className="spatk-bar-container">
            <div 
                className="spatk-bar-filler" 
                style={{ width: `${completed}%` }} 
            />
            </div>
        </div>
    )
}
export const SpdefBar = ({completed}) => {
    return (
        <div className="stat-row">
            <span className="stat-label">Sp.Def</span>
            <div className="spdef-bar-container">
            <div 
                className="spdef-bar-filler" 
                style={{ width: `${completed}%` }} 
            />
            </div>
        </div>
    )
}
export const SpeedBar = ({completed}) => {
    return (
        <div className="stat-row">
            <span className="stat-label">Speed</span>
            <div className="speed-bar-container">
            <div 
                className="speed-bar-filler" 
                style={{ width: `${completed}%` }} 
            />
            </div>
        </div>
    )
};

