const flip = (byte: string) =>
  [...byte].reduce((res, b) => res + (b === "1" ? "0" : "1"), "");

export const getPowerConsumption = (input: string) => {
  const rows = input.split("\n");
  let gamma = "";

  for (let i = 0; i < rows[0].length; i++) {
    const counts = {
      0: 0,
      1: 0,
    };

    for (let j = 0; j < rows.length; j++) {
      const value = rows[j][i] as "0" | "1"; // TODO: validate
      counts[value]++;
    }

    gamma += counts["1"] > counts["0"] ? "1" : "0";
  }

  const epsilon = flip(gamma);

  return Number.parseInt(gamma, 2) * Number.parseInt(epsilon, 2);
};
