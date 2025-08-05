import React from "react";
import { pokeImages } from "./pokeImages";
import "./PokeImg.css";

export default function PokeImg({ pokemon }) {
    const imageUrl = pokeImages[pokemon];

    return (
        <div className="corePreview">
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