// ============================================================
// EDITORS - Edit this array to change who runs the list
// ============================================================
// Fields:
//   role  - "owner", "admin", "helper", "trial", "dev"
//   name  - Display name
//   link  - YouTube/social URL (null for no link)
// ============================================================

export interface Editor {
  role: "owner" | "admin" | "helper" | "trial" | "dev";
  name: string;
  link: string | null;
}

const editors: Editor[] = [
  { role: "owner", name: "SmellY", link: null },
  { role: "dev", name: "vvKyro", link: null },
];

export default editors;
