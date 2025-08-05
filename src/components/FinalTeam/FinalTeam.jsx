import './FinalTeam.css';
import { pokeImages } from '../image-box-select/pokeImages'; // adjust path if needed

export default function FinalTeam({ lockedArc, corePokemon }) {
  return (
    <section id='FinalTeam' className="final-team-container">
      <div className="header-row">
        <div className="header">{lockedArc || "Archetype"}</div>
        <div className="header">{corePokemon || "Corepokemon"}</div>
        <div className="header">team</div>
      </div>
      <div className="final-team-grid-wrapper">
        <div className="final-team-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="team-box">
              {i === 0 && corePokemon && pokeImages[corePokemon] && (
                <img
                  src={pokeImages[corePokemon]}
                  alt={corePokemon}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}