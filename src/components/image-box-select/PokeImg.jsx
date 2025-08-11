import React from "react";
import { pokeImages } from "../../data/pokeImages";
import "./PokeImg.css";

export default function PokeImg({ pokemon }) {
    const imageUrl = pokeImages[pokemon];

    return (
        <div className="pop-wrapper" key={pokemon}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={pokemon}
            className="floating-img"
          />
        ) : (  

            <p>Please select a Pokémon</p>
        )}
        </div>
    );
}