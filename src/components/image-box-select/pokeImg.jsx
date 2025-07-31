import React from "react";
import { pokeImages } from "./pokeImages";
import "./PokeImg.css";

export default function PokeImg({ pokemon }) {
    return(
        <div className="corePreview">
            {pokemon
            ? <img src={pokeImages[pokemon]} alt={pokemon} />
            : <p className="placeholder">Pick one below!</p>
            }
        </div>
    );
}