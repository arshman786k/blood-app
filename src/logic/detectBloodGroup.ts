import { predict } from "../tflite/runModel";

type Prediction = "agglutination" | "no-agglutination";

export async function detectBloodGroup(parts: string[]): Promise<string> {
  // parts = [part1, part2, part3]
  const results: Prediction[] = [];

  for (let i = 0; i < parts.length; i++) {
    const res = await predict(parts[i]);
    results.push(res);
  }

  // Example logic for blood group determination
  // Suppose:
  // well1 = Anti-A, well2 = Anti-B, well3 = Anti-D
  // "agglutination" means reaction

  const [wellA, wellB, wellD] = results;

  let bloodGroup = "";

  if (wellA === "agglutination" && wellB === "no-agglutination") bloodGroup = "A";
  else if (wellA === "no-agglutination" && wellB === "agglutination") bloodGroup = "B";
  else if (wellA === "agglutination" && wellB === "agglutination") bloodGroup = "AB";
  else if (wellA === "no-agglutination" && wellB === "no-agglutination") bloodGroup = "O";

  if (wellD === "agglutination") bloodGroup += "+";
  else bloodGroup += "-";

  return bloodGroup;
}
