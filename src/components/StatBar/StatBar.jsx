import React from "react";

export const StatBar = ({currVal, label, maxVal}) => (
    <>
        <label for ="stat-bar">{label}</label>
        <progress id ="stat-bar" value = {currVal} max = {maxVal}>{currVal}</progress>
    
    </>
)