import React, { useEffect, useMemo } from "react";
import "./Playstyle.css";
import { ARCHETYPE_LABELS, getPlaystyleOptions } from "../../data/playstyleDetails";
import { ROLE_LABELS, STAT_LABELS } from "../../data/teamBuilder";
import { natures } from "../../data/natures";
import PlaystyleBackground from "./PlaystyleBackground";

export default function Playstyle({
  archetype,                 
  selectedPlaystyle,
  setSelectedPlaystyle,
  selectedNature,          
  setSelectedNature,
  onSelectPlaystyle,
  onBack
}) {
  const archetypeLabel = ARCHETYPE_LABELS[archetype] || archetype;
  const options = useMemo(() => getPlaystyleOptions(archetype), [archetype]);

  const currentValue = options.find(o => o.value === selectedPlaystyle)
    ? selectedPlaystyle
    : (options[0]?.value || "");

  useEffect(() => {
    if (currentValue && currentValue !== selectedPlaystyle) {
      setSelectedPlaystyle(currentValue);
    }
  }, [currentValue, selectedPlaystyle, setSelectedPlaystyle]);

  const currentOption = options.find(o => o.value === currentValue);
  const currentNatures = currentOption?.natures || [];
  const nature = natures[selectedNature];

  return (
    <section id="Playstyle" className="playstyle">
      {archetype && <PlaystyleBackground />}
      <h2>Playstyles</h2>
      <p className="muted">
        Choose a playstyle for <strong>{archetypeLabel || "—"}</strong>
      </p>

      <select
        className="ps-select"
        aria-label="Choose a playstyle"
        aria-describedby="playstyle-description"
        value={currentValue}
        onChange={(e) => {
          setSelectedPlaystyle(e.target.value);
          setSelectedNature('');
        }}
      >
        {options.length === 0 ? (
          <option value="">— No playstyles for this archetype —</option>
        ) : (
          options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))
        )}
      </select>

      <div className="ps-description" id="playstyle-description" aria-live="polite">
        <h3>How this playstyle works</h3>
        <p>{currentOption?.description || 'Choose an archetype to explore its playstyles.'}</p>
        {currentOption?.plan && (
          <p><strong>Your team plan:</strong> Your core, plus {currentOption.plan.map(role => ROLE_LABELS[role].toLowerCase()).join(', ')}.</p>
        )}
      </div>

      {/* ✅ Clickable nature buttons */}
      {currentNatures.length > 0 && (
        <div className="ps-nature-options">
          <div className="ps-label">Core Pokémon nature (optional)</div>
          <p className="ps-help">Choose a suggested nature, or let the builder choose. Teammates get natures suited to their own roles.</p>
          <div className="ps-natures">
            {currentNatures.map((n) => (
              <button
                type="button"
                key={n}
                className={`nature-chip ${selectedNature === n ? "is-active" : ""}`}
                aria-pressed={selectedNature === n}
                onClick={() => setSelectedNature(selectedNature === n ? '' : n)}
              >
                {n}
              </button>
            ))}
          </div>
          <p className="ps-help" aria-live="polite">
            {nature?.up ? `${selectedNature}: 1.1× ${STAT_LABELS[nature.up]}, 0.9× ${STAT_LABELS[nature.down]}.` : 'Automatic nature selection is active.'}
          </p>
        </div>
      )}

      <div className="ps-actions">
        <button type="button" className="ps-action ps-back-btn" onClick={onBack}>
          Back to archetypes
        </button>
          <button
            type="button"
            className="ps-action"
            disabled={!currentOption?.plan}
            onClick={() => {
              onSelectPlaystyle?.();
              document.getElementById('FinalTeam')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Build my team
          </button>
      </div>
    </section>
  );
}
