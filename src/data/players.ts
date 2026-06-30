// ============================================================
// PLAYERS / LEADERBOARD - Edit this array to add/remove players
// ============================================================
// Fields:
//   rank          - Leaderboard position
//   name          - Player name
//   points        - Total points
//   hardestLevel  - Name of their hardest completion (optional)
// ============================================================

export interface Player {
  rank: number;
  name: string;
  points: number;
  hardestLevel?: string;
}

const players: Player[] = [
    { rank: 1, name: "CeasarWare", points: 3012, hardestLevel: "Davids inferno rebirth" },
  { rank: 2, name: "vvKyro", points: 2052, hardestLevel: "elementary for dxvid" },
  { rank: 3, name: "SmellY", points: 1787, hardestLevel: "David x lucas circles" },
  { rank: 4, name: "icedagger!!", points: 1461, hardestLevel: "elementary for david" },
  { rank: 5, name: "vvKyro", points: 2052, hardestLevel: "elementary for dxvid" },
  { rank: 6, name: "David", points: 1267, hardestLevel: "davids goopium syrup" },
  { rank: 7, name: "limboproductions", points: 1267, hardestLevel: "haunted david" },
  { rank: 8, name: "ShayPlazYT", points: 375, hardestLevel: "DavidFemHouse" },
  { rank: 9, name: "randomperson", points: 333, hardestLevel: "David rage stage" },
  { rank: 10, name: "chudlas", points: 98, hardestLevel: "Davids retray wave" },
  { rank: 11, name: "sirius", points: 0 },
  { rank: 12, name: "ratafak", points: 67, hardestLevel: "thinking space 2" },
];

export default players;
