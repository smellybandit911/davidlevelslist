// ============================================================
// LEVELS - Edit this array to add/remove/reorder levels
// ============================================================
// Fields:
//   id        - Position on the list (1 = hardest)
//   name      - Level name
//   verifier  - Who verified/beat it first
//   method    - "S" = spam, "N" = normal (gameplay style)
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
  { id: 1, name: "DavidFemHouse", verifier: "ShayPlazYT", method: "N", gdLevelId: 141509275, videoUrl: "https://www.youtube.com/watch?v=qNihGr5Nciw", records: [] },
  { id: 2, name: "cp for david", verifier: "ShayPlazYT", method: "N", gdLevelId: 141509275, videoUrl: "", records: [] },
  { id: 3, name: "Final davidnation", verifier: "David", method: "N", gdLevelId: 143571325, videoUrl: "https://youtu.be/xnQcriQrFXw?si=X83UydJ-Mp7eeLkt", records: [] },
  { id: 4, name: "haunted david", verifier: "Limboproductions", method: "N", gdLevelId: 142939175, videoUrl: "https://www.youtube.com/embed/zT1PBI0nLBg", records: [{ player: "ShayPlazYT", percent: 100, hz: 100000, mobile: false, link: "https://www.youtube.com/watch?v=qNihGr5Nciw" },] },
  { id: 5, name: "davids inferno v2", verifier: "ShayPlayzYT", method: "S", gdLevelId: 143762699, videoUrl: "Video: https://youtu.be/pOO1qbhwEGs?si=vun1pJ0FHA7", records: [] },
  { id: 6, name: "davids goopium syrup", verifier: "David", method: "S", gdLevelId: 141467933, videoUrl: "", records: [] },
  { id: 7, name: "David is 2721", verifier: "vvKyro", method: "N", gdLevelId: 141420200, videoUrl: "https://www.youtube.com/embed/oUyWP2OgrDs", records: [] },
  { id: 8, name: "elementary for dxvid", verifier: "icedagger!!", method: "S", gdLevelId: 141747746, videoUrl: "https://www.youtube.com/embed/FfS4n13MSd4", records: [] },
  { id: 9, name: "Davids inferno rebirth", verifier: "CeasarWare", method: "N", gdLevelId: 143651851, videoUrl: "https://youtu.be/T47p4sUFUnk?si=x7iNB7Qb0qKRcWpD", records: [] },
  { id: 10, name: "DAVIDTRANSITIONLUCAS", verifier: "CeasarWare", method: "N", gdLevelId: 143804501, videoUrl: "https://youtu.be/DtVYeKd_YQs", records: [] },
  { id: 11, name: "David's inferno", verifier: "CeasarWare", method: "N", gdLevelId: 141409971, videoUrl: "", records: [] },
  { id: 12, name: "David trials 2", verifier: "David", method: "N", gdLevelId: 141632448, videoUrl: "", records: [] },
  { id: 13, name: "davids sonic wave", verifier: "vvKyro", method: "N", gdLevelId: 141791872, videoUrl: "https://www.youtube.com/embed/pQZU-9AJDPc", records: [] },
  { id: 14, name: "David rage stage", verifier: "CaesarWare", method: "N", gdLevelId: 142215712, videoUrl: "https://www.youtube.com/embed/HCPh47shZjA", records: [] },
  { id: 15, name: "Davids low death", verifier: "CaesarWare", method: "N", gdLevelId: 141672026, videoUrl: "", records: [] },
  { id: 16, name: "David Is Sick X", verifier: "vvKyro", method: "S", gdLevelId: 142344116, videoUrl: "https://www.youtube.com/embed/SGCKs4oWBJM", records: [] },
  { id: 17, name: "Asian david from japan", verifier: "CeasarWare", method: "N", gdLevelId: 142934548 , videoUrl: "https://youtu.be/5BNEHMXyFOU?si=PxHVJh8BkD63bUmQ", records: [] },
  { id: 18, name: "David Is Sick", verifier: "limboproductions", method: "S", gdLevelId: 142263634, videoUrl: "https://www.youtube.com/embed/w41aWXQtNIQ", records: [] },
  { id: 19, name: "Unnerfed silent challenge for David", verifier: "VvKyro", method: "N", gdLevelId: 140305915, videoUrl: "https://www.youtube.com/watch?v=6-P0oOAfICQ", records: [] }
  { id: 20, name: "David x lucas circles", verifier: "CeasarWare", method: "N", gdLevelId: 142327976, videoUrl: "https://www.youtube.com/embed/A_xtcCUSDJY", records: [] },
  { id: 21, name: "David Trials", verifier: "smellY", method: "N", gdLevelId: 141387916, videoUrl: "https://www.youtube.com/embed/1HXznhoatSU", records: [] },
  { id: 22, name: "davidheavyballs", verifier: "limboproductions", method: "S", gdLevelId: 141885395, videoUrl: "https://www.youtube.com/embed/beXidhNRo_w", records: [] },
  { id: 23, name: "unnamed david memory", verifier: "CaesarWare", method: "N", gdLevelId: 143364539 , videoUrl: "https://youtu.be/uUzvbhFbgmA?si=pZAca_09Hsuj3aaF", records: [] },
  { id: 24, name: "Davids tray", verifier: "CeasareWare", method: "N", gdLevelId: 141487724, videoUrl: "", records: [] },
  { id: 25, name: "sakupen david", verifier: "vvKyro", method: "S", gdLevelId: 141470022, videoUrl: "https://www.youtube.com/embed/u813WosZVHg", records: [] },
  { id: 26, name: "David x copyable", verifier: "CeasarWare", method: "N", gdLevelId: 141569211, videoUrl: "", records: [] },
  { id: 27, name: "Challenge for david", verifier: "SmellY", method: "N", gdLevelId: 128300549, videoUrl: "", records: [] },
  { id: 28, name: "david corridor z", verifier: "vvkyro", method: "N", gdLevelId: 141397537, videoUrl: "https://www.youtube.com/embed/kCwTjo8eWu0", records: [] },
  { id: 29, name: "Skibidi David", verifier: "Vvkyro", method: "N", gdLevelId: 141405533, videoUrl: "https://www.youtube.com/embed/kCwTjo8eWu0", records: [] },
  { id: 30, name: "David is slop", verifier: "CeasarWare", method: "N", gdLevelId: 144040638, videoUrl: "https://youtu.be/I3RDdpzpg2M", records: [] },
  { id: 31, name: "David memory", verifier: "Limboproductions", method: "N", gdLevelId: 142265748, videoUrl: "", records: [] },
  { id: 32, name: "Crystal David", verifier: "CeaserWare", method: "N", gdLevelId: 141567476, videoUrl: "", records: [] },
  { id: 33, name: "David's ego doesn't go down", verifier: "grok", method: "N", gdLevelId: 144023241, videoUrl: "https://www.youtube.com/embed/W_4DUNRLjxA", records: [] },
  { id: 34, name: "david squad 2", verifier: "CeaserWare", method: "N", gdLevelId: 141579634, videoUrl: "", records: [] },
  { id: 35, name: "David madness copy", verifier: "CeaserWare", method: "N", gdLevelId: 141498612, videoUrl: "", records: [] },
  { id: 36, name: "david is 667", verifier: "CeaserWare", method: "N", gdLevelId: 142858267, videoUrl: "https://youtu.be/48Oqv21kcaM?si=MODwHKeFJ0W1PiGm", records: [] },
  { id: 37, name: "davids gift", verifier: "vvKyro", method: "N", gdLevelId: 141498564, videoUrl: "", records: [] },
  { id: 38, name: "davids drawing pad", verifier: "Vvkyro", method: "N", gdLevelId: 141411428, videoUrl: "https://www.youtube.com/embed/kCwTjo8eWu0", records: [] },
  { id: 39, name: "Davids retray wave", verifier: "Atlas", method: "N", gdLevelId: 141751280, videoUrl: "https://www.youtube.com/embed/xcx8BtVwpOI", records: [] },
  { id: 40, name: "david got pranked", verifier: "no verifier", method: "N", gdLevelId: 0, videoUrl: "", records: [] },
];

export default levels;
