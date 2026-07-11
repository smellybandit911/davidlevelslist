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
  { rank: 1, name: "CeasarWare", points: 2758, hardestLevel: "Davids inferno" },
  { rank: 2, name: "SmellY", points: 1787, hardestLevel: "David x lucas circles" },
  { rank: 3, name: "icedagger!!", points: 1461, hardestLevel: "elementary for david" },
  { rank: 4, name: "vvKyro", points: 1461, hardestLevel: "elementary for dxvid" },
  { rank: 5, name: "David", points: 1267, hardestLevel: "davids goopium syrup" },
  { rank: 6, name: "limboproductions", points: 1267, hardestLevel: "haunted david" },
  { rank: 7, name: "ShayPlazYT", points: 375, hardestLevel: "DavidFemHouse" },
  { rank: 8, name: "randomperson", points: 333, hardestLevel: "David rage stage" },
  { rank: 9, name: "chudlas", points: 0, hardestLevel: "Davids retray wave" },
  { rank: 10, name: "sirius", points: 0 },
  { rank: 11, name: "ratafak", points: 67, hardestLevel: "thinking space 2" },
];

export default players;
