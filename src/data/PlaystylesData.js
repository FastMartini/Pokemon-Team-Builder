export const PLAYSTYLES = {
  "Stall": {
    heading: "Defensive Playstyles",
    groups: [
      {
        title: "Stall",
        items: [
          { name: "Full Stall", natures: ["Bold", "Calm", "Impish", "Careful"] },
          { name: "PP Stall",   natures: ["Bold", "Calm", "Impish", "Careful"] },
        ],
      },
    ],
  },

  "Semi-Stall": {
    heading: "Defensive Playstyles",
    groups: [
      {
        title: "Semi-Stall",
        items: [
          { name: "Hybrid Stall",  natures: ["Bold", "Calm", "Impish", "Careful"] },
          { name: "Hazard Stall",  natures: ["Bold", "Impish", "Calm"] },
        ],
      },
    ],
  },

  "Balance": {
    heading: "Defensive Playstyles",
    groups: [
      {
        title: "Balance",
        items: [
          { name: "Classic Balance",  natures: ["Bold", "Calm", "Careful", "Impish"] },
          { name: "Bulky Balance",    natures: ["Relaxed", "Sassy", "Bold", "Careful"] },
          { name: "Offensive Balance",natures: ["Modest", "Timid", "Adamant", "Jolly"] },
        ],
      },
    ],
  },

  "Bulky Offense": {
    heading: "Offensive Playstyles",
    groups: [
      {
        title: "Bulky Offense",
        items: [
          { name: "Tanky Setup",                     natures: ["Adamant", "Modest", "Careful", "Calm"] },
          { name: "Slow Breakers + Fast Cleaners",  natures: ["Brave", "Quiet", "Adamant", "Modest", "Jolly", "Timid"] },
        ],
      },
    ],
  },

  "Offense": {
    heading: "Offensive Playstyles",
    groups: [
      {
        title: "Offense",
        items: [
          { name: "Standard Offense",         natures: ["Jolly", "Timid", "Adamant", "Modest"] },
          { name: "Hazard Pressure Offense",  natures: ["Naive", "Hasty", "Jolly", "Timid"] },
        ],
      },
    ],
  },

  "Hyper Offense": {
    heading: "Offensive Playstyles",
    groups: [
      {
        title: "Hyper Offense (HO)",
        items: [
          { name: "Screens HO",       natures: ["Jolly", "Timid", "Adamant", "Modest"] },
          { name: "Suicide Lead HO",  natures: ["Jolly", "Timid", "Naive", "Hasty"] },
          { name: "Sticky Web HO",    natures: ["Naive", "Timid", "Jolly"] },
          {
            name: "Weather HO",
            subitems: [
              { name: "Rain", natures: ["Modest", "Timid", "Adamant", "Jolly"] },
              { name: "Sun",  natures: ["Naive", "Hasty", "Timid", "Jolly"] },
              { name: "Sand", natures: ["Jolly", "Adamant", "Naive"] },
              { name: "Snow", natures: ["Timid", "Modest", "Jolly"] },
            ],
          },
        ],
      },
    ],
  },
};
