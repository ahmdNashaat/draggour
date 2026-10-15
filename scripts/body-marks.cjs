// Where does each condition body's safety (!!) markup sit? Trailing segments
// must stay outside the mobile clamp, so the split point matters.
const { readFileSync } = require("fs");
const src = readFileSync("content/patient-conditions.ts", "utf8");
const lines = src.split("\n");
lines.forEach((line, index) => {
  const match = /^\s*body: "(.*)",\s*$/.exec(line);
  if (!match) return;
  const body = match[1];
  const arabic = /[\u0600-\u06FF]/.test(body.slice(0, 40));
  const marks = [];
  const re = /!!/g;
  let hit;
  while ((hit = re.exec(body))) marks.push(hit.index);
  const labelPairs = (body.match(/\*\*/g) || []).length / 2;
  const last = marks.length ? marks[marks.length - 1] : -1;
  let where = "no !!";
  if (marks.length) {
    const trailing = last + 2 >= body.length - 2;
    where = trailing
      ? "last !! TRAILING"
      : `last !! mid, after: ${JSON.stringify(body.slice(last + 2, last + 70))}`;
  }
  console.log(
    `line ${index + 1} ${arabic ? "AR" : "EN"} len=${body.length} !!=${marks.length} labels=${labelPairs} ${where}`,
  );
});
