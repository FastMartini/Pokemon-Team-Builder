import { use, useEffect } from "react";
import React, { useMemo } from "react";
import "./Playstyle.css";
import { PLAYSTYLES } from "../../data/PlaystylesData";

const ARC_VALUE_TO_LABEL = {
  stall: "Stall",
  SemiStall: "Semi-Stall",
  Balanced: "Balance",
  BulkyOffense: "Bulky Offense",
  Offense: "Offense",
  HyperOffense: "Hyper Offense",
};

function buildOptionsFor(label) {
  const data = PLAYSTYLES?.[label];
  if (!data) return [];
  const opts = [];
  data.groups.forEach(g => {
    g.items.forEach(it => {
      opts.push({ value: `${g.title} — ${it.name}`, label: `${g.title} — ${it.name}`, natures: it.natures || [] });
      (it.subitems || []).forEach(si => {
        opts.push({ value: `${g.title} — ${it.name}: ${si.name}`, label: `${g.title} — ${it.name}: ${si.name}`, natures: si.natures || [] });
      });
    });
  });
  return opts;
}

export default function Playstyle({
  archetype,                 
  selectedPlaystyle,
  setSelectedPlaystyle,
  selectedNature,          
  setSelectedNature,
  onSelectPlaystyle        
}) {
  const archetypeLabel = ARC_VALUE_TO_LABEL[archetype] || archetype;
  const options = useMemo(() => buildOptionsFor(archetypeLabel), [archetypeLabel]);

  const currentValue = options.find(o => o.value === selectedPlaystyle)
    ? selectedPlaystyle
    : (options[0]?.value || "");

  if (currentValue && currentValue !== selectedPlaystyle) {
    setSelectedPlaystyle(currentValue);
  }

  const currentNatures =
    options.find(o => o.value === currentValue)?.natures || [];

  const hasPlaystyle = !!currentValue;

  return (
    <section id="Playstyle" className="playstyle">
      <h2>Playstyles</h2>
      <p className="muted">
        Choose a playstyle for <strong>{archetypeLabel || "—"}</strong>
      </p>

      <select
        className="ps-select"
        value={currentValue}
        onChange={(e) => setSelectedPlaystyle(e.target.value)}
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

      {/* ✅ Clickable nature buttons */}
      {currentNatures.length > 0 && (
        <div style={{ marginTop: 12 }}>
          <div className="ps-label">Recommended Natures</div>
          <div className="ps-natures">
            {currentNatures.map((n) => (
              <button
                type="button"
                key={n}
                className={`nature-chip ${selectedNature === n ? "is-active" : ""}`}
                onClick={() => {setSelectedNature(n) 
                }}
              >
                {n}
              </button>
            ))}
          </div>
          <button
          type="button"
          className="back-btn"
          disabled={!hasPlaystyle}
          onClick={() => {onSelectPlaystyle
            document.getElementById('FinalTeam').scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Select
        </button>
        </div>
      )}
    </section>
  );
}
