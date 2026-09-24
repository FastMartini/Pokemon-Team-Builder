import { useMemo, useState } from 'react';
import './FinalTeam.css';
import { pokeImages } from '../../data/pokeImages';
import { buildTeam, STAT_LABELS, ARCHETYPE_WEIGHTS, SCORE_WEIGHTS } from '../../data/teamBuilder';

const factorLabels = {
  role: 'Role fit', coverage: 'Defensive coverage', archetype: 'Archetype fit',
  offense: 'Offensive variety', weather: 'Weather fit',
  sharedWeakness: 'Shared weakness penalty', duplicateTypes: 'Repeated type penalty',
};

function TeamCard({ member }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <article className="team-member">
      <button
        type="button"
        className={`team-box${flipped ? ' flipped' : ''}`}
        onClick={() => setFlipped(value => !value)}
        aria-label={`${member.name}: ${flipped ? 'show Pokémon' : 'show level 50 stats'}`}
        aria-pressed={flipped}
      >
        <span className="flip-inner">
          <span className="flip-front" aria-hidden={flipped}>
            <img src={pokeImages[member.name]} alt="" />
            <strong>{member.name}</strong>
            <span className="team-types">{member.types.join(' / ')}</span>
            <span className="team-role">{member.roleLabel}</span>
            <span className="flip-hint">View stats ↻</span>
          </span>
          <span className="flip-back" aria-hidden={!flipped}>
            <strong>{member.name} · Lv. 50</strong>
            {Object.entries(member.stats).map(([stat, value]) => (
              <span className="team-stat" key={stat}><span>{STAT_LABELS[stat]}</span><b>{value}</b></span>
            ))}
            <span className="flip-hint">31 IVs · 0 EVs · {member.nature}</span>
          </span>
        </span>
      </button>
      <p className="member-meta"><strong>{member.nature}</strong> nature · {member.ability}</p>
      <p className="member-reason">{member.reason}</p>
      {member.breakdown && (
        <details className="member-score">
          <summary>Selection score: {member.score.toFixed(1)}</summary>
          <dl>
            {Object.entries(member.breakdown).map(([factor, value]) => (
              <div key={factor}><dt>{factorLabels[factor]}</dt><dd>{(value * SCORE_WEIGHTS[factor]).toFixed(1)}</dd></div>
            ))}
          </dl>
          <p>Weighted points at the time this slot was filled, not a win probability.</p>
        </details>
      )}
    </article>
  );
}

export default function FinalTeam({ lockedArc, corePokemon, selectedPlaystyle, selectedNature }) {
  const result = useMemo(() => buildTeam({ corePokemon, archetype: lockedArc, playstyle: selectedPlaystyle, selectedNature }),
    [corePokemon, lockedArc, selectedPlaystyle, selectedNature]);
  const weights = ARCHETYPE_WEIGHTS[lockedArc];
  return (
    <section id="FinalTeam" className="final-team-container">
      <h2>Your {corePokemon || 'Pokémon'} team</h2>
      {result.error ? <p className="team-placeholder">{result.error}</p> : (
        <>
          <p className="team-subtitle">{result.playstyle.label} · Casual singles</p>
          <p className="team-scope">A suggested six-Pokémon roster with roles and move options. Finish the four-move sets, items, and EV training for the game you play; historical move access is not a guarantee of legality in one version.</p>
          <div className="final-team-grid">
            {result.team.map(member => <TeamCard key={`${member.name}-${member.role}-${member.nature}`} member={member} />)}
          </div>
          {result.warnings.length > 0 && (
            <aside className="team-notes">
              <h3>Matchups to watch</h3>
              <ul>{result.warnings.map(warning => <li key={warning}>{warning}</li>)}</ul>
            </aside>
          )}
          <details className="team-formula">
            <summary>How this team was chosen</summary>
            <p>Your core stays in slot one. The selected playstyle supplies five support roles. For each role, the builder checks move or ability access, then selects the highest-scoring unused Pokémon. Ties use Pokédex order, so the same inputs produce the same team.</p>
            <p className="formula-equation">Score = 35 × role fit + 25 × defensive coverage + 20 × archetype fit + 10 × offensive variety + 10 × weather fit − 15 × shared weaknesses − 10 × repeated types</p>
            <p>Factors are scaled from 0 to 1, except weather conflicts can score −0.5. Defensive coverage rewards answers to existing weaknesses. Offensive variety rewards new type coverage and a mix of physical and special attacks. Type-based attacking coverage is a proxy until you choose actual attacks.</p>
            <p>This archetype weights physical bulk at {weights[0] * 100}%, special bulk at {weights[1] * 100}%, attack strength at {weights[2] * 100}%, and Speed at {weights[3] * 100}%.</p>
            <p>Automatic teammates come from the stored roster: terminal evolutions within that roster, at least 400 total base stats, and no legendary/mythical Pokémon. A few species with unusual mechanics are excluded from automatic selection. Your chosen core is always retained.</p>
            <p>Nature affects calculated stats, not base stats. Shown stats assume level 50, 31 IVs, and 0 EVs. Teammates receive role-based natures and a suggested ability; common ability immunities are included in defensive coverage. These hand-tuned weights are a starting heuristic, not a battle simulation or an optimal-team guarantee.</p>
            <p>Data: <a href="https://github.com/smogon/pokemon-showdown/tree/master/data">Pokémon Showdown</a>. Team-building principles: <a href="https://www.smogon.com/articles/getting-started">roles</a> and <a href="https://www.smogon.com/xy/articles/synergy">type synergy</a>.</p>
          </details>
        </>
      )}
    </section>
  );
}
