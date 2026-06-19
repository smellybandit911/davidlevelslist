// ============================================================
// LEVELS - Edit this array to add/remove/reorder levels
// ============================================================
// Fields:
//   id        - Position on the list (1 = hardest)
//   name      - Level name
//   verifier  - Who verified/beat it first
//   method    - "S" = ship, "N" = normal (gameplay style)
//   gdLevelId - The Geometry Dash level ID
//   videoUrl  - YouTube embed URL (leave "" for no video)
//   records   - Array of completions { player, percent, hz, mobile, link }
// ============================================================

export interface LevelRecord {
  player: string;
  percent: number;
  hz: number | 'CBF';
  mobile: boolean;
  link: string;
}

export interface Level {
  id: number;
  name: string;
  verifier: string;
  method: string;
  gdLevelId: number;
  videoUrl: string;
  records: LevelRecord[];
}

const levels: Level[] = [
  { id: 1, name: "haunted david", verifier: "ballwizard", method: "N", gdLevelId: 142939175, videoUrl: "https://www.youtube.com/embed/zT1PBI0nLBg", records: [] },
  { id: 2, name: "davids goopium syrup", verifier: "David", method: "S", gdLevelId: 141467933, videoUrl: "", records: [] },
  { id: 3, name: "David is 2721", verifier: "vvKyro", method: "N", gdLevelId: 141420200, videoUrl: "https://www.youtube.com/embed/oUyWP2OgrDs", records: [] },
  { id: 4, name: "elementary for dxvid", verifier: "icedagger!!", method: "S", gdLevelId: 141747746, videoUrl: "https://www.youtube.com/embed/FfS4n13MSd4", records: [] },
  { id: 5, name: "David's inferno", verifier: "CaesarWare", method: "N", gdLevelId: 141409971, videoUrl: "", records: [] },
  { id: 6, name: "David trials 2", verifier: "David", method: "N", gdLevelId: 141632448, videoUrl: "", records: [] },
  { id: 7, name: "davids sonic wave", verifier: "vvKyro", method: "N", gdLevelId: 141791872, videoUrl: "https://www.youtube.com/embed/pQZU-9AJDPc", records: [] },
  { id: 8, name: "David rage stage", verifier: "CaesarWare", method: "N", gdLevelId: 142215712, videoUrl: "https://www.youtube.com/embed/HCPh47shZjA", records: [] },
  { id: 9, name: "Davids low death", verifier: "CaesarWare", method: "N", gdLevelId: 141672026, videoUrl: "", records: [] },
  { id: 10, name: "David Is Sick X", verifier: "vvKyro", method: "S", gdLevelId: 142344116, videoUrl: "https://www.youtube.com/embed/SGCKs4oWBJM", records: [] },
  { id: 11, name: "David Is Sick", verifier: "limboproductions", method: "S", gdLevelId: 142263634, videoUrl: "https://www.youtube.com/embed/w41aWXQtNIQ", records: [] },
  { id: 12, name: "David x lucas circles", verifier: "CeasarWare", method: "N", gdLevelId: 142327976, videoUrl: "https://www.youtube.com/embed/A_xtcCUSDJY", records: [] },
  { id: 13, name: "David Trials", verifier: "smellY", method: "N", gdLevelId: 141387916, videoUrl: "https://www.youtube.com/embed/1HXznhoatSU", records: [] },
  { id: 14, name: "davidheavyballs", verifier: "limboproductions", method: "S", gdLevelId: 141885395, videoUrl: "https://www.youtube.com/embed/beXidhNRo_w", records: [] },
  { id: 15, name: "Davids tray", verifier: "CeasareWare", method: "N", gdLevelId: 141487724, videoUrl: "", records: [] },
  { id: 16, name: "sakupen david", verifier: "vvKyro", method: "S", gdLevelId: 141470022, videoUrl: "https://www.youtube.com/embed/u813WosZVHg", records: [] },
  { id: 17, name: "David x copyable", verifier: "CeasarWare", method: "N", gdLevelId: 141569211, videoUrl: "", records: [] },
  { id: 18, name: "Challenge for david", verifier: "SmellY", method: "N", gdLevelId: 128300549, videoUrl: "", records: [] },
  { id: 19, name: "david corridor z", verifier: "vvkyro", method: "N", gdLevelId: 141397537, videoUrl: "https://www.youtube.com/embed/kCwTjo8eWu0", records: [] },
  { id: 20, name: "Skibidi David", verifier: "Vvgayro", method: "N", gdLevelId: 141405533, videoUrl: "https://www.youtube.com/embed/kCwTjo8eWu0", records: [] },
  { id: 21, name: "David memory", verifier: "Limboproductions", method: "N", gdLevelId: 142265748, videoUrl: "", records: [] },
  { id: 22, name: "Crystal David", verifier: "CeaserWare", method: "N", gdLevelId: 141567476, videoUrl: "", records: [] },
  { id: 23, name: "david squad 2", verifier: "CeaserWare", method: "N", gdLevelId: 141579634, videoUrl: "", records: [] },
  { id: 24, name: "David madness copy", verifier: "CeaserWare", method: "N", gdLevelId: 141498612, videoUrl: "", records: [] },
  { id: 25, name: "davids gift", verifier: "vvKyro", method: "N", gdLevelId: 141498564, videoUrl: "", records: [] },
  { id: 26, name: "davids drawing pad", verifier: "Vvkyro", method: "N", gdLevelId: 141411428, videoUrl: "https://www.youtube.com/embed/kCwTjo8eWu0", records: [] },
  { id: 27, name: "Davids retray wave", verifier: "Atlas", method: "N", gdLevelId: 141751280, videoUrl: "https://www.youtube.com/embed/xcx8BtVwpOI", records: [] },
  { id: 28, name: "david got pranked", verifier: "no verifier", method: "N", gdLevelId: 0, videoUrl: "", records: [] },
];

export default levels;
